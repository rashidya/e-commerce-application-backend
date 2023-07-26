const express = require('express');
const User = require('../schema/user.schema');
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
    password: req.body.password,
    role: req.body.role || 'cashier', // Default role is 'cashier' if not specified
  });

  newUser
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send('Error: ' + err);
    });
});

// PUT update user by id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
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
