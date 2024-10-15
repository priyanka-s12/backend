//import mongoose in file
const mongoose = require('mongoose');

//defines instance/variable of the schema for car. - within obj define data as key-value pair(property of x type)
//Schema is method, it accepts object
const carSchema = new mongoose.Schema({
  model: String,
  releaseYear: Number,
  make: String,
});

//defining a model and to use this model in other folder/ files we are exporting it
const Car = mongoose.model('Car', carSchema);
module.exports = Car;
//module.exports provided by node.js
//.model() function makes a copy of schema. When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Car is for the cars collection in the database.
