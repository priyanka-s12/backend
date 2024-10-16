const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
  },

  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
];

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express Server');
});

//send new data from client side to array
app.post('/books', (req, res) => {
  const newBook = req.body;
  if (!newBook.title || !newBook.author || !newBook.year) {
    res.status(400).json({ error: 'Title, author and year are required.' });
  } else {
    books.push(newBook);
    res
      .status(201)
      .json({ message: 'Book added successfully.', book: newBook });
  }
});

app.get('/books', (req, res) => {
  res.send(books);
});

//2nd question
const todos = [{ id: 1, title: 'Water the plants', day: 'Saturday' }];

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  if (!newTodo.title || !newTodo.day) {
    res.status(400).json({ error: 'Title and day are required.' });
  } else {
    todos.push(newTodo);
    res
      .status(201)
      .json({ message: 'New todo added successfully.', todo: newTodo });
  }
});
