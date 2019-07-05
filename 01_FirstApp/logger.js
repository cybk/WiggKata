const EventEmitter = require('events');

const url = 'http://mylogger.io/log';

class  Logger extends EventEmitter{
    log (message){
        //
        console.log(message);
        this.emit('messageLoaded', {id:1, url:'http://'});
    }
}

module.exports = Logger;
//module.exports.endPoint = url;