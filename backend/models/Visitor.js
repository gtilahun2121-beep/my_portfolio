const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String,
  page: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Visitor', visitorSchema);
