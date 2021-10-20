// sendToChat.js - Send to minecraft chat

const config = require('../config.json')
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: process.env.MCIP,
    username: config.mcUsername,
})

bot.on('spawn', () => {
    console.log("Bot entered world!")
})

const createCommand = require('./createCommand')

const send = (chatRole, author, message) => {
    return new Promise((resolve, reject) => {
        let command = createCommand(chatRole, author, message)
        if (command == '') {
            console.log('No command given!')
            resolve()
        }
        bot.chat("/" + command)
        console.log("Command sent!")

    })
}

module.exports = send
