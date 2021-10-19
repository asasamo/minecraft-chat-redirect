// sendToChat.js - Send to minecraft chat

const config = require('../config.json')
const exec = require('child_process').exec

const createCommand = require('./createCommand')

const send = (chatRole, author, message) => {
    return new Promise((resolve, reject) => {
        let command = createCommand(chatRole, author, message)
        console.log(command)
        if (command == '') {
            console.log('No command given!')
            resolve()
        }
        //exec(`/usr/bin/screen -p 0 -S mc-${config.instance} -X eval 'stuff "${command}"\\015'`, (err, stdout, stderr) => {
        exec(`echo "/usr/bin/screen -p 0 -S mc-${config.instance} -X eval 'stuff "${command}"\\015'"`, (err, stdout, stderr) => {
            if (err) {
                reject(err)
                console.error(stderr)
            } else {
                resolve()
            }
        })
    })
}

module.exports = send
