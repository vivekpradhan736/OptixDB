const User = require('../models/User');

module.exports = async (req, res, next) => {
  const apiKey = req.header('Authorization')?.replace('Bearer ', '');
  if (!apiKey){
    return res.status(401).json({ message: 'No API key provided' });
  } 
  try {
    const user = await User.findOne({ apiKey });
    if (!user) {
        return res.status(401).json({ message: 'Invalid API key' });
    }
    req.user = { id: user._id };
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};