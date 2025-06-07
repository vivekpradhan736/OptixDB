const express = require('express');
const File = require('../models/File');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get total space used by the authenticated user
router.get('/usage', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('usage');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const files = await File.find({ owner: req.user.id }).select('size');
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);

    if (user.usage.totalSize !== totalSize) {
      user.usage.totalSize = totalSize;
      await user.save();
    }

    res.json({
      totalSize: totalSize,
      monthlyLimit: user.usage.monthlyLimit,
      percentageUsed: (totalSize / user.usage.monthlyLimit) * 100,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get file type summary (Images, Media, Documents, Others)
router.get('/summary', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Aggregate files by type
    const summary = await File.aggregate([
      { $match: { owner: user._id } },
      {
        $group: {
          _id: null,
          image: {
            $sum: {
              $cond: [{ $regexMatch: { input: '$type', regex: '^image/' } }, '$size', 0],
            },
          },
          imageLatest: {
            $max: {
              $cond: [{ $regexMatch: { input: '$type', regex: '^image/' } }, '$uploadDate', null],
            },
          },
          video: {
            $sum: {
              $cond: [{ $regexMatch: { input: '$type', regex: '^video/' } }, '$size', 0],
            },
          },
          videoLatest: {
            $max: {
              $cond: [{ $regexMatch: { input: '$type', regex: '^video/' } }, '$uploadDate', null],
            },
          },
          audio: {
            $sum: {
              $cond: [{ $regexMatch: { input: '$type', regex: '^audio/' } }, '$size', 0],
            },
          },
          audioLatest: {
            $max: {
              $cond: [{ $regexMatch: { input: '$type', regex: '^audio/' } }, '$uploadDate', null],
            },
          },
          document: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$type', 'application/pdf'] },
                    { $eq: ['$type', 'application/msword'] },
                    { $eq: ['$type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
                    { $regexMatch: { input: '$filename', regex: '\.(pdf|doc|docx)$', options: 'i' } },
                  ],
                },
                '$size',
                0,
              ],
            },
          },
          documentLatest: {
            $max: {
              $cond: [
                {
                  $or: [
                    { $eq: ['$type', 'application/pdf'] },
                    { $eq: ['$type', 'application/msword'] },
                    { $eq: ['$type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
                    { $regexMatch: { input: '$filename', regex: '\.(pdf|doc|docx)$', options: 'i' } },
                  ],
                },
                '$uploadDate',
                null,
              ],
            },
          },
          other: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $not: { $regexMatch: { input: '$type', regex: '^image/' } } },
                    { $not: { $regexMatch: { input: '$type', regex: '^video/' } } },
                    { $not: { $regexMatch: { input: '$type', regex: '^audio/' } } },
                    {
                      $not: {
                        $or: [
                          { $eq: ['$type', 'application/pdf'] },
                          { $eq: ['$type', 'application/msword'] },
                          { $eq: ['$type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
                          { $regexMatch: { input: '$filename', regex: '\.(pdf|doc|docx)$', options: 'i' } },
                        ],
                      },
                    },
                  ],
                },
                '$size',
                0,
              ],
            },
          },
          otherLatest: {
            $max: {
              $cond: [
                {
                  $and: [
                    { $not: { $regexMatch: { input: '$type', regex: '^image/' } } },
                    { $not: { $regexMatch: { input: '$type', regex: '^video/' } } },
                    { $not: { $regexMatch: { input: '$type', regex: '^audio/' } } },
                    {
                      $not: {
                        $or: [
                          { $eq: ['$type', 'application/pdf'] },
                          { $eq: ['$type', 'application/msword'] },
                          { $eq: ['$type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
                          { $regexMatch: { input: '$filename', regex: '\.(pdf|doc|docx)$', options: 'i' } },
                        ],
                      },
                    },
                  ],
                },
                '$uploadDate',
                null,
              ],
            },
          },
        },
      },
      {
        $project: {
          document: { size: '$document', latestDate: '$documentLatest' },
          image: { size: '$image', latestDate: '$imageLatest' },
          video: { size: '$video', latestDate: '$videoLatest' },
          audio: { size: '$audio', latestDate: '$audioLatest' },
          other: { size: '$other', latestDate: '$otherLatest' },
        },
      },
    ]);

    const result = summary[0] || {
      document: { size: 0, latestDate: null },
      image: { size: 0, latestDate: null },
      video: { size: 0, latestDate: null },
      audio: { size: 0, latestDate: null },
      other: { size: 0, latestDate: null },
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;