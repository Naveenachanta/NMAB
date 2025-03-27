const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../utils/uploadS3');
// Get full profile info
router.get('/', authenticate, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile info' });
  }
});
// POST /api/profile/upload
router.post('/upload', authenticate, upload.single('profilePic'), async (req, res) => {
    try {
      const imageUrl = req.file.location;
  
      let profile = await UserProfile.findOne({ userId: req.user.id });
      if (!profile) {
        profile = new UserProfile({ userId: req.user.id });
      }
  
      profile.profilePic = imageUrl;
      await profile.save();
  
      res.status(200).json({ profilePic: imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to upload image' });
    }
  });
  
// 🔄 Update or create username
router.post('/username', authenticate, async (req, res) => {
  const { username } = req.body;

  try {
    let profile = await UserProfile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new UserProfile({ userId: req.user.id });
    }

    profile.username = username;
    await profile.save();

    res.status(200).json({ message: 'Username updated', profile });
  } catch (err) {
    res.status(500).json({ message: 'Error saving username' });
  }
});

// 🖼️ Update or create profile image
router.post('/image', authenticate, async (req, res) => {
  const { profilePic } = req.body;

  try {
    let profile = await UserProfile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new UserProfile({ userId: req.user.id });
    }

    profile.profilePic = profilePic;
    await profile.save();

    res.status(200).json({ message: 'Profile picture updated', profile });
  } catch (err) {
    res.status(500).json({ message: 'Error saving profile picture' });
  }
});
// POST /api/profile - Save or update username/profilePic (base64)
router.post('/', authenticate, async (req, res) => {
    const { username, profilePic } = req.body;
  
    try {
      let profile = await UserProfile.findOne({ userId: req.user.id });
  
      if (profile) {
        profile.username = username || profile.username;
        profile.profilePic = profilePic || profile.profilePic;
      } else {
        profile = new UserProfile({
          userId: req.user.id,
          username,
          profilePic
        });
      }
  
      await profile.save();
      res.status(200).json(profile);
    } catch (err) {
      res.status(500).json({ message: 'Error saving profile info' });
    }
  });
  

module.exports = router;
