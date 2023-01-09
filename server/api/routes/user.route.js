const express = require('express')
const controller = require('../controllers/user.controller')

const router = express.Router()

router.param('id', controller.load)

router
    .route('/')
    .get(controller.list) // get a list of all users
    .post(controller.create) // create a new user

router
    .route('/:id')
    .get(controller.get) // get a user by id
    .delete(controller.remove) // remove a user by id

    
module.exports = router;