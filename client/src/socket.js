import { io } from 'socket.io-client'

const URL = 'https://chat-lab.icedcube.net'

const socket = io(URL, { autoConnect: false })

class Socket {
    constructor() { }

    connect(userID) {
        socket.auth = { userID }
        socket.connect()

        console.log('flag')
    }

    sendMessage(to, text) {
        socket.emit('message', {
            text,
            to: to
        })

        console.log('flag')
    }

    listenMessages(callback) {
        socket.on('message', callback)
    }
}

export default new Socket()
