const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Authorization Header:", authHeader);  // Debugging line

  const token = authHeader && authHeader.split(' ')[1];  // Extract token
  console.log("Extracted Token:", token);  // Debugging line

  if (!token) {
    console.log("No token found in request!");
    return res.status(401).json({ message: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT Payload:", decoded);  // Debugging line

    req.user = decoded;  // Attach decoded user info to request
    next();  // Proceed to next middleware/route
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { authenticateToken };



// const jwt = require('jsonwebtoken');

// // Middleware to authenticate JWT token
// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from Authorization header
//   console.log("Authorization Header:", token);  // Debugging line


//   if (!token) {
//     return res.status(401).json({ message: 'Access denied, no token provided.' });
//   }

//   try {
//     // Verify the token using the secret key
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;  // Attach the decoded user info (id, role) to the request object
//     next();  // Pass control to the next handler
//   } catch (err) {
//     console.error(err);
//     return res.status(403).json({ message: 'Invalid or expired token.' });
//   }
// };

// module.exports = { authenticateToken };
