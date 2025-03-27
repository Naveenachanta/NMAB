const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
  name: String,
  dueDate: {
    type: Date,
    required: true,
  },         // ✅ Not 'date'
  frequency: Number,
  userId: String,
});

module.exports = mongoose.model('Bill', billSchema);
