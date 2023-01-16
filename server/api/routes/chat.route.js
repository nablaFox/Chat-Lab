const express = require('express')
const controller = require('../controllers/chat.controller')
const checkAuth = require('../middlewares/auth.js')

const router = express.Router()

router.param('id', controller.load)


router
    .route('/')
    .get(controller.list) // get a list of all conversations (admin role)
    .post(controller.create) // create a new conversation

// user role
router
    .route('/:id')
    .get(controller.get) // get a chat by id
    .post(checkAuth, controller.sendMessage) // send a message
    .delete(controller.remove) // remove a chat by id
    

router
    .route('/user/:userID')
    .get(controller.getByUser) // Get a list of all conversations for a specific user

module.exports = router