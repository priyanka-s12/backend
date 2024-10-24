const express = require('express');
const { initializeDatabase } = require('./db/db.connect');
const Book = require('./models/book.models');
// const fs = require('fs');

const app = express();
const PORT = 3000;
app.listen(PORT, () => console.log('Server is running on port', PORT));

app.use(express.json());
initializeDatabase();

// const jsonData = fs.readFileSync('./books.json', 'utf-8');
// const booksData = JSON.parse(jsonData);

// function seedData() {
//   try {
//     for (const bookData of booksData) {
//       const newBook = new Book({
//         title: bookData.title,
//         author: bookData.author,
//         publishedYear: bookData.publishedYear,
//         genre: bookData.genre,
//         language: bookData.language,
//         country: bookData.country,
//         rating: bookData.rating,
//         summary: bookData.summary,
//         coverImageUrl: bookData.coverImageUrl,
//       });
//       newBook.save();
//     }
//   } catch (error) {
//     console.log('Error seeding the data', error);
//   }
// }

// seedData();

//1, 2
async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const saveBook = await book.save();
    return saveBook;
  } catch (error) {
    console.log(error);
  }
}

app.post('/books', async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: 'Book added successfully', book: savedBook });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

//3
async function readAllBooks() {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (error) {
    console.log(error);
  }
}

app.get('/books', async (req, res) => {
  try {
    const books = await readAllBooks();
    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json({ error: 'No books found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

//4
async function readBookByTitle(bookTitle) {
  try {
    const book = await Book.findOne({ title: bookTitle });
    return book;
  } catch (error) {
    console.log(error);
  }
}

app.get('/books/:bookTitle', async (req, res) => {
  try {
    const book = await readBookByTitle(req.params.bookTitle);
    if (book) {
      res.status(200).json({ message: 'Book found.', book: book });
    } else {
      res.status(404).json({ error: 'Book not found', error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a book.' });
  }
});

//5
async function readBookByAuthor(bookAuthor) {
  try {
    const book = await Book.findOne({ author: bookAuthor });
    console.log(book);
    return book;
  } catch (error) {
    console.log(error);
  }
}

app.get('/books/author/:bookAuthor', async (req, res) => {
  try {
    const book = await readBookByAuthor(req.params.bookAuthor);
    if (book) {
      res.status(200).json({ message: 'Book found', book: book });
    } else {
      res.status(404).json({ error: 'Book not found.', error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a book', error });
  }
});

//6
async function readAllBooksByGenre(bookGenre) {
  try {
    const books = await Book.find({ genre: bookGenre });
    // console.log(books);
    return books;
  } catch (error) {
    console.log(error);
  }
}

app.get('/books/genre/:bookGenre', async (req, res) => {
  try {
    const books = await readAllBooksByGenre(req.params.bookGenre);
    if (books.length != 0) {
      res.status(200).json({
        message: `${req.params.bookGenre} genre books found`,
        book: books,
      });
    } else {
      res.status(404).json({ error: 'No books found', error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books.' });
  }
});

//7
async function readAllBooksByReleasedYear(bookReleasedYear) {
  try {
    const books = await Book.find({ publishedYear: bookReleasedYear });
    return books;
  } catch (error) {
    console.log(error);
  }
}

app.get('/books/year/:bookReleasedYear', async (req, res) => {
  try {
    const books = await readAllBooksByReleasedYear(req.params.bookReleasedYear);
    if (books.length != 0) {
      res.status(200).json({
        message: `Books that are published in ${req.params.bookReleasedYear} are found`,
        book: books,
      });
    } else {
      res.status(404).json({ error: 'No books found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

//8
async function updateBookById(bookId, dataToUpdate) {
  try {
    const book = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return book;
  } catch (error) {
    console.log(error);
  }
}

app.post('/books/updatedata/:bookId', async (req, res) => {
  try {
    const book = await updateBookById(req.params.bookId, req.body);
    if (book) {
      res
        .status(200)
        .json({ message: 'Book updated successfully', book: book });
    } else {
      res.status(404).json({ error: 'Book does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: ' Failed to update a book' });
  }
});

//9
async function updateBookByTitle(bookTitle, dataToUpdate) {
  try {
    const book = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    // console.log(book);
    return book;
  } catch (error) {
    console.log(error);
  }
}

app.post('/books/updatedetails/:bookTitle', async (req, res) => {
  try {
    const book = await updateBookByTitle(req.params.bookTitle, req.body);
    if (book) {
      res.status(200).json({
        message: `Book updated successfully`,
        book: book,
      });
    } else {
      res.status(404).json({ error: 'Book does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update a book' });
  }
});

//10
async function deleteBookById(bookId) {
  try {
    const book = await Book.findByIdAndDelete(bookId);
    return book;
  } catch (error) {
    console.log(error);
  }
}

app.delete('/books/deletebook/:bookId', async (req, res) => {
  try {
    const book = await deleteBookById(req.params.bookId);
    if (book) {
      res
        .status(200)
        .json({ message: 'Book deleted successfully', book: book });
    } else {
      res.status(404).json({ error: 'Book not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete a book' });
  }
});
