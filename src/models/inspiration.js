const mongoose = require('mongoose');

const inspirationSchema = new mongoose.Schema({

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
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    require: true
  },
  URL: {
    type: String
  },
  status:{
    type: Boolean
  }
});

module.exports = mongoose.model('Inspiration', inspirationSchema);