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

 

    // const acessToken = jwt.sign(payload, accessKey, {
    //     expiresIn: '5m',
    // })
    // const refreshToken = jwt.sign(payload, refreshKey, {
    //     expiresIn: '24h',
    // })

    // res.cookie('accessToken', acessToken, {
    //     maxAge: 1000 * 60 * 5,
    //     httpOnly: true,
    // })
    // res.cookie('refreshToken', refreshToken, {
    //     maxAge: 60 * 60 * 24 * 1000,
    //     httpOnly: true,
    // })

    // res.status(200).send({ auth: true })

    // If login is successful, issue a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: tokenExpiration,
    });

    // Return the token as a response
    res.cookie('accessToken', token, { httpOnly: true});
    res.status(200).send({ user })
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
  }
});

module.exports = router;
