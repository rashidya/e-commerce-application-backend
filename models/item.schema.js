const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemCode: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: String,
  color: String,
  price: {
    type: Number,
    required: true,
  },
  // cost: {
  //   type: Number,
  //   required: true,
  // },
  quantityInStock: {
    type: Number,
    default: 0,
  },
  // supplier: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Supplier',
  // },
});

module.exports  = mongoose.model('Item', itemSchema);
