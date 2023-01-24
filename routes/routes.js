let express = require('express')
const router = express.Router()
let userRouter = require('./user.route')
let taskRouter = require('./task.route')
let voiceRouter = require('./voice.route')

router.use('/user', userRouter)
router.use('/task', taskRouter)
router.use('/voice', voiceRouter)

module.exports = router