const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const authMiddleware = (req, res, next) => {
  
  const { authToken, accessFlag } = req.cookies;

  if (!accessFlag){
    return res.status(401).json({
      message:
        'Oh no! Frosty the Snowman is blocking your way. He says you need the magical cookie to proceed. 🍪',
    });
  }
  if (!authToken){
    return res.status(401).json({
      message:
        'Oh no! Frosty the Snowman doesn\'t believe it\'s you. He says you need to log in to proceed. 🎅',
    });
  }

  try{
    const decoded = jwt.verify(authToken, jwtSecret); // Verify the token
    req.user = decoded;
    next()
  }catch (err) {
    return res.status(401).json({
      message:
        'Rudolph’s nose glows red... not because of Christmas cheer, but because your token is invalid! 🎅🔑',
    });
  }
};

module.exports = authMiddleware;
