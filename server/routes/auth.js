const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ GOOGLE AUTH START — Add These
router.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'https://swotandstudy.com/login', // safer fallback
      session: true,
    }),
    async (req, res) => {
      try {
        const user = req.user;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
  
        // redirect to frontend with token and user name (optional)
        const redirectUrl = `https://swotandstudy.com/google-success?token=${token}&name=${encodeURIComponent(user.name || '')}`;
        res.redirect(redirectUrl);
      } catch (error) {
        console.error("❌ Google Callback Error:", error);
        res.redirect('https://swotandstudy.com/login');
      }
    }
  );
  
// ✅ GOOGLE AUTH END

module.exports = router;
