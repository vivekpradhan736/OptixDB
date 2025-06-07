const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  apiKey: { type: String, unique: true },
  cloudName: { type: String, unique: true },
  usage: {
    totalSize: { type: Number, default: 0 },
    monthlyLimit: { type: Number, default: 100 * 1024 * 1024 }, // 100MB for free plan
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  if (!this.apiKey) {
    this.apiKey = require('crypto').randomBytes(16).toString('hex');
  }
  if (!this.cloudName) {
    this.cloudName = require('crypto').randomBytes(10).toString('hex').slice(0, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);