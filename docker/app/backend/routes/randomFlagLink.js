const express = require('express');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const PORT = process.env.PORT || 8081;
const authMiddleware = require('../middlewares/auth');


router.get('/', authMiddleware, (req, res) => {

  const randomPath = crypto.randomBytes(8).toString('hex');
  const flagPath = path.join(__dirname, '../public', randomPath);
  const flagContent = 'Santa cheers, \'Ho ho ho! You’ve saved Christmas by capturing the flag! Enjoy your reward: FLAG{Christmas_Magic_Found}. Have a merry holiday season, adventurer! 🎄🎁✨';

  // Create flag file if it doesn't exist
  if (!fs.existsSync(flagPath)) {
    fs.writeFileSync(flagPath, `<html><body>${flagContent}</body></html>`);
  }

  const flagLink = `http://localhost:${PORT}/${randomPath}`;
  res.status(200).json({ link: flagLink });
});

module.exports = router;
