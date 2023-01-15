const httpStatus = require('http-status')
const Chat = require('../models/chat.model')
const User = require('../models/user.model')
const { care } = require('../utils/error')

exports.load = async (req, res, next, id) => {
    const [chat, err] = await care(() => Chat.get(id))
    if (err) { return res.status(httpStatus.NOT_FOUND).send(err) }

    req.locals = { chat }
    next()
}

exports.list = async (req, res) => {
    const [chats, err] = await care(() => Chat.list(req.query))
    if (err) { return res.status(httpStatus.BAD_REQUEST).send(err) }

    const transformedChat = chats.map(chat => chat.transform())
    res.json(transformedChat)
}

exports.create = async (req, res) => {
    const chat = new Chat(req.body)
    const [savedChat, err] = await care(() => chat.save())
    if (err) { return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err) }

    await User.updateMany({
        $or: [
            { '_id': req.body.participants[0] }, 
            { '_id': req.body.participants[1] }
        ]
    }, { $push: { chat: savedChat._id } })

    res.status(httpStatus.CREATED)
    res.json(savedChat.transform())
}

exports.get = async (req, res) => {
    const chat = await req.locals.chat
        .populate('participants', 'username bio')

    res.json(chat.transform())
}


exports.remove = async (req, res) => {
    await req.locals.chat.deleteOne()
    res.status(httpStatus.NO_CONTENT).end()
}

exports.sendMessage = async (req, res) => {
    const { chat } = req.locals

    chat.messages.push({
        sender: req.body.sender,
        text: req.body.text,
        timestamp: new Date()
    })

    const [_, err] = await care(() => chat.save())

    if (err) { return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err) }
    res.status(httpStatus.OK).end()
}


exports.getByUser = async (req, res) => {
    const [chats, err] = await care(() =>
        Chat.find({
            participants: req.params.userId
        })
            .populate('participants', 'username bio')
    )
    
    if (err) { return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err) }

    const transformedChats = chats.map(chat => chat.transform())
    res.json(transformedChats)
}
