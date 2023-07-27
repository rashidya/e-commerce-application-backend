const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sales:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sale',
  }]
});

module.exports  = mongoose.model('Orders', ordersSchema);
