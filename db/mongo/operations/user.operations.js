const { BadRequestError } = require('../../../utils/errors');
const UserModel = require('../models/user.model')

class UserOperations {

    constructor() {
        this.userModel = UserModel;
    }

    async createUser(username, password) {
        try {

            return await this.userModel.create({
                username, password
            })
        } catch (error) {
            if (error.code === 11000) {
                error.message = 'username already exists'
            }
            throw new BadRequestError(error.message)
        }
    }

    async getUser(username) {
        return await this.userModel.findOne({ username: username })
    }

}

module.exports = UserOperations
