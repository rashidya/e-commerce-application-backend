const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../schema/user.schema');
const router = express.Router();

const secretKey = 'your-secret-key'; 
const tokenExpiration = '1d';

// GET all users
router.get('/',authenticateToken, async (req, res) => {
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
    role: req.body.role || 'user', // Default role is 'user' if not specified
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
router.put('/:id',authenticateToken, async (req, res) => {
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
router.delete('/:id',authenticateToken, (req, res) => {
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // If login is successful, issue a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Return the token as a response
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
