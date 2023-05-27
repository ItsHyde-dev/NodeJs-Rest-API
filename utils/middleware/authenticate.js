const ActiveUsersOperations = require("../../db/mongo/operations/activeUser.operations");
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const { send } = require("../responseSender");


async function authenticateUser(req, res, next) {
    try {

        const { accesstoken } = req.headers;

        if (!accesstoken) throw new BadRequestError("Access token is missing");

        const username = jwt.decode(accesstoken).username

        const activeUserOperations = new ActiveUsersOperations();
        let activeUser = await activeUserOperations.checkActiveUser(username);

        if (!activeUser) {
            throw new BadRequestError("Invalid access token! Please Login");
        }

        req.body.userData = { username }

        next();
    }
    catch (error) {
        console.error(error.stack)
        return send({
            message: error.message,
            statusCode: error.statusCode,
            req, res
        })
    }
}

module.exports = authenticateUser
