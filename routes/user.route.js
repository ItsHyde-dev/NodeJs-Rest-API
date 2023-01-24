const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')

const userController = new UserController()

router.post('/createUser', userController.createUser.bind(userController))

router.post('/login', userController.login.bind(userController))

router.post('/logout', userController.logout.bind(userController))

module.exports = router