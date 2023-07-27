const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  address: String,
});

const Customer = mongoose.model('Customer', customerSchema);
