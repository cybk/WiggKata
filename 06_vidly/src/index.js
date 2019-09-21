import Joi from 'joi';
import genres from './routes/genres';
import express, { json } from 'express';
const app = express();

app.use(json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));