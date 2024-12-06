const express = require('express');
const router = express.Router();

// Route for setting the access cookie
router.get('/', (req, res) => {
  res.cookie('accessFlag', 'secretCookieValue', { httpOnly: true, secure: false }); 
  res.status(200).send('You\'ve unlocked an enchanted candy cane. Follow this magical link : /api/random-flag-link 🎄✨');
});

module.exports = router;
