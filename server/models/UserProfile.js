const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: false
  },
  profilePic: {
    type: String, // image URL or base64 string
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
