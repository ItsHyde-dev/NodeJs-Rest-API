const express = require('express')
const router = express.Router()
const VoiceController = require('../controllers/voice.controller')

const voiceController = new VoiceController()

router.post('/detectIntent', voiceController.detectIntent.bind(voiceController))

module.exports = router