const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null }, // For nested folders
  createdAt: { type: Date, default: Date.now },
});

folderSchema.index({ owner: 1, name: 1 }, { unique: true }); // Prevent duplicate folder names in the same parent

module.exports = mongoose.model('Folder', folderSchema);