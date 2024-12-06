const express = require('express');
const { verifyPassword } = require('../utils/hashHelpers');
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required. 🎅 Don\'t leave the fields empty! 🎄' });
  }

  if (verifyPassword(username, password)) {
    // Set cookies for session management
    res.cookie('authToken', username, { httpOnly: true, secure: true });
    return res.status(200).json({ message: '✨ Ho ho ho, success! 🎄 Welcome to Santa’s secret workshop! You’ve been granted access to the magical realms. The flag is closer than you think—stay on the nice list! 🎅', authToken:  password });
  }

  return res.status(401).json({ message: 'Invalid username or password! 🎅 Check your details and try again. 🎄' });
});

module.exports = router;
