const express = require('express')
const router = require('./routes/routes')
const { send } = require('./utils/responseSender')
const mongoose = require('mongoose')
require('dotenv').config()
let bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8080

connectToDb().catch(err => console.error(err))
async function connectToDb() {
    mongoose.connect(process.env.dbConnectionString,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
}

app.use(router)

app.use(function(err, req, res, next) {
    if (err) {
        console.error(err.stack)
        return send({
            statusCode: err.statusCode || 500, req, res, err: err.message
        })
    }
})

process.on('uncaughtException', function(err) {
    console.error(err.stack)
})

app.listen(port, () => {
    console.log(`Started server on port ${port}`)
})



