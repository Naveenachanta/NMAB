const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback after Google authentication
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: 'https://swotandstudy.com/login',
  }),
  (req, res) => {
    const token = req.user?.jwtToken;

    if (token) {
      // ✅ Redirect to frontend with token
      res.redirect(`https://swotandstudy.com/google-success?token=${token}`);
    } else {
      // ❌ Fallback to login if token missing
      res.redirect('https://swotandstudy.com/login');
    }
  }
);

module.exports = router;
