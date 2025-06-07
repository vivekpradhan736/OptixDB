const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};