const mongoose = require('mongoose');

const productCardSchema = new mongoose.Schema({
  productImageUrl: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  starCount: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  ratingsCount: {
    type: Number,
  },
  reviewsCount: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  availableOffers: {
    type: String,
    enum: ['Bank Offer 1', 'Bank Offer 2', 'Bank Offer 3'],
  },
  warranty: [
    {
      type: String,
    },
  ],
  variant: {
    type: String,
    enum: ['2023 Model - 1 Ton 3 Star', '2023 Model - 1.5 Ton 3 Star'],
  },
  wifiConnectivity: {
    type: Boolean,
  },
});

const Product = mongoose.model('Product', productCardSchema);
module.exports = Product;
