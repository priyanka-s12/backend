const { initializeDatabase } = require('./db/db.connect');
const Movie = require('./models/movie.models');
//how to query/ find data from database
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

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
    console.log('New movie data: ', saveMovie);
  } catch (error) {
    throw error;
  }
}

// createMovie(newMovie);

//find movie with x title - return single object
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    console.log(movie);
  } catch (error) {
    throw error;
  }
}

// readMovieByTitle('Kabhi Khushi Kabhie Gham');

//get all movies - return array
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
  } catch (error) {
    console.log(error);
  }
}

// readAllMovies();

//get movie by director name - returns array if condition satisfies
async function readMovieByDirector(directorName) {
  try {
    const movieByDirector = await Movie.find({ director: directorName });
    console.log(movieByDirector);
  } catch (error) {
    console.log(error);
  }
}

readMovieByDirector('Ashutosh Gowariker');
