const mongoose = require('mongoose');

const insSchema = new mongoose.Schema({

  created_at: {
    type: Date,
    default: new Date()
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  URL: {
    type: String
  }
});

module.exports = mongoose.model('Ins', insSchema);