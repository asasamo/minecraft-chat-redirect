require('dotenv').config()

const config = require('./config.json')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
// Routes
var newMessage = require('./routes/newMessage')
var root = require('./routes/root')

// Middlewares
var checkToken = require('./middlewares/checkToken')

app.use(bodyParser.json())

app.use('/newMessage', checkToken, newMessage)
app.use('/', checkToken, root)


app.listen(config.PORT)
console.log(`Server running on port ${config.PORT}!`)