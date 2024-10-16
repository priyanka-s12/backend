const express = require('express');
const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

app.get('/', (req, res) => {
  res.send('Hello, From Express Server.');
});

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
  },

  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },

  { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
];

app.get('/books', (req, res) => {
  res.send(books);
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  console.log(bookId);

  const index = books.findIndex((book) => book.id == bookId);
  console.log(index);

  if (index === -1) {
    res.status(404).json({ error: 'Book not found.' });
  } else {
    books.splice(index, 1);
    res
      .status(200)
      .json({ message: `Book deleted successfully: bookId : ${bookId}` });
  }
});

//2nd
const todos = [
  { id: 1, title: 'Water the plants', day: 'Saturday' },

  { id: 2, title: 'Go for a walk', day: 'Sunday' },
];

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  console.log(todoId);
  const index = todos.findIndex((todo) => todo.id == todoId);
  console.log(index);

  if (index === -1) {
    res.status(404).json({ error: 'Todo does not exist' });
  } else {
    todos.splice(index, 1);
    res.status(200).json({ message: 'Todo deleted successfully' });
  }
});
