const mongoose = require('mongoose');
require('dotenv').config();

//connection string from mongodb atlas
const mongoUri = process.env.MONGODB;

//connection using promise
const initializeDatabase = async () => {
  //promise -> you don't know when will get response from server, time not fixed- asynchronous function - await won't work if not write async- both go hand in hand
  //await means perform this code and return something
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Connected to Database.');
    })
    .catch((error) => console.log('Error connecting to Database', error));
};

module.exports = { initializeDatabase };
//want to use connect code in other file so export it - put connection code in function initializeDatabase()
