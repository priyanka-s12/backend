const { initializeDatabase } = require('./db/db.connect');
const Movie = require('./models/movie.models');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => console.log('Server is running on port', PORT));

initializeDatabase();

//find movie with x title - return single object
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    // console.log(movie);
    return movie;
  } catch (error) {
    throw error;
  }
}
//run this function with help of api calls. will write routes and based on api call and get the func data.
app.get('/movies/:title', async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie.' });
    //if error occur in api call
  }
});

//get all movies - return array
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    // console.log(allMovies);
    return allMovies;
  } catch (error) {
    console.log(error);
  }
}

app.get('/movies', async (req, res) => {
  try {
    const movies = await readAllMovies();
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: 'No movies found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies.' });
  }
});

//get movie by director name - returns array if condition satisfies
async function readMovieByDirector(directorName) {
  try {
    const movieByDirector = await Movie.find({ director: directorName });
    // console.log(movieByDirector);
    return movieByDirector;
  } catch (error) {
    console.log(error);
  }
}

//already used /movies/:title, can't use same even if :directorName, use diff router
app.get('/movies/director/:directorName', async (req, res) => {
  try {
    const movies = await readMovieByDirector(req.params.directorName);
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: 'No movies found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie.' });
  }
});

async function readMovieByGenre(genreName) {
  try {
    const movieByGenre = await Movie.find({ genre: genreName });
    return movieByGenre;
  } catch (error) {
    console.log(error);
  }
}

app.get('/movies/genres/:genreName', async (req, res) => {
  try {
    const movies = await readMovieByGenre(req.params.genreName);
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: 'No movies found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie.' });
  }
});
