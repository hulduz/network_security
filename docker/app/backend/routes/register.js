const express = require('express');
const { generateSalt, hashPassword, doesUserExist, saveUser } = require('../utils/hashHelpers');

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  // Check if the username already exists
  if (doesUserExist(username)) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  // Generate salt and hash the password
  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  // Save user to the file
  saveUser(username, salt, hashedPassword);

  return res.status(201).json({ message: 'User registered successfully.' });
});

module.exports = router;
