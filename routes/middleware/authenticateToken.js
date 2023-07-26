// Middleware to validate the token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      next();
    });
  };