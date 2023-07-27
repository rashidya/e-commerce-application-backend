require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const router = express.Router();


const secretKey = process.env.SECRET_KEY;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ message: 'User does not exists' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If login is successful, issue a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Return the token as a response
    res.json({ token });
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
  }
});

module.exports = router;
