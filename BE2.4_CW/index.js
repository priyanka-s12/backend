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

// readMovieByDirector('Ashutosh Gowariker');

//find movie by ID and update its rating
//Model.findByIdAndUpdate(id, update, options, callback)
async function updateMovie(movieId, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {
      new: true,
    });
    //new: If set to true, returns the modified document rather than the original. Defaults to false and updated in db but not reflects value on console(old value display on console).
    console.log(updatedMovie);
  } catch (error) {
    console.log('Error in updating movie rating ', error);
  }
}

// updateMovie('6707b1a7ad12ef3ae255f969', { rating: 8.0 });

//find one data and update its value
//Model.findOneAndUpdate(filter, update, options, callback)
async function updateMovieDetail(movieTitle, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: movieTitle },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedMovie);
  } catch (error) {
    console.log('Error in changing data ', error);
  }
}

// updateMovieDetail('Kabhi Khushi Kabhie Gham', { releaseYear: 2003 });

//find movie by id and delete from db
async function deleteMovie(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    console.log('Deleted movie data: ', deletedMovie);
  } catch (error) {
    console.log('Erron in deleting movie ', error);
  }
}

// deleteMovie('670b8159a2d7fa870fd168d1');

async function deleteMovieFromDB(movieTitle) {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ title: movieTitle });
    console.log('Deleted: ', deletedMovie);
  } catch (error) {
    console.log('Error in movie deletion ', error);
  }
}

deleteMovieFromDB('Gully Boy');
