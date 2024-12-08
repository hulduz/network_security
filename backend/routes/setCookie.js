const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('accessFlag', 'secretCookieValue', { httpOnly: true, secure: false }); 
  res.status(200).send('🍪 Great, you’ve got your cookies! Now head to /api/snowy-path to uncover the next step in Santa\'s plans. ✨');
});

module.exports = router;
