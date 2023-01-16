const http = require('http')
const app = require('./config/express')
const mongoose = require('./config/mongoose')
const logger = require('./config/logger')
const socket = require('./config/socket')
const { port, env } = require('./config/vars')

const server = http.createServer(app)


mongoose.connect()
socket.setup(server)

server.listen(port, () => {
    logger.info(`server started on port ${port} (${env})`)
})