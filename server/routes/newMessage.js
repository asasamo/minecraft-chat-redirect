// newMessage.js - Handles new messages from /newMessage and send commands to server

const express = require('express')
const router = express.Router()
const sendToChat = require('./../minecraft_server/sendToChat')

const sanitize = new RegExp(/\[\d+:\d+:\d+\]\s\[Render thread\/INFO\]:\s\[CHAT\]/)

router.post('/', (req, res) => {
    let message = req.body.message
    message = message.replace(sanitize, '').trim()
    console.log(message)
    sendToChat('MOD', message)
    res.status(200).send('OK')
})

module.exports = router