const express = require('express');
const router = express.Router();

// Route for setting the access cookie
router.get('/', (req, res) => {
  res.cookie('accessFlag', 'secretCookieValue', { httpOnly: true, secure: false }); 
  res.status(200).send('Cookie set. Go to /api/random-flag-link');
});

module.exports = router;
