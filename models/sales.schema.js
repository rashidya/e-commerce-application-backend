const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  quantitySold: {
    type: Number,
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
});

const Sale = mongoose.model('Sale', saleSchema);
