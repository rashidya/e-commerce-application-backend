const express = require("express");
const Customer = require("../models/customer.schema");
const router = express.Router();
const {authenticateToken}=require('../middleware/authenticateToken')

router.get("/", authenticateToken,async (req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.post("/", async (req, res) => {
  const newCustomer = new Customer({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });

  newCustomer
    .save()
    .then((customer) => {
      res.send(customer);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.put("/:id",authenticateToken, async (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedCustomer) => {
      res.json(updatedCustomer);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.delete("/:id",authenticateToken, (req, res) => {
  const id = req.params.id;
  Customer.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send("Customer deleted successfully");
      } else {
        res.send("Customer not found or already deleted");
      }
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

module.exports = router;
