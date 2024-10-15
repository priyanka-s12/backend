const { initializeDatabase } = require('./db/db.connect');
const Hotel = require('./models/hotel.models');

initializeDatabase();

// const newHotel = {
//   name: 'Lake View',
//   category: 'Mid-Range',
//   location: '124 Main Street, Anytown',
//   rating: 3.2,
//   reviews: [],
//   website: 'https://lake-view-example.com',
//   phoneNumber: '+1234555890',
//   checkInTime: '2:00 PM',
//   checkOutTime: '12:00 PM',
//   amenities: ['Laundry', 'Boating'],
//   priceRange: '$$$ (31-60)',
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: [
//     'https://example.com/hotel1-photo1.jpg',
//     'https://example.com/hotel1-photo2.jpg',
//   ],
// };

const newHotel = {
  name: 'Sunset Resort',
  category: 'Resort',
  location: '12 Main Road, Anytown',
  rating: 4.0,
  reviews: [],
  website: 'https://sunset-example.com',
  phoneNumber: '+1299655890',
  checkInTime: '2:00 PM',
  checkOutTime: '11:00 AM',
  amenities: [
    'Room Service',
    'Horse riding',
    'Boating',
    'Kids Play Area',
    'Bar',
  ],
  priceRange: '$$$$ (61+)',
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: [
    'https://example.com/hotel2-photo1.jpg',
    'https://example.com/hotel2-photo2.jpg',
  ],
};

async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const saveHotel = await hotel.save();
    console.log('New hotel data: ', saveHotel);
  } catch (error) {
    throw error;
  }
}

// createHotel(newHotel);

//read all hotels from the database
async function readAllHotels() {
  try {
    const allHotels = await Hotel.find();
    console.log(allHotels);
  } catch (error) {
    console.log(error);
  }
}
// readAllHotels();

//read a hotel by its name
async function readHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    console.log(hotel);
  } catch (error) {
    console.log(error);
  }
}
// readHotelByName('Lake View');

//read all hotels which offers parking space
async function readHotelByParkingSpace() {
  try {
    const hotel = await Hotel.find({ isParkingAvailable: true });
    console.log('Hotels that has parking space: ', hotel);
  } catch (error) {
    throw error;
  }
}

// readHotelByParkingSpace();

//read all hotels which has restaurant available
async function readHotelByRestaurant() {
  try {
    const hotel = await Hotel.find({ isRestaurantAvailable: true });
    console.log('Hotels that has restaurant facility: ', hotel);
  } catch (error) {
    throw error;
  }
}
// readHotelByRestaurant();

//read all hotels by category ("Mid-Range")
async function readHotelByCategory(categoryName) {
  try {
    const hotel = await Hotel.find({ category: categoryName });
    console.log('Hotels of Mid-Range Category: ', hotel);
  } catch (error) {
    throw error;
  }
}
// readHotelByCategory('Mid-Range');

//read all hotels by price range ("$$$$ (61+)")
async function readHotelByPriceRange(range) {
  try {
    const hotel = await Hotel.find({ priceRange: range });
    console.log(hotel);
  } catch (error) {
    throw error;
  }
}

// readHotelByPriceRange('$$$$ (61+)');

//read all hotels with 4.0 rating
async function readHotelByRating(number) {
  try {
    const hotel = await Hotel.find({ rating: number });
    console.log('Hotels with 4 rating: ', hotel);
  } catch (error) {
    throw error;
  }
}

// readHotelByRating(4);

//read a hotel by phone number
async function readHotelByPhoneNumber(phNumber) {
  try {
    const hotel = await Hotel.find({ phoneNumber: phNumber });
    console.log(hotel);
  } catch (error) {
    throw error;
  }
}

// readHotelByPhoneNumber('+1299655890');

async function updateHotelData(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    console.log(updatedHotel);
  } catch (error) {
    console.log('Error in updating hotel ', error);
  }
}
// updateHotelData('670cefdb4d4072c0253aa65b', { checkOutTime: '11 AM' });

async function updateHotelByRating(hotelName, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { name: hotelName },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedHotel);
  } catch (error) {
    console.log('Error in updating rating ', error);
  }
}

// updateHotelByRating('Sunset Resort', { rating: 4.2 });

async function updateHotelByPhoneNumber(hotelPhone, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findOneAndUpdate(
      { phoneNumber: hotelPhone },
      dataToUpdate,
      { new: true }
    );
    console.log(updatedHotel);
  } catch (error) {
    console.log('Error in updating phone number ', error);
  }
}

updateHotelByPhoneNumber('+1299655890', { phoneNumber: '+1997687392' });
