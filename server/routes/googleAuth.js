const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route: Start Google login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route: Callback after Google login
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'https://swotandstudy.com/login',
  }),
  (req, res) => {
    try {
      if (!req.user || !req.user.jwtToken) {
        console.error('❌ Missing token or user');
        return res.status(500).send('Login failed');
      }

      const token = req.user.jwtToken;
      const name = encodeURIComponent(req.user.name || '');
      res.redirect(`https://swotandstudy.com/google-success?token=${token}&name=${name}`);
    } catch (error) {
      console.error('❌ Redirect error:', error);
      res.status(500).send('Server error during Google redirect');
    }
  }
);

module.exports = router;
