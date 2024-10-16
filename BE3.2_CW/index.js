const express = require('express');
require('dotenv').config();

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
const cars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
  },
];

const app = express();

app.use(express.json());
//use middlewear helps to pass/ read req.body in json format

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

//route for post request - post data to postman and read from req body
//send data from client side - post request
app.post('/cars', (req, res) => {
  const newCar = req.body; // have data in req.body object

  if (!newCar.make || !newCar.model || !newCar.year) {
    res.status(400).json({ error: 'Make, model and year are required.' });
  } else {
    cars.push(newCar);
    res.status(201).json({ message: 'Car added successfully.', car: newCar });
  }
});

app.get('/cars', (req, res) => {
  res.send(cars);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
