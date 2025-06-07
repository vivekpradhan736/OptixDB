const express = require('express');
const Folder = require('../models/Folders');
const auth = require('../middleware/auth');
const File = require('../models/File');
const router = express.Router();

// Create a new folder
router.post('/', auth, async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ message: 'Folder name is required' });
    }

    // Validate parent folder if provided
    // if (parent) {
    //   const parentFolder = await Folder.findOne({ _id: parent, owner: req.user.id });
    //   if (!parentFolder) {
    //     return res.status(404).json({ message: 'Parent folder not found or not owned by user' });
    //   }
    // }

    // Check for duplicate folder
    const existingFolder = await Folder.findOne({
      name: name.trim(),
      owner: req.user.id,
    //   parent: parent || null,
    });
    if (existingFolder) {
      return res.status(400).json({ message: 'Folder with this name already exists in the specified location' });
    }

    // Create new folder
    const folder = new Folder({
      name: name.trim(),
      owner: req.user.id,
    //   parent: parent || null,
    });

    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    if (err) {
      return res.status(400).json({ message: 'Folder with this name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all folders for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const folders = await Folder.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all files in a specific folder
router.get('/:id/files', auth, async (req, res) => {
  try {
    const folderId = req.params.id === 'root' ? null : req.params.id;
    const query = { owner: req.user.id, folder: folderId };

    let folderName = 'Home';

    // If folderId is not 'root', verify folder ownership
    if (folderId) {
      const folder = await Folder.findOne({ _id: folderId, owner: req.user.id });
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found or not owned by user' });
      }
      folderName = folder.name;
    }

    const files = await File.find(query).sort({ uploadDate: -1 });
    res.json({
      folderName,
      files,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a folder and move its files to root
router.delete('/:id', auth, async (req, res) => {
  try {
    const folderId = req.params.id;

    // Verify folder exists and is owned by user
    const folder = await Folder.findOne({ _id: folderId, owner: req.user.id });
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found or not owned by user' });
    }

    // Delete the folder
    await Folder.deleteOne({ _id: folderId, owner: req.user.id });

    res.json({ message: 'Folder deleted successfully, files moved to root' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;