const express = require('express')
const router = require('./routes/routes')
const { send } = require('./utils/responseSender')
const mongoose = require('mongoose')
require('dotenv').config()
let bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 8080
const hostname = '127.0.0.1'

//catch exceptions
process.on('uncaughtException', function (err) {
    console.error(err)
    console.log(err)
})

//setting up router
const Router = express.Router()
app.use(router)

//connect to db

connectToDb().catch(err => console.error(err))
async function connectToDb() {
    mongoose.connect(process.env.dbConnectionString,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
}

app.use(function (err, req, res, next) {
    if (err) {
        console.error(err)
        return send({
            statusCode: 200, req, res
        })
    }
})

app.listen(port, hostname, () => {
    console.log(`Started server at ${hostname} on port ${port}`)
})



