const { send } = require("../utils/responseSender")
const UserService = require('../services/user.service')

class UserController {

    constructor() {
        this.userService = new UserService()
    }

    async createUser(req, res, next) {
        try {

            let { username, password } = req.body

            const result = await this.userService.createUser(username, password)

            return send({
                message: 'successfully created user', req, res, data: result
            })
        } catch (err) {
            next(err)
        }
    }

    async login(req, res, next) {
        try {

            let { username, password } = req.body

            const result = await this.userService.login(username, password)

            return send({
                message: 'successfully logged in', req, res, data: result
            })

        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { username } = req.body.userData

            await this.userService.logout(username)
            return send({
                message: 'successfully logged out', req, res
            })
        } catch (error) {
            console.error(error)
        }
    }


}

module.exports = UserController
