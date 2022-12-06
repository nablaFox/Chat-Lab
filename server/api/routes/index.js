const express = require('express')
const userRoutes = require('./user.route')
const chatRoutes = require('./chat.route')
const authRoutes = require('./auth.route')

const router = express.Router()


router.use('/users', userRoutes)
router.use('/chats', chatRoutes)
router.use('/auth', authRoutes)

module.exports = router;