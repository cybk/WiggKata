import express from 'express';
import Joi from 'joi';
import { join } from 'path';

const app = express();
app.use(express.json());

const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
    {id: 4, name: 'Course4'},
    {id: 5, name: 'Course5'},
];

app.get('/', (req, res) => {
    res.send('Hello World!!');
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
    }

    let {error} = validateCourse(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);

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

