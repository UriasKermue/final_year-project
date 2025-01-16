const jwt = require('jsonwebtoken');

const NewauthMiddleware = (req, res, next) => {
  // Extract token from the 'Authorization' header and remove 'Bearer ' prefix if present
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ message: 'No token provided' });

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });

    // Attach userId (and optionally username) to the request object
    req.user = {}; // Ensure the 'user' object exists
    req.user.userId = decoded.userId; // Assuming 'userId' is in the token payload
    req.user.username = decoded.username; // If 'username' is needed in the payload

    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = NewauthMiddleware;
