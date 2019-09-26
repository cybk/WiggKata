
import genres from './routes/genres';
import customers from './routes/customers';
import movies from './routes/movies';
import rentals from './routes/rentals';
import users from './routes/users';
import express, { json } from 'express';
import mongoose from 'mongoose';
import config from 'config';

const app = express();

mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongodb....'))
    .catch(err => console.log('Could not connect to mongodb. . .', err));


app.use(json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));