import { connect, model, Schema, Mongoose } from 'mongoose';
import  config  from 'config';

connect(config.get("mongoUri"), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = model('Author', new Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = model('Course', new Schema({
  name: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .select('name');
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

  createCourse('Node Course', '5d8ab68617da3f06bc8b7674')

 listCourses();