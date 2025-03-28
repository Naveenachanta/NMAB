const express = require('express');
const router = express.Router(); // ✅ This was missing
const Preference = require('../models/Preference');
const authenticate = require('../middleware/authMiddleware'); // ⬅️ JWT check
const mongoose = require('mongoose');
// GET preferences for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const preference = await Preference.findOne({ userId: req.user.id });
    if (!preference) {
      return res.status(404).json({ message: 'No preferences found' });
    }
    res.status(200).json(preference);
  } catch (error) {
    console.error("❌ Error fetching preferences:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save or update preferences
router.post('/', authenticate, async (req, res) => {
  console.log('🔐 req.user:', req.user);
  console.log('📦 req.body:', req.body);

  const { gender, skinType, skinColor, skinConcerns } = req.body;

  try {
    if (!req.user?.id) {
      console.error('❌ Missing user ID in token');
      return res.status(401).json({ message: 'Unauthorized - No user ID' });
    }

    let preference = await Preference.findOne({ userId: req.user.id });

    if (preference) {
      console.log('📝 Updating existing preferences');
      preference.gender = gender;
      preference.skinType = skinType;
      preference.skinColor = skinColor;
      preference.skinConcerns = skinConcerns;
      await preference.save();
    } else {
      console.log('🆕 Creating new preferences');
      preference = new Preference({
        userId: new mongoose.Types.ObjectId(req.user.id), // Ensures ObjectId format
        gender,
        skinType,
        skinColor,
        skinConcerns
      });
      await preference.save();
    }

    console.log('✅ Preferences saved:', preference);
    res.status(200).json(preference);
  } catch (error) {
    console.error('❌ Error saving preferences:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
