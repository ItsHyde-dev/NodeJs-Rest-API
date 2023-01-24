const UserModel = require('../models/user.model')

class UserOperations {

    constructor() {
        this.userModel = UserModel
    }

    async createUser(username, password) {
        return this.userModel.create({
            username, password
        })
    }

    async getUser(username) {
        return this.userModel.findOne({ username: username })
    }

}

module.exports = UserOperations