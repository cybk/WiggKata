import express from 'express';
import Joi from 'joi';
import { join } from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import config from 'config';
const startDebugger = require('debug')('app:startup');
import loggin from './logger';

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


// configuration section
console.log('Application Name: ', config.get('name'));
console.log('Mail Server:', config.get('mail.server'));
//console.log('Mail Password:', config.get('mail.password'));


const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
    {id: 4, name: 'Course4'},
    {id: 5, name: 'Course5'},
];

app.get('/', (req, res) => {
    res.render('index', {
        title: 'My test express app',
        message: 'Hello World!!!'
    });
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4]);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.filter(elem => elem.id === parseInt(req.params.id));

    if (!course || !course.length){
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    let {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.filter(elem => elem.id === parseInt(req.params.id));

    if (!course || !course.length){
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    let {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
   
    const course = courses.filter(elem => elem.id === parseInt(req.params.id));

    if (!course || !course.length){
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(courses);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

function validateCourse (course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return  Joi.validate(course, schema);
}

