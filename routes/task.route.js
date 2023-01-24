const express = require('express')
const TaskController = require('../controllers/task.controller')
const router = express.Router()

const taskController = new TaskController()

//put middleware to check the auth of the user
router.get('/', taskController.getAllTasks.bind(taskController))

module.exports = router