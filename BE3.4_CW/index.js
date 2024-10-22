const express = require('express');
const PORT = 3000;
const app = express();

const cars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
  },
  {
    id: 2,
    make: 'Tesla',
    model: 'Model S',
    year: 2020,
  },
  {
    id: 3,
    make: 'Honda',
    model: 'Civic',
    year: 2012,
  },
  {
    id: 4,
    make: 'Ford',
    model: 'Mustang',
    year: 2002,
  },
];

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express');
});

app.post('/cars', (req, res) => {
  const newCar = req.body;

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

app.delete('/cars/:id', (req, res) => {
  const carId = req.params.id;
  console.log(carId);
  const index = cars.findIndex((car) => car.id == carId);
  console.log(index);
  if (index === -1) {
    res.status(404).json({ error: 'Car not found.' });
  } else {
    cars.splice(index, 1);
    //not use filter as it gives new array
    res.status(200).json({ message: 'Car deleted successfully.' });
  }
});

//update data
app.post('/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCarData = req.body; // send in api

  const carToUpdate = cars.find((car) => car.id === carId);

  //Object.assign(target, source) = copy source data to target
  if (!carToUpdate) {
    res.status(404).json({ error: 'Car not found.' });
  } else {
    if (!updatedCarData.model || !updatedCarData.make || !updatedCarData.year) {
      res.status(400).json({ error: 'Make, model and year are required' });
    } else {
      Object.assign(carToUpdate, updatedCarData);
      res
        .status(200)
        .json({ message: 'Car data updated successfully.', car: carToUpdate });
    }
  }
});
