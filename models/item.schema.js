const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  size: String,
  color: String,
  quantityInStock: {
    type: Number,
    default: 0,
  },
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: [stockSchema], // Use an array of stockSchema objects
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
