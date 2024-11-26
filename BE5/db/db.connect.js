const mongoose = require('mongoose');
require('dotenv').config();
//mongoose model referencing - link 2 different models
const mongoUri = process.env.MONGODB;

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Error connecting to MongoDb', error));
