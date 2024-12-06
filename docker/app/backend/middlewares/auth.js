
function authMiddleware(req, res, next) {
  const authToken = req.cookies.authToken; // Get the authToken from cookies
  const authCookie = req.cookies.authCookie;

  if (!authCookie || !authToken) {
    return res.status(401).json({ message: 'Oh no! Frosty the Snowman is blocking your way. He says you need the magical cookie AND to log in with your Christmas credentials to proceed.🎅🍪' });
  }

  if (req.path === '/set-cookie' || (req.cookies && req.cookies['accessFlag'])) {
    next();
  }

  try {
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Rudolph’s nose glows red... not because of Christmas cheer, but because your token is invalid! Try looking in Santa\'s workshop for the correct key.🦌🔑' });
  }
}

module.exports = authMiddleware;
