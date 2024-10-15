const express = require('express');
require('dotenv').config();

//instantiate express
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express');
});
//when get "/" route, what to be send - need configuration below
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

app.get('/about', (req, res) => {
  res.send('This is the aboout page');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});
