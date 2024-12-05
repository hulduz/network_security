
function authMiddleware(req, res, next) {
  const authToken = req.cookies.authToken; // Get the authToken from cookies

  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized: Please log in.' });
  }

  try {
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
  }
}

module.exports = authMiddleware;
