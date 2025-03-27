const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gender: String,
  skinType: String,
  skinColor: String,
  skinConcerns: [String], // Allows multiple concerns like acne, dullness etc.
}, { timestamps: true });

module.exports = mongoose.model('Preference', preferenceSchema);
