const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  period: { type: String },
  bullets: [String],
  technologies: [String],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
