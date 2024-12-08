const express = require('express');
const { generateSalt, hashPassword, doesUserExist, saveUser } = require('../utils/hashHelpers');

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (doesUserExist(username)) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  saveUser(username, salt, hashedPassword);

  return res.status(201).json({ message: 'User registered successfully.' });
});

module.exports = router;
