import mongoose, { mongo } from 'mongoose';
import config from 'config';

// url should be on config file
mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('could not connecto to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean

});