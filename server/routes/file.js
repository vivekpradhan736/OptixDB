const express = require('express');
const multer = require('multer');
const s3 = require('../config/aws');
const File = require('../models/File');
const Folder = require('../models/Folders'); // Import Folders model
const User = require('../models/User');
const auth = require('../middleware/auth');
const apikey = require('../middleware/apikey');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', [apikey, upload.single('file')], async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!req.file) return res.status(400).json({ message: 'No file provided' });

    // Check usage limit
    if (req.file.size + user.usage.totalSize > user.usage.monthlyLimit) {
      return res.status(400).json({ message: 'Upload limit exceeded' });
    }

    const { folder: folderName = '', folderId = '' } = req.body;
    let folder = null;

    // Handle folder creation or fetching
    if (folderName) {
      folder = await Folder.findOne({ name: folderName, owner: req.user.id });
      if (!folder) {
        folder = new Folder({ name: folderName, owner: req.user.id });
        await folder.save();
      }
    } else if (folderId) {
      folder = await Folder.findById(folderId);
      if (!folder) {
        return res.status(400).json({ message: 'Folder not found' });
      }
    }

    // Upload file to S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const data = await s3.upload(params).promise();

    // Save file record
    const newFile = new File({
      filename: req.file.originalname,
      url: data.Location,
      type: req.file.mimetype,
      size: req.file.size,
      owner: req.user.id,
      folder: folder ? folder._id : undefined,
    });
    await newFile.save();

    // Update user usage
    user.usage.totalSize += req.file.size;
    await user.save();

    res.json(newFile);

  } catch (err) {
    console.error('Upload Error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Folder name already exists' });
    }
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.get('/files', auth, async (req, res) => {
  try {
    const { folderId } = req.query;
    const query = { owner: req.user.id };
    if (folderId) {
      query.folder = folderId === 'root' ? null : folderId;
    }
    const files = await File.find(query).sort({ uploadDate: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/files/:id', auth, async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file || file.owner.toString() !== req.user.id) {
    return res.status(404).json({ message: 'File not found' });
  }
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.url.split('/').pop(), // Extract key from URL
  };
  await s3.deleteObject(params).promise();
  await file.remove();
  const user = await User.findById(req.user.id);
  user.usage.totalSize -= file.size;
  await user.save();
  res.json({ message: 'File deleted' });
});

module.exports = router;