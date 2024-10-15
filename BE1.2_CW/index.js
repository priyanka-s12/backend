const { initializeDatabase } = require('./db/db.connect');
const fs = require('fs');
const Movie = require('./models/movie.models');

initializeDatabase();
//want data from movies.json file, will use method fs(file system) provided by node.js- read data
const jsonData = fs.readFileSync('movies.json', 'utf-8');
//utf-8 optional for encoding character binary format
const moviesData = JSON.parse(jsonData);
//conert binary data into json format to perform operation

// console.log(moviesData.length);
function seedData() {
  try {
    //moviesData is an array of objects - use for of loop
    for (const movieData of moviesData) {
      //create instance/  obj of movie from model whenever create new movie
      const newMovie = new Movie({
        title: movieData.title,
        releaseYear: movieData.releaseYear,
        genre: movieData.genre,
        director: movieData.director,
        actors: movieData.actors,
        language: movieData.language,
        country: movieData.country,
        rating: movieData.rating,
        plot: movieData.plot,
        awards: movieData.awards,
        posterUrl: movieData.posterUrl,
        trailorUrl: movieData.trailorUrl,
      });
      //don't need to provide timestamps key in the object it will auto create in db
      //   console.log(newMovie.title);
      //ctrl + c to come in next line in the bash terminal
      //save() provided by mongoose
      newMovie.save();
    }
  } catch (error) {
    console.log('Error seeding the data', error);
  }
}

seedData();
