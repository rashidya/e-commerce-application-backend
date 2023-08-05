const express = require('express');
const Sale = require('../models/sales.schema');
const Item =require('../models/item.schema');
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
    customer: req.body.customer,     // Assuming customer is the ObjectId of the customer making the purchase
    orderItems: req.body.orderItems,
    totalPrice: req.body.totalPrice,
  });

     // Reduce the item quantities and save the order
     await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const foundItem = await Item.findById(orderItem.item);
        if (foundItem) {
          const stockIndex=foundItem.stock.findIndex((stockItem)=>stockItem.color===orderItem.color&&stockItem.size===orderItem.size)
          foundItem.stock[stockIndex].quantityInStock -= orderItem.quantity; // Reduce the quantity
          await foundItem.save(); // Save the updated item
        }
        return foundItem;
      })
    );

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
