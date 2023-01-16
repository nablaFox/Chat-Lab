const { Server } = require('socket.io')

exports.setup = (server) => {
    const io = new Server(server, {
        cors: { origin: '*' }
    })


    // events
    io.on('connection', socket => {
        socket.join(socket.userID)

        socket.on('message', ({ text, to }) => {
            socket.to(to).to(socket.userID).emit('message', {
                text,
                from: socket.userID,
                timestamp: new Date()
            })
        })

    })
    
    // middlewares
    io.use((socket, next) => {
        const userID = socket.handshake.auth.userID

        if (!userID) { 
            return next(new Error("invalid user id"));
        }
    
        socket.userID = userID
        next()
    })
}

