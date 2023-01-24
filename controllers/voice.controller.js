const VoiceService = require("../services/voice.service")
const { send } = require("../utils/responseSender")

class VoiceController {
    constructor() {
        this.voiceService = new VoiceService()
    }


    async detectIntent(req, res, next) {
        try {
            let data = req.body
            let result = await this.voiceService.detectIntent(data.text)
            console.log(result)
            return send({
                message: 'successfully detected intent', req, res, data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = VoiceController