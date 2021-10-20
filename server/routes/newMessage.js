// newMessage.js - Handles new messages from /newMessage and send commands to server

const express = require('express')
const router = express.Router()
const sendToChat = require('./../minecraft_server/sendToChat')

const sanitize = new RegExp(/\[\d+:\d+:\d+\]\s\[Render thread\/INFO\]:\s\[CHAT\]/)

const roleRegex = new RegExp(/^[A-Z]+/)
const authorRegex = new RegExp(/\s\w+\s/) // only first match
const messageRegex = new RegExp(/»\s.+/)

const usernameRegex = new RegExp(/^\w+/)


router.post('/', (req, res) => {
    let message = req.body.message
    message = message.replace(sanitize, '').trim()

    if (roleRegex.exec(message) != null) {

        var role = roleRegex.exec(message)[0].trim()
        var author = authorRegex.exec(message)[0].trim()
        message = messageRegex.exec(message)[0].replace('»', '').trim()
    } else {
        var author = usernameRegex.exec(message)[0].trim()
        message = messageRegex.exec(message)[0].replace('»', '').trim()
    }
    sendToChat(role != undefined ? role : 'default', author != undefined ? author : '', message != undefined ? message : '')
    res.status(200).send('OK')
})

module.exports = router