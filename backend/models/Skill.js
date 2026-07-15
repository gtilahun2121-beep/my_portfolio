const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  category: {
    type: String,
    required: true
  },
  icon: String,
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Skill', skillSchema);
