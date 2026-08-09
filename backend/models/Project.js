const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String },
  technologies: [String],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);