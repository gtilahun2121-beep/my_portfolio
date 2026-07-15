const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  shortDesc: String,
  image: {
    type: String,
    required: true
  },
  screenshots: [String],
  github: String,
  liveDemo: String,
  technologies: [String],
  category: String,
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  problem: String,
  solution: String,
  architecture: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
