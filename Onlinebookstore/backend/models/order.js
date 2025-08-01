const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    userId: String,
    name: String,
    email: String,
    paymentMethod: String
  },
  items: [
    {
      _id: String,
      title: String,
      price: Number,
      quantity: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
