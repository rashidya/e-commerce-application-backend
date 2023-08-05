const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  size: String,
  color: String,
  quantity: {
    type: Number,
    default: 0,
  },
});

const saleSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orderItems:[saleItemSchema]
});

module.exports  = mongoose.model('Sale', saleSchema);
