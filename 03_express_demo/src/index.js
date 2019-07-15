import express from 'express';
import Joi from 'joi';
import { join } from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import config from 'config';
const startDebugger = require('debug')('app:startup');
import loggin from './middleware/logger';
import router from './routes/courses';
import homeRouter from './routes/home';

const app = express();
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.use(loggin);
app.use(express.static('public'));
app.use(helmet());


if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startDebugger('Morgan enabled...');
}

app.use('/api/coursers', router);
app.use('/', homeRouter);

// configuration section
console.log('Application Name: ', config.get('name'));
console.log('Mail Server:', config.get('mail.server'));
//console.log('Mail Password:', config.get('mail.password'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

