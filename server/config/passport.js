const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://api.swotandstudy.com/api/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const displayName = profile.displayName;

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // Update name if not set
      if (!user.name) {
        user.name = displayName;
        await user.save();
      }
      return done(null, user);
    }

    // If not, create a new user
    user = new User({
      email,
      name: displayName,
      googleId: profile.id,
    });

    await user.save();
    done(null, user);
  } catch (err) {
    console.error('Error in Google Strategy:', err);
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
