const express = require("express");
const Customer = require("../schema/customer.schema");
const router = express.Router();

router.get("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedCustomer) => {
      res.json(updatedCustomer);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.delete("/:id", (req, res) => {
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
