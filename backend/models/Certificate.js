const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: String,
  issueDate: Date,
  year: String,
  url: String,
  credentialId: String,
  description: String,
  skills: [String],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Certificate', certificateSchema);
