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

//create new hotel
async function createHotel(newHotel) {
  try {
    const hotel = new Hotel(newHotel);
    const saveHotel = await hotel.save();
    // console.log('New hotel data: ', saveHotel);
    return saveHotel;
  } catch (error) {
    throw error;
  }
}

app.post('/hotels', async (req, res) => {
  try {
    const savedHotel = await createHotel(req.body);
    res
      .status(201)
      .json({ message: 'New hotel added successfully.', hotel: savedHotel });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add new hotel.' });
  }
});

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

async function deleteHotel(hotelId) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel;
  } catch (error) {
    console.log(error);
  }
}

app.delete('/hotels/:hotelId', async (req, res) => {
  try {
    const deletedHotel = await deleteHotel(req.params.hotelId);
    if (deletedHotel) {
      res.status(200).json({ message: 'Hotel deleted successfully.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete a hotel.' });
  }
});

async function updateHotel(hotelId, dataToUpdate) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    return updatedHotel;
  } catch (error) {
    console.log(error);
  }
}

app.post('/hotels/:hotelId', async (req, res) => {
  try {
    const updatedHotel = await updateHotel(req.params.hotelId, req.body);
    if (updatedHotel) {
      res
        .status(200)
        .json({ message: 'Hotel updated successfully', hotel: updatedHotel });
    } else {
      res.status(404).json({ error: 'Hotel not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update a hotel' });
  }
});
