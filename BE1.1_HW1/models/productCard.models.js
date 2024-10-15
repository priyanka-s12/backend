const mongoose = require('mongoose');

const productCardSchema = new mongoose.Schema({
  productImageUrl: String,
  productName: String,
  starCount: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  productPrice: Number,
  ratingCount: Number,
  reviewsCount: Number,
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  features: [
    {
      type: String,
    },
  ],
  inStock: {
    type: Number,
    default: 0,
  },
  isFreeDelivery: Boolean,
  comparisionInPriceSinceLaunch: String,
  isInWishlist: Boolean,
});

const Product = mongoose.model('Product', productCardSchema);
module.exports = Product;
