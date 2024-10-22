const { initializeDatabase } = require('./db/db.connect');
const Hotel = require('./models/hotel.models');
const express = require('express');
const PORT = 3000;
const app = express();
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

initializeDatabase();

app.use(express.json());

//read all hotels from the database
async function readAllHotels() {
  try {
    const allHotels = await Hotel.find();
    // console.log(allHotels);
    return allHotels;
  } catch (error) {
    console.log(error);
  }
}
app.get('/hotels', async (req, res) => {
  try {
    const hotels = await readAllHotels();
    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: 'No hotels found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels.' });
  }
});

//read a hotel by its name
async function readHotelByName(hotelName) {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    // console.log(hotel);
    return hotel;
  } catch (error) {
    console.log(error);
  }
}

app.get('/hotels/:hotelName', async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: 'No hotel found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel.' });
  }
});

//read a hotel by phone number
async function readHotelByPhoneNumber(phNumber) {
  try {
    const hotel = await Hotel.findOne({ phoneNumber: phNumber });
    // console.log(hotel);
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get('/hotels/directory/:phoneNumber', async (req, res) => {
  try {
    const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: 'No hotel found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a hotel.' });
  }
});

//read all hotels with rating
async function readHotelByRating(number) {
  try {
    const hotel = await Hotel.find({ rating: number });
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get('/hotels/rating/:hotelRating', async (req, res) => {
  try {
    const hotels = await readHotelByRating(req.params.hotelRating);
    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: 'No hotels found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a hotel.' });
  }
});

//read all hotels by category
async function readHotelByCategory(categoryName) {
  try {
    const hotel = await Hotel.find({ category: categoryName });
    return hotel;
  } catch (error) {
    throw error;
  }
}

app.get('/hotels/category/:hotelCategory', async (req, res) => {
  try {
    const hotels = await readHotelByCategory(req.params.hotelCategory);
    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: 'No hotels found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch a hotel.' });
  }
});
