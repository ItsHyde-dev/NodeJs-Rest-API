const UserOperations = require("../db/mongo/operations/user.operations")
const ActiveUsersOperations = require("../db/mongo/operations/activeUser.operations")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { BadRequestError } = require("../utils/errors")

class UserService {

    constructor() {

    }

    async createUser(username, password) {

        console.log('create user started')

        const userOperations = new UserOperations()
        let salt = await bcrypt.genSalt(10)

        let hashedPassword = await bcrypt.hash(password, salt)

        await userOperations.createUser(username, password)
        const response = await this.login(username, password)

        console.log('create user completed')

        return response
    }


    //return accesstoken to the user
    async login(username, password) {

        console.log('login started')

        const userOperations = new UserOperations()
        const user = await userOperations.getUser(username)
        const activeUsersOperations = new ActiveUsersOperations()

        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            throw new BadRequestError('Invalid credentials')
        }

        const activeUserId = await activeUsersOperations.createActiveUser(username)

        const accessToken = jwt.sign(
            {
                username: username,
                activeUserId: activeUserId
            },
            process.env.jwt_secret,
            {
                expiresIn: '1h'
            }
        )

        console.log('login completed')

        return { accessToken }

    }

    async logout(username) {
        console.log('logout started')

        const activeUsersOperations = new ActiveUsersOperations()

        await activeUsersOperations.deleteActiveUser(username)

        console.log('logout completed')
    }

}

module.exports = UserService
