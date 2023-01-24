const UserOperations = require("../db/mongo/operations/user.operations")
const ActiveUsersOperations = require("../db/mongo/operations/activeUser.operations")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService {

    async createUser(username, password) {
        const userOperations = new UserOperations()
        let salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)
        const result = userOperations.createUser(username, password)
        return result
    }


    //return accesstoken to the user    
    async login(username, password) {

        console.log('login started')

        const userOperations = new UserOperations()
        const user = await userOperations.getUser(username)
        const activeUsersOperations = new ActiveUsersOperations()
        //check if the password works
        const passwordMatches = await bcrypt.compare(password, user.password)


        //while signing set a secret token in the activeusers collection and store the id in the jwt
        //when logging out delete the document and thus making the jwt invalid
        //when making the auth middleware check for both the existence of the document and the username from the jwt

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

}

module.exports = UserService