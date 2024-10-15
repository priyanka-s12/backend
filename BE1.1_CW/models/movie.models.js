//require mongoose
const mongoose = require('mongoose');

//create schema - required property provided by mongoose
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        //predefined values
        enum: [
          'Action',
          'Drama',
          'Comedy',
          'Romance',
          'Thriller',
          'Fantasy',
          'Sci-Fi',
          'Horror',
          'Sports',
          'Musical',
          'Other',
        ],
      },
    ],
    director: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'Indian',
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    plot: {
      type: String,
    },
    awards: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//timestamps: true adds createdAt, updatedAt fields to track the creation and modification times of each movie entry
//as it doesn't have key, declare outside of other object

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
