const express = require('express')
const controller = require('../controllers/chat.controller')
const checkAuth = require('../middlewares/auth.js')

const router = express.Router()

router.param('id', controller.load)

router
    .route('/')
    .get(controller.list) // get a list of all conversations
    .post(controller.create) // create a new conversation

router
    .route('/:id')
    .get(controller.get) // get a chat by id
    .delete(controller.remove) // remove a chat by id

router
    .route('/user/:userId')
    .get(checkAuth, controller.getByUser) // Get a list of all conversations for a specific user
    
router
    .route('/sendMessage')
    .post(checkAuth, controller.sendMessage) // Send a message

module.exports = router;