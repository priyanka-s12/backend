const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
  creditCardNumber: Number,
  expiryDate: Date,
  fullName: String,
  cardType: String,
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);
module.exports = CreditCard;
