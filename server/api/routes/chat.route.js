const express = require('express')
const controller = require('../controllers/chat.controller')
const checkAuth = require('../middlewares/auth.js')

const router = express.Router()

router.param('id', controller.load)

// admin role
router
    .route('/')
    .get(controller.list) // get a list of all conversations
    .post(controller.create) // create a new conversation

// user role
router
    .route('/:id')
    .get(checkAuth, controller.get) // get a chat by id
    .delete(checkAuth, controller.remove) // remove a chat by id

router
    .route('/user/:userId')
    .get(checkAuth, controller.getByUser) // Get a list of all conversations for a specific user
    
router
    .route('/sendMessage')
    .post(controller.sendMessage) // Send a message

module.exports = router;