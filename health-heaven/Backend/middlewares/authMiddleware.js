const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract token from the 'Authorization' header and remove 'Bearer ' prefix if present
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });

    // Attach userId (and possibly other data like username) to the request object
    req.userId = decoded.userId; // Assumes 'userId' is in the token payload
    req.username = decoded.username; // If you want to attach the username as well
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
