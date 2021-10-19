// createCommand.js - Fill the blank spaces from user config

const config = require('../config.json')

const prop = new RegExp(/%%\w+%%/g)

const matched = [...config.blankCommand.matchAll(prop)]

let finalCommand = "tellraw @a [\"\",{\"text\":\"%%prefix_text%% \",\"bold\":true,\"color\":\"%%prefix_color%%\"},{\"text\":\"&&username&& \",\"color\":\"%%name_color%%\"},{\"text\":\"%%suffix_text%% \",\"color\":\"%%suffix_color%%\"},{\"text\":\"&&input&&\",\"color\":\"%%message_color%%\"}]"

function createCommand(chatRole = '', username = '', message = '') {
    if (config.chat[`${chatRole}`] == undefined) {
        console.error('Chat role does not exist!')
        return ''
    }
    matched.forEach(e => {
        let property = e[0].replaceAll('%', '')

        finalCommand = finalCommand.replace(e[0], config.chat[`${chatRole}`][property.split('_')[0]][property.split('_')[1]])
    })
    finalCommand = finalCommand.replace('&&input&&', message)
    finalCommand = finalCommand.replace('&&username&&', username)
    return finalCommand
}

module.exports = createCommand