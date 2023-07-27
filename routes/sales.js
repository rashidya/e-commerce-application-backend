const express = require('express');
const Sale = require('../models/sales.schema');
const router = express.Router();

router.get('/', async (req, res) => {
  Sale.find()
    .populate('item', 'name price') // To populate the item details (name and price)
    .populate('customer', 'name')   // To populate the customer details (name)
    .then((sales) => {
      res.json(sales);
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

router.post('/', async (req, res) => {
  const newSale = new Sale({
    item: req.body.item,             // Assuming item is the ObjectId of the item being sold
    customer: req.body.customer,     // Assuming customer is the ObjectId of the customer making the purchase
    quantitySold: req.body.quantitySold,
    totalPrice: req.body.totalPrice,
  });

  newSale
    .save()
    .then((sale) => {
      res.send(sale);
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  Sale.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedSale) => {
      res.json(updatedSale);
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Sale.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send('Sale deleted successfully');
      } else {
        res.send('Sale not found or already deleted');
      }
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

module.exports = router;
