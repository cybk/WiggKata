import Logger from './logger';
import StartServer from './http'

import { parse } from 'path';
import { totalmem, freemem } from 'os';
import { readdirSync, readdir } from 'fs';

const logger = new Logger();

console.log('/////////////   First one  ////////////')
logger.log('Something to log');

let pathObj =  parse(__filename);
console.log(pathObj);

console.log('/////////////   Second one  ////////////')
const totalMem =  totalmem();
const freeMem = freemem();

console.log(`Total Memory: ${totalMem}`);
console.log(`Free Memory: ${freeMem}`);

console.log('/////////////   Third one  ////////////')

const files = readdirSync(__dirname);
console.log('list of files on sync', files);

readdir(__dirname, (err, files) => {
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


console.log('/////////////   Fifth one  ////////////')
console.log('/////////////    Server   ////////////')

StartServer();