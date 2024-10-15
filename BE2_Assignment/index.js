const { initializeDatabase } = require('./db/db.connect');
const Car = require('./models/car.models');
const fs = require('fs');

initializeDatabase();
const jsonData = fs.readFileSync('./cars.json', 'utf-8');
const carsData = JSON.parse(jsonData);
// console.log(carsData.length);

// const carData = {
//   brand: 'Ford',
//   model: 'Mustang',
//   year: 2019,
//   bodyStyle: 'Convertible',
//   fuelType: 'Gasoline',
//   transmission: 'Automatic',
//   engine: '5.0L V8',
//   mileage: 25000,
//   color: 'Red',
//   price: 3500000,
//   condition: 'Used',
//   description: 'Exciting Ford Mustang convertible with powerful V8 engine.',
//   photos: [
//     'https://example.com/mustang-photo1.jpg',
//     'https://example.com/mustang-photo2.jpg',
//     'https://example.com/mustang-photo3.jpg',
//   ],
// };

const carData = {
  brand: 'Honda',
  model: 'Civic',
  year: 2018,
  bodyStyle: 'Coupe',
  fuelType: 'Gasoline',
  transmission: 'Manual',
  engine: '1.5L Turbocharged Inline-4',
  mileage: 40000,
  color: 'Black',
  price: 1800000,
  condition: 'Used',
  description: 'Sporty Civic coupe with low mileage and manual transmission.',
  photos: [
    'https://example.com/civic-photo1.jpg',
    'https://example.com/civic-photo2.jpg',
    'https://example.com/civic-photo3.jpg',
  ],
};

function seedData() {
  try {
    for (const carData of carsData) {
      const newCar = new Car({
        brand: carData.brand,
        model: carData.model,
        year: carData.year,
        bodyStyle: carData.bodyStyle,
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        engine: carData.engine,
        mileage: carData.mileage,
        color: carData.color,
        price: carData.price,
        condition: carData.condition,
        description: carData.description,
        photos: carData.photos,
        inMarket: carData.inMarket,
      });
      //   console.log(newCar.brand);
      newCar.save();
    }
  } catch (error) {
    console.log('Error seeding the data ', error);
  }
}

// seedData();

async function createCar(carData) {
  try {
    const car = new Car(carData);
    const saveCar = await car.save();
    console.log('New car data: ', saveCar);
  } catch (error) {
    console.log('Error in creating car object ', error);
  }
}

// createCar(carData);

async function readAllCars() {
  try {
    const allCars = await Car.find();
    console.log('All cars: ', allCars);
  } catch (error) {
    throw error;
  }
}

// readAllCars();

async function readCarByBrand(brandName) {
  try {
    const getCar = await Car.findOne({ brand: brandName });
    console.log('Car data: ', getCar);
  } catch (error) {
    throw error;
  }
}

// readCarByBrand('Ford');

async function readCarByColor(colorName) {
  try {
    const getCars = await Car.find({ color: colorName });
    console.log('Cars: ', getCars);
  } catch (error) {
    throw error;
  }
}

// readCarByColor('Black');

async function updateCarByModel(modelName, dataToUpdate) {
  try {
    const getCar = await Car.findOneAndUpdate(
      { model: modelName },
      dataToUpdate,
      { new: true }
    );
    console.log('Updated ', getCar);
  } catch (error) {
    console.log('Error in updating car ', error);
  }
}

// updateCarByModel('Corolla', { price: 2300000 });

async function updateCar(modelName, dataToUpdate) {
  try {
    const getCar = await Car.findOneAndUpdate(
      { model: modelName },
      dataToUpdate,
      { new: true }
    );
    console.log('Updated car: ', getCar);
  } catch (error) {
    console.log('Error in changing ', error);
  }
}

// updateCar('Model S', { condition: 'Used' });

async function deleteCarById(carId) {
  try {
    const deletedCar = await Car.findByIdAndDelete(carId);
    console.log('Deleted ', deletedCar.brand);
  } catch (error) {
    console.log('Error in deleting ', error);
  }
}

// deleteCarById('670b89df2499eac3438a9b82');

async function deleteCarByBodyStyle(carBody) {
  try {
    const deletedCar = await Car.findOneAndDelete({ bodyStyle: carBody });
    console.log('Deleted ', deletedCar.brand);
  } catch (error) {
    console.log('Error in deleting car ', error);
  }
}

deleteCarByBodyStyle('Coupe');
