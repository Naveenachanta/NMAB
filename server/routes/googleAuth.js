const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../config/passport'); // Make sure this is required here

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://swotandstudy.com/login',
  }),
  (req, res) => {
    // Generate token manually here
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.redirect(`https://swotandstudy.com/google-success?token=${token}`);
  }
);

module.exports = router;
