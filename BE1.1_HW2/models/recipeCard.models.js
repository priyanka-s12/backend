const mongoose = require('mongoose');

const recipeCardSchema = new mongoose.Schema({
  recipeImageUrl: {
    type: String,
  },
  recipeName: {
    type: String,
  },
  numberOfServings: {
    type: Number,
  },
  preppingTime: {
    type: Number,
  },
  cookingTime: {
    type: Number,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  directions: [
    {
      type: String,
    },
  ],
  notes: {
    type: String,
  },
});

const Recipe = mongoose.model('Recipe', recipeCardSchema);
module.exports = Recipe;
