const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String },
  category: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SkillS', skillSchema);