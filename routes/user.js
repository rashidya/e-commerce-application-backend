const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

// POST create a new user
router.post('/', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: await bcrypt.hash(req.body.password,10),
    role: req.body.role || 'user', // Default role is 'user' if not specified
  });

  newUser.save()
    .then(() => {
      res.send("User created succcefully");
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

// PUT update user by id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const data=req.body
  if(data.password){
    data.password=await bcrypt.hash(data.password,10)
  }

  User.findByIdAndUpdate(id, data, { new: true })
    .then(() => {
      res.send("User updated succefully");
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

// DELETE user by id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.send('User deleted successfully');
      } else {
        res.send('User not found or already deleted');
      }
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});


module.exports = router;
