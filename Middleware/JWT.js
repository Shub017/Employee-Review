// Import the jsonwebtoken library
import jwt from 'jsonwebtoken';

// Middleware to verify JWT on protected routes
export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    // Check if the token is in the blacklist
    if (tokenBlacklist.has(token)) {
      return res.sendStatus(401);
    }

    console.log(tokenBlacklist);

    console.log(token);
  
    // Verify the token
    jwt.verify(token, process.env.jwtSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };
  

// Endpoint for user login
export const loginUser = (user) => {
  if (user) {
    // Generate JWT token with user data
    const secretKey = process.env.jwtSecretKey;
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    // Send the token as a response
    return token
  } else {
    return false;
  }
};


// Maintain a list of revoked tokens (blacklist)
const tokenBlacklist = new Set();

// Endpoint for user logout
export const logoutUser = (req, res) => {
  const token = req.headers.authorization;

  // Add the token to the blacklist
  tokenBlacklist.add(token);
  console.log(tokenBlacklist);

  res.json({status:"Success", message: 'Logout successful' });
};
