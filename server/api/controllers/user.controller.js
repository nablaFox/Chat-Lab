const User = require('../models/user.model')
const httpStatus = require('http-status')
const { care } = require('../utils/error')

exports.load = async (req, res, next, id) => {
    const [user, err] = await care(() => User.get(id))
    if (err) { return res.status(httpStatus.NOT_FOUND).send(err) }

    req.locals = { user }
    next()
}

exports.list = async (req, res) => {
    const [users, err] = await care(() => User.list(req.query))
    if (err) { return res.status(httpStatus.BAD_REQUEST).send(err) }
    
    const transformedUser = users.map(user => user.transform())
    res.json(transformedUser)
}

exports.create = async (req, res) => {
    const [user, err] = await care(() => new User(req.body))
    if (err) { return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err) }

    const savedUser = await user.save()
    res.status(httpStatus.CREATED)
    res.json(savedUser.transform())
}

exports.get = async (req, res) => {
    await req.locals.user.populate('chat')
    await req.locals.user.populate('chat.participants', 'username bio')

    const { user } = req.locals

    user.chat = user.chat.map(chat => ({
        ...chat,
        _id: chat.id,
        recipient: chat.participants.find(p => p._id != req.params.id),
        lastMessage: chat.messages[chat.messages.length - 1] || ''
    }))

    res.json(user.transform())
}

exports.remove = async (req, res) => {
    await req.locals.user.deleteOne()
    res.status(httpStatus.NO_CONTENT).end()
}