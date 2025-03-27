const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google OAuth flow
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback after Google authentication
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'https://swotandstudy.com/dashboard',
    failureRedirect: 'https://swotandstudy.com/login',
  })
);

module.exports = router;
