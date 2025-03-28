const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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
    // ✅ Get JWT token created in the Passport Google strategy
    const token = req.user.jwtToken;

    // ✅ Redirect to frontend with token as query parameter
    res.redirect(`https://swotandstudy.com/google-success?token=${token}`);

}
);

module.exports = router;
