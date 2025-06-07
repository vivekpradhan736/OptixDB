const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.apiKey = require('crypto').randomBytes(16).toString('hex');
  await user.save();
  res.json({ apiKey: user.apiKey });
});

module.exports = router;