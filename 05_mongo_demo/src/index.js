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
const Course =  mongoose.model('Course', courseSchema);

async function createCourse() {
   
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tages: ['Angular', 'frontend'],
        isPublished: true
    });

    const result  = await course.save();
    console.log('result', result);
}

//createCourse();

async function getCourses() {
    // const courses = await Course.find({ author: 'Mosh', isPublished: true})
    //const courses = await Course.find({ price: {$gte: 10}}) // things with a price greather than 10
    // const courses = await Course.find({ price: {$in: [10, 25]}}) // things with a price greather than 10
     const courses = await Course.find()
         .or([ {author: 'Mosh'}, {isPublished: true}])
        .limit(10)
        .sort({ name:1 })
        .select({name: 1, tages: 1});
    console.log('Courses', courses);
}

getCourses();

 