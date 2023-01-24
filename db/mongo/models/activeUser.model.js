const mongoose = require('mongoose')
const activeUsers = mongoose.Schema({
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ActiveUsersModel', activeUsers)