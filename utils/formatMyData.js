const moment = require('moment');
module.exports = function(username,data){
    formatedData = {
        username,
        data,
        time: moment().format('h:mm a')
    }
    return formatedData;
}