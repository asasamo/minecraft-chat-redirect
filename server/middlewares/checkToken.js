// checkToken.js - check if API Token is valid
const { AUTH_TOKEN } = require('../config.json')

var checkToken = (req, res, next) => {
    if (req.headers['api-token'] == AUTH_TOKEN) {
        next()
    } else {
        res.status(401).send('Invalid API Token.')
    }
}

module.exports = checkToken