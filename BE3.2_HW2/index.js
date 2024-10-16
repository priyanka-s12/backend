const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

app.get('/', (req, res) => {
  res.send('Express server.');
});

const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },

  {
    id: 2,
    title: 'The Godfather',
    director: 'Francis Ford Coppola',
    year: 1972,
  },
];

app.use(express.json());

app.get('/movies', (req, res) => {
  res.send(movies);
});

app.post('/movies', (req, res) => {
  const newMovie = req.body;
  if (!newMovie.title || !newMovie.director || !newMovie.year) {
    res.status(400).json({ error: 'Title, director and year are required.' });
  } else {
    movies.push(newMovie);
    res
      .status(201)
      .json({ message: 'New movie added successfully.', movie: newMovie });
  }
});

//2nd
const items = [
  { id: 1, itemName: 'Spoon', color: 'Silver', quantity: 8 },

  { id: 2, itemName: 'Fork', color: 'Silver', quantity: 8 },
];

app.get('/items', (req, res) => {
  res.send(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  if (!newItem.itemName || !newItem.color || !newItem.quantity) {
    res
      .status(400)
      .json({ error: 'Item name, color and quantity are required.' });
  } else {
    items.push(newItem);
    res
      .status(201)
      .json({ message: 'New Item added successfully.', item: newItem });
  }
});
