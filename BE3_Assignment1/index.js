const express = require('express');
const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

app.get('/', (req, res) => {
  res.send('Hello, This is Express Assignment Server.');
});

const albums = [
  { id: 1, title: 'Abbey Road', artist: 'The Beatles', year: 1969 },

  {
    id: 2,
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
  },

  { id: 3, title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
];

app.get('/albums', (req, res) => {
  res.send(albums);
});

app.use(express.json());

app.post('/albums', (req, res) => {
  const newAlbum = req.body;
  if (!newAlbum.title || !newAlbum.artist || !newAlbum.year) {
    res.status(400).json({ error: 'Title, artist and year are required.' });
  } else {
    albums.push(newAlbum);
    res
      .status(200)
      .json({ message: 'New album added succeessfully', album: newAlbum });
  }
});

app.delete('/albums/:id', (req, res) => {
  const albumId = parseInt(req.params.id);
  const index = albums.findIndex((album) => album.id === albumId);
  console.log(albumId, index);

  if (!index) {
    res.status(404).json({ error: 'Album not found.' });
  } else {
    albums.splice(index, 1);
    res.status(200).json({ message: `Album ${albumId} deleted successfully.` });
  }
});

app.post('/albums/:id', (req, res) => {
  const albumId = parseInt(req.params.id);
  const updatedAlbumData = req.body;
  const albumToUpdate = albums.find((album) => album.id === albumId);

  if (!albumToUpdate) {
    res.status(404).json({ error: 'Album does not exist.' });
  } else {
    if (
      !updatedAlbumData.title ||
      !updatedAlbumData.artist ||
      !updatedAlbumData.year
    ) {
      res.status(400).json({ error: 'Title, artist and year are required.' });
    } else {
      Object.assign(albumToUpdate, updatedAlbumData);
      res
        .status(200)
        .json({ error: 'Album updated successfully.', album: albumToUpdate });
    }
  }
});
