const express = require('express');
const { verifyPassword } = require('../utils/hashHelpers');
const router = express.Router();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

router.post('/', (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required. 🎅 Don\'t leave the fields empty! 🎄' });
  }

  if (verifyPassword(username, password)) {
  
    const authToken = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });  
    res.cookie('authToken', authToken, { httpOnly: true, secure: true });
    return res.status(200).json({ message: '✨ Ho ho ho, it\'s really you! 🎄 Welcome back! You’ve been granted access to the magical realms. Let\'s get to work, Christmas is closer than you think! 🎅' });
  }

  return res.status(401).json({ message: 'Invalid username or password! 🎅 Check your details and try again. 🎄' });
});

module.exports = router;
