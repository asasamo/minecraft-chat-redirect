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
        let splitted = command.match(/.{1,5}/g)

        splitted.forEach(e => {
            exec(`/usr/bin/screen -p 0 -S mc-${config.instance} -X eval 'stuff '${e}''`, (err, stdout, stderr) => {
                if (err) {
                    reject(err)
                    console.error(stderr)
                } else {
                    resolve()
                }
            })
        })
        exec(`/usr/bin/screen -p 0 -S mc-${config.instance} -X eval 'stuff '\\015''`, (err, stdout, stderr) => {
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
