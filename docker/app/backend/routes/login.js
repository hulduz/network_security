const express = require('express');
const { verifyPassword } = require('../utils/hashHelpers');
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (verifyPassword(username, password)) {
    // Set cookies for session management
    res.cookie('authToken', username, { httpOnly: true, secure: true });
    return res.status(200).json({ message: 'Login successful!', authToken:  password });
  }

  return res.status(401).json({ message: 'Invalid username or password.' });
});

module.exports = router;
