const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST /api/newsletter
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // Check if already subscribed
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Already subscribed' });

    const newEntry = new Newsletter({ email });
    await newEntry.save();
    res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (err) {
    console.error('Newsletter error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
