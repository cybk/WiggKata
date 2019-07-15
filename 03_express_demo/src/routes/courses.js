import express from 'express';

const router = express.Router();

const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
    {id: 4, name: 'Course4'},
    {id: 5, name: 'Course5'},
];


router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.filter(elem => elem.id === parseInt(req.params.id));

    if (!course || !course.length){
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    res.send(course);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
   
    const course = courses.filter(elem => elem.id === parseInt(req.params.id));

    if (!course || !course.length){
        res.status(404).send('The course with the given ID was not found');
        return;
    }

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.send(courses);
});

function validateCourse (course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return  Joi.validate(course, schema);
}


export default router;