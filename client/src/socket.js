import { io } from 'socket.io-client'

const URL = 'http://localhost:3000'

const socket = io(URL, { autoConnect: false })

class Socket {
    constructor() { }

    connect(userID) {
        socket.auth = { userID }
        socket.connect()
    }

    sendMessage(to, text) {
        socket.emit('message', {
            text,
            to: to
        })
    }

    listenMessages(callback) {
        socket.on('message', callback)
    }
}

export default new Socket()
