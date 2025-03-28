const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only needed for traditional login
  name: { type: String },
  googleId: { type: String }, // Optional, for Google users
});

module.exports = mongoose.model('User', UserSchema);
