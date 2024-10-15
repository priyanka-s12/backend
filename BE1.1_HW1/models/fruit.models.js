const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  fruitImageUrl: String,
  fruitName: String,
  isInWishlist: Boolean,
  description: String,
  calories: Number,
  carbohydrates: Number,
  protein: Number,
  fat: Number,
});

const Fruit = mongoose.model('Fruit', fruitSchema);
module.exports = Fruit;
