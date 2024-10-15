const { initializeDatabase } = require('./db/db.connect');
const Movie = require('./models/movie.models');

initializeDatabase();
const newMovie = {
  title: 'New Movie',
  releaseYear: 2024,
  genre: ['Drama'],
  director: 'Aditya Roy Kapoor',
  actors: ['actor 1', 'actor2'],
  language: 'Hindi',
  country: 'India',
  rating: 6.1,
  plot: 'A young man and woman fall in love on an Australia trip.',
  awards: 'IFA Filmfare Awards',
  posterUrl: 'https://example.com/new-poster1.jpg',
  trailerUrl: 'https://example.com/new-trailer1.mp4',
};

//async(make asynchronous function)-await concepts of promises - handy when have lots of data, run 2nd task while 1st task not executed properly so use this concept
async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
    //wait to save movie until you get newMovie data object
    console.log('New movie data: ', saveMovie);
  } catch (error) {
    throw error;
    //throw related to catch, throw error on the screen, if want you can console error too
  }
}

createMovie(newMovie);
