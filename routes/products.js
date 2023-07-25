const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

router.get("/", async (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.send("Error : " + err);
    });
});

router.post("/", async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    qty_on_hand: req.body.qty_on_hand,
    unit_price: req.body.unit_price,
  });

  newProduct
    .save()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send("Error : " + err);
    });
});

router.put("/", async (req, res) => {
  Product.findByIdAndUpdate(req.body.id, req.body.data, { new: true })
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((err) => {
      res.send("Error : " + err);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Product.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send("Item deleted successfully");
      } else {
        res.send("Item not found or already deleted");
      }
    })
    .catch((err) => {
      res.send("Error:" + err);
    });
});

module.exports = router;
