const express = require('express');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

const decoyMessages = {
  mistletoe: `🎄 You walk down the Mistletoe Trail. The air smells like fresh pine, and you hear a faint jingle echoing in the distance. Along the path, you notice a weathered signpost that says: \'Two travelers once passed this way, leaving behind only footsteps and whispers of a hidden secret.\'`,
  bells: `🎅 The sound of bells grows louder as you step onto Jingle Bell Way. You spot a sign nailed to a tree, which reads: \'Nine reindeer once galloped through the snow, carrying Santa's sleigh. Their hoofprints faded, but their number remains, as does their connection to the holiday spirit.\'`,
  snowflake: `❄️ You find Santa's admins discussing security over hot cocoa. They whisper: \'We know the port starts with the only digit that is the final character our passwords, but we lost the intel for the other two digits. Can you help us figure it out? That port holds the key to saving Christmas.\'`,
};

router.get('/:path', authMiddleware, (req, res) => {
  const { path } = req.params;

  if (decoyMessages[path]) {
    return res.status(200).json({ message: decoyMessages[path] });
  }
  res.status(404).json({message: 'Uh-oh! You seem to have wandered off the sleigh route. 🚫'});
});

module.exports = router;
