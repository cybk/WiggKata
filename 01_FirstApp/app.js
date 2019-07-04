const logger = require('./logger');
const path = require('path');
const os = require('os');

logger.log('Something to log');

let pathObj =  path.parse(__filename);
console.log(pathObj);

const totalMem =  os.totalmem();
const freeMem = os.freemem();

console.log(`Total Memory: ${totalMem}`);
console.log(`Free Memory: ${freeMem}`);