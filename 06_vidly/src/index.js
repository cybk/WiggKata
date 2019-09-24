
import genres from './routes/genres';
import express, { json } from 'express';
import mongoose from 'mongoose';
import config from 'config';

const app = express();

mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Mongodb....'))
    .catch(err => console.log('Could not connect to mongodb. . .', err));


app.use(json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));