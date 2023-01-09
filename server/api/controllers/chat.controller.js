const httpStatus = require('http-status')
const Chat = require('../models/chat.model')
const User = require('../models/user.model')
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 })
const clients = new Map()

wss.on('connection', (ws, req) => {
    const clientId = req.headers['sec-websocket-protocol']
    clients.set(ws, clientId)

    ws.on('close', () => {
        clients.delete(ws)
    })
})

// sender and recipient don't make sense; 
// use partecipants
const checkClients = (req, id) => {
    return id === req.body.sender ||
            id === req.body.recipient
            ? true : false
}

exports.load = async (req, res, next, id) => {
    try {
        const chat = await Chat.get(id)
        req.locals = { chat }
        return next()
    } catch(err) {
        return next(err)
    }
}

exports.list = async (req, res, next) => {
    try {
        const chats = await Chat.list(req.query);
        const transformedChat = chats.map(chat => chat.transform())
        res.json(transformedChat)
    } catch(err) {
        next(err)
    }
}

exports.create = async (req, res, next) => {
    try {
        const chat = new Chat(req.body)
        const savedChat = await chat.save()

        const user = await User.updateMany({
            $or: [
                { '_id': req.body.participants[0] }, 
                { '_id': req.body.participants[1] }
            ]
        }, {
            $push: { chat: savedChat._id }
        })

        /* clients.forEach((id, client) => {
            if (client.readyState === WebSocket.OPEN) {
                if (checkClients(req, id)) { 
                    client.send('updateChats')
                }
            }
        }) */

        res.status(httpStatus.CREATED)
        res.json(savedChat.transform())
    } catch(err) {
        console.log(err)
        res.status(500).send(err)
    }
}

exports.get = (req, res) => res.json(req.locals.chat.transform())

exports.remove = (req, res, next) => {
    const { chat } = req.locals

    chat.remove()
        .then(() => res.status(httpStatus.NO_CONTENT).end())
        .catch((e) => next(e));
}

exports.getByUser = async (req, res, next) => {
    try {
        const chats = await Chat.find({
            participants: req.params.userId
        })
        .populate('participants', 'username bio')
        
        const transformedChats = chats.map(chat => chat.transform())
        res.json(transformedChats)
    } catch(err) {
        res.status(500).send(err)
    }
}

exports.sendMessage = async (req, res) => {
    try {
        // save the message in the database
        const chat = await Chat.findByIdAndUpdate(
            req.body.chatId,
            {
                $push: {
                    messages: {
                        sender: req.body.sender,
                        text: req.body.text,
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }
        )

        // send update to clients
        clients.forEach((id, client) => {
            if (client.readyState === WebSocket.OPEN) {
                if (checkClients(req, id)) { 
                    client.send(JSON.stringify(chat))
                }
            }
        })

        res.json(chat)
    } catch(err) {
        res.status(500).send(err);
    }
}