require('./db/db.connect');
const Post = require('./models/post.models');
const User = require('./models/user.models');

const userData = {
  name: 'John',
  email: 'john@email.com',
};
const addUser = async () => {
  try {
    const newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    console.log('Error: ', error);
  }
};

// addUser();
//here not adding express

const postData = {
  title: 'Greeting',
  content: 'Have a good day!',
  author: '6745b0fae93f4383480e9c0b',
};

const addPost = async () => {
  try {
    const newPost = new Post(postData);
    await newPost.save();
    console.log('Post added successfully.');
  } catch (error) {
    console.log('Error: ', error);
  }
};

// addPost();

//populate key - get details of author- who posted the post
const getAllPosts = async () => {
  try {
    const allPosts = await Post.find().populate('author');
    console.log('All Posts: ', allPosts);
  } catch (error) {
    console.log('Error: ', error);
  }
};
getAllPosts();
