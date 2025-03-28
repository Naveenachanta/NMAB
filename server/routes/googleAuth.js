const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../config/passport'); // Make sure this is required here

router.get(
    '/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: 'https://swotandstudy.com/login',
    }),
    (req, res) => {
      console.log('🎯 Google callback reached');
      console.log('User:', req.user);
  
      if (!req.user || !req.user.jwtToken) {
        console.error('❌ JWT token not found!');
        return res.status(500).send('Token generation failed.');
      }
  
      const redirectURL = `https://swotandstudy.com/google-success?token=${req.user.jwtToken}`;
      console.log('🚀 Redirecting to:', redirectURL);
  
      res.redirect(redirectURL);
    }
  );
  

module.exports = router;
