const ActiveUsersModel = require('../models/activeUser.model')

class ActiveUsersOperations {

    constructor() {
        this.activeUsersModel = ActiveUsersModel
    }

    async createActiveUser(username) {

        //check if the user is active or not
        const userAlreadyActive = await this.checkActiveUser(username)

        let result = userAlreadyActive

        if (!userAlreadyActive) {
            result = this.activeUsersModel.create({
                username
            })

            result = result
        }



        return result._id
    }

    async checkActiveUser(username) {
        return this.activeUsersModel.exists({ username })
    }

    async deleteActiveUser(username) {
        return this.activeUsersModel.deleteOne({ username })
    }
}

module.exports = ActiveUsersOperations
