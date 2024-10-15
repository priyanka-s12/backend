const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productImageUrl: 'String',
  productName: String,
  productCategory: String,
  isNewProduct: Boolean,
  productInfo: String,
  availableColors: {
    type: String,
    enum: ['Blue', 'Red', 'Green', 'Orange', 'Black'],
    default: 'Orange',
  },
  availableSizes: {
    type: Number,
    enum: [7, 8, 9, 10, 11],
    default: 9,
  },
  productPrice: Number,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
