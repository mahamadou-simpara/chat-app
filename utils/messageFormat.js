const moment = require('moment')

function messageFormat(userName, message) {

    return {
        userName,
        message,
        time: moment().format('HH:mm a')
    }
    
}

module.exports = messageFormat;