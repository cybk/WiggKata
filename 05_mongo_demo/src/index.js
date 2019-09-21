import mongoose, { mongo } from 'mongoose';
import config from 'config';

// url should be on config file
mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('could not connecto to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    const result =  v && v.length > 0;
                    callback(result);
                }, 1000);
            },
            message: 'A course should have at least one tag'
        }
        // Sync Validator
        // validate: {
        //     validator: function (v) {
        //         return v && v.length > 0;
        //     },
        //     message: 'A course should have at least one tag'
        // }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});
const Course =  mongoose.model('Course', courseSchema);

async function createCourse() {
   
    const course = new Course({
        name: 'Angular Course 09/20',
        category: 'web',
        author: 'Mosh',
        tags: null, //['Angular', 'frontend'],
        isPublished: true,
        price: 15
    });

    try {
        const result  = await course.save();
        console.log('result', result);
    }catch (ex){
        for (let field in ex.errors) {
            console.log(ex.errors[field]);
        }
    }
    
}

createCourse();

async function getCourses() {
    const courses = await Course.find({ author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({ name:1 })
        .select({name: 1, tages: 1, author:1});

    const cnt =  await Course.find({ author: 'Mosh', isPublished: true})
        .limit(10)
        .sort({ name:1 })
        .countDocuments();
    console.log('Courses: ', courses);
    console.log('Total Courses: ', cnt)
}

 //getCourses();


async function updateCourse(id) {
    // Query first
    const course = await Course.findById(id);
    if(!course){
        console.log('not found');
        return;
    } 

    course.set({isPublished: false, author: 'Other Author'});
    const result = await course.save();
    console.log('result: ', result);
}

async function updateCourseWQ(id) {
    const course = await Course.update({_id: id }, {$set: {isPublished: true}});
    console.log('Result second update: ', course);

}


//updateCourse('5d2e82aadeb1c959343dbdb3');
//updateCourseWQ('5d2e82aadeb1c959343dbdb3');

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id});
    console.log('Deleted course: ', result);
}
 