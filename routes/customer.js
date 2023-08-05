const express = require("express");
const Customer = require("../models/customer.schema");
const User = require("../models/user.model");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/", async (req, res) => {
  Customer.find().populate("user", "username")
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.post("/", async (req, res) => {
  const data=req.body
  const newUser = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password,10),
    role: req.body.role || 'user', // Default role is 'user' if not specified
  });

  newUser
    .save()
    .then((user) => {
      const newCustomer = new Customer({
        name:data.name,
        address:data.address,
        phone:data.phoneNumber,
        user:user._id
      });
    
      newCustomer
        .save()
        .then((customer) => {
          res.send(customer);
        })
        .catch((err) => {
          res.send("Error: " + err);
        });
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
