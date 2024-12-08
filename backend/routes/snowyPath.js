const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const PORT = 8081;


router.get('/', authMiddleware, (req, res) => {
  const magicalLinks = [
    `http://localhost:${PORT}/mistletoe`,
    `http://localhost:${PORT}/snowflake`,
    `http://localhost:${PORT}/jingle-bells`,
  ];

  const message = `🎄 Congrats, adventurer! You've found Santa's secret depot. But Christmas is still in danger! While exploring, you overhear some elves chatting about strange activity down the route, perhaps there’s magic hidden there. ❄️✨ However, be careful! While talking, they mentioned three routes that still haven't been explored. Try not to get lost!`;

  res.status(200).json({
    message,
    magicalLinks,
  });
});

module.exports = router;
