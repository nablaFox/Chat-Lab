const httpStatus = require('http-status');
const User = require('../models/user.model')

exports.load = async (req, res, next, id) => {
    try {
        const user = await User.get(id)
        req.locals = { user }
        return next()
    } catch(err) {
        return next(err)
    }
}

exports.list = async (req, res, next) => {
    try {
        const users = await User.list(req.query);
        const transformedUser = users.map(user => user.transform())
        res.json(transformedUser)
    } catch(err) {
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const user = new User(req.body)
        const savedUser = await user.save()
        res.status(httpStatus.CREATED)
        res.json(savedUser.transform())
    } catch(err) {
        next(err)
    }
}

exports.get = async (req, res) => {
    const user = await req.locals.user.populate('chat')
        .then(user => user.populate('chat.participants', 'username bio'))

    user._doc.chat = user.chat.map(chat => ({
        _id: chat.id,
        recipient: chat.participants.find(p => p._id != req.params.id),
        lastMessage: chat.messages[chat.messages.length - 1]
    }))

    res.json(user)
}

exports.remove = (req, res, next) => {
    const { user } = req.locals;

    user.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
}