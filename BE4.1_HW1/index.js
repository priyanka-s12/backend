const { initializeDatabase } = require('./db/db.connect');
const Restaurant = require('./models/restaurant.models');
const express = require('express');
const app = express();

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servre is running on port', PORT);
});

initializeDatabase();
app.use(express.json());

//get all restaurants
async function readAllRestaurants() {
  try {
    const allRestaurants = await Restaurant.find();
    // console.log(allRestaurants);
    return allRestaurants;
  } catch (error) {
    throw error;
  }
}

app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    if (restaurants.length != 0) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: 'No restaurants found.' });
    }
  } catch (error) {
    res.status(500).json('Failed to fetch restaurants.');
  }
});

//read a restaurant by its name
async function readRestaurantByName(restaurantName) {
  try {
    const restaurant = await Restaurant.findOne({ name: restaurantName });
    // console.log(restaurant);
    return restaurant;
  } catch (error) {
    throw error;
  }
}

app.get('/restaurants/:restaurantName', async (req, res) => {
  try {
    const restaurant = await readRestaurantByName(req.params.restaurantName);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a restaurant.' });
  }
});

//read a restaurant by phone number
async function readRestaurantByPhoneNumber(phNumber) {
  try {
    const restaurant = await Restaurant.findOne({ phoneNumber: phNumber });
    // console.log(restaurant);
    return restaurant;
  } catch (error) {
    console.log(error);
  }
}

app.get('/restaurants/directory/:phoneNumber', async (req, res) => {
  try {
    const restaurant = await readRestaurantByPhoneNumber(
      req.params.phoneNumber
    );
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: 'Restaurant not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurant.' });
  }
});

//read all restaurants by cuisine
async function readRestaurantByCuisine(cuisineName) {
  try {
    const restaurant = await Restaurant.find({ cuisine: cuisineName });
    // console.log(restaurant);
    return restaurant;
  } catch (error) {
    console.log(error);
  }
}

app.get('/restaurants/cuisine/:cuisineName', async (req, res) => {
  try {
    const restaurants = await readRestaurantByCuisine(req.params.cuisineName);

    if (restaurants.length != 0) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: 'No restaurants found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurants.' });
  }
});

async function readRestaurantsByLocation(locationName) {
  try {
    const restaurant = Restaurant.find({ location: locationName });
    // console.log(restaurant);
    return restaurant;
  } catch (error) {
    console.log(error);
  }
}
app.get('/restaurants/location/:restaurantLocation', async (req, res) => {
  try {
    const restaurants = await readRestaurantsByLocation(
      req.params.restaurantLocation
    );
    if (restaurants.length != 0) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: 'No restaurants found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch restaurant.' });
  }
});
