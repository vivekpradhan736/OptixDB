const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null }, // Reference to Folder
  uploadDate: { type: Date, default: Date.now },
});

fileSchema.index({ owner: 1, uploadDate: -1 });
fileSchema.index({ folder: 1 });

module.exports = mongoose.model('File', fileSchema);