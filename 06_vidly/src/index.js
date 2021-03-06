
import genres from './routes/genres';
import customers from './routes/customers';
import movies from './routes/movies';
import rentals from './routes/rentals';
import users from './routes/users';
import auth from './routes/auth';
import error from './Middleware/error';
import express, { json } from 'express';
import mongoose from 'mongoose';
import config from 'config';
import winston from 'winston';
require('express-async-errors');

const app = express();
winston.add(new winston.transports.File({filename: 'logfile.log'}));

mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongodb....'))
    .catch(err => console.log('Could not connect to mongodb. . .', err));


app.use(json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));