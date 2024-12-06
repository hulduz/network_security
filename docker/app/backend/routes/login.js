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
    
    const tokenPayload = { username }; 
    console.log('jwtSecret:', jwtSecret);  // This should log your secret key

    const authToken = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '1h' });
    console.log('authToken:', authToken);  // This should log your secret key

    
    res.cookie('authToken', authToken, { httpOnly: true, secure: true });
    return res.status(200).json({ message: '✨ Ho ho ho, success! 🎄 Welcome back to Santa’s secret workshop! You’ve been granted access to the magical realms. The flag is closer than you think—stay on the nice list! 🎅' });
  }

  return res.status(401).json({ message: 'Invalid username or password! 🎅 Check your details and try again. 🎄' });
});

module.exports = router;
