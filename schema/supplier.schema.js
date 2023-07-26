const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: String,
  address: String,
});

const Supplier = mongoose.model('Supplier', supplierSchema);
