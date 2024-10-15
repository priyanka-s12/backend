const { initializeDatabase } = require('./db/db.connect');
const Restaurant = require('./models/restaurant.models');

initializeDatabase();

// const newRestaurant = {
//   name: 'Somi',
//   cuisine: ['Greek'],
//   location: '11 Main Road, Gem',
//   rating: 4.3,
//   reviews: [],
//   website: 'https://somi-example.com',
//   phoneNumber: '+1234997390',
//   openHours: 'Tue-Sun: 11:00 AM - 10:00 PM',
//   priceRange: '$$ (11-30)',
//   reservationsNeeded: false,
//   isDeliveryAvailable: true,
//   menuUrl: 'https://somi-example.com/menu',
//   photos: [
//     'https://example.com/somi-photo1.jpg',
//     'https://example.com/somi-photo2.jpg',
//   ],
// };

const newRestaurant = {
  name: 'Yo China',
  cuisine: ['Chinese', 'Italian'],
  location: 'MG Road, Bangalore',
  rating: 3.9,
  reviews: [],
  website: 'https://yo-example.com',
  phoneNumber: '+1288997392',
  openHours: 'Tue-Sun: 10:00 AM - 11:00 PM',
  priceRange: '$$$ (31-60)',
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: 'https://yo-example.com/menu',
  photos: [
    'https://example.com/yo-photo1.jpg',
    'https://example.com/yo-photo2.jpg',
    'https://example.com/yo-photo3.jpg',
  ],
};

async function createRestaurant(newRestaurant) {
  try {
    const restaurant = new Restaurant(newRestaurant);
    const saveRestaurant = await restaurant.save();
    console.log('New restaurant data: ', saveRestaurant);
  } catch (error) {
    console.log(error);
  }
}

// createRestaurant(newRestaurant);

//get all restaurants
async function readAllRestaurants() {
  try {
    const allRestaurants = await Restaurant.find();
    console.log(allRestaurants);
  } catch (error) {
    throw error;
  }
}

// readAllRestaurants();

//read a restaurant by its name
async function readRestaurantByName(restaurantName) {
  try {
    const restaurant = await Restaurant.find({ name: restaurantName });
    console.log(restaurant);
  } catch (error) {
    throw error;
  }
}
// readRestaurantByName('Somi');

//read all restaurants which offers reservations
async function readRestaurantByReservation() {
  try {
    const restaurant = await Restaurant.find({ reservationsNeeded: true });
    console.log(restaurant);
  } catch (error) {
    throw error;
  }
}

// readRestaurantByReservation();

//read all restaurants which offers delivery
async function readRestaurantByDelivery() {
  try {
    const restaurant = await Restaurant.find({ isDeliveryAvailable: true });
    console.log(restaurant);
  } catch (error) {
    console.log(error);
  }
}

// readRestaurantByDelivery();

//read a restaurant by phone number
async function readRestaurantByPhoneNumber(phNumber) {
  try {
    const restaurant = await Restaurant.findOne({ phoneNumber: phNumber });
    console.log(restaurant);
  } catch (error) {
    console.log(error);
  }
}

// readRestaurantByPhoneNumber('+1288997392');

//read all restaurants by cuisine
async function readRestaurantByCuisine(cuisineName) {
  try {
    const restaurant = await Restaurant.find({ cuisine: cuisineName });
    console.log(restaurant);
  } catch (error) {
    console.log(error);
  }
}

// readRestaurantByCuisine('Italian');

//update rating of x id
async function updateRestaurantByRating(restaurantId, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      dataToUpdate,
      { new: true }
    );
    console.log(updatedRestaurant);
  } catch (error) {
    console.log('Erron in updating restaurant ', error);
  }
}
// updateRestaurantByRating('670ce789c17f445498d6f67e', { rating: 4.1 });

async function updateRestaurantByName(movieName, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { name: movieName },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedRestaurant);
  } catch (error) {
    console.log('Error in updating name ', error);
  }
}

// updateRestaurantByName('Somi', { name: 'Som Sarovar' });

async function updateRestaurant(restaurantPhone, dataToUpdate) {
  try {
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { phoneNumber: restaurantPhone },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedRestaurant);
  } catch (error) {
    console.log('Error in changing data ', error);
  }
}
updateRestaurant('+1288997392', { isDeliveryAvailable: true });
