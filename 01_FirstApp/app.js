const Logger = require('./logger');
const path = require('path');
const os = require('os');
const fs = require('fs');

const logger = new Logger();

console.log('/////////////   First one  ////////////')
logger.log('Something to log');

let pathObj =  path.parse(__filename);
console.log(pathObj);

console.log('/////////////   Second one  ////////////')
const totalMem =  os.totalmem();
const freeMem = os.freemem();

console.log(`Total Memory: ${totalMem}`);
console.log(`Free Memory: ${freeMem}`);

console.log('/////////////   Third one  ////////////')

const files = fs.readdirSync(__dirname);
console.log('list of files on sync', files);

fs.readdir(__dirname, (err, files) => {
    if (err){
        console.error('Error', err);
    }
    else{
        console.log('list of files sync', files);
    }
});

console.log('/////////////   fourth one  ////////////')

logger.on('messageLoaded', arg => {
    console.log(`Listener called with value`, arg);
})

logger.log('raising event');

