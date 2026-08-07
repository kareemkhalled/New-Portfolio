const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },  // زي "JavaScript"
  level: { type: String },                 // زي "Advanced" أو نسبة مئوية
  category: { type: String },              // زي "Frontend" أو "Backend"
}, { timestamps: true });

module.exports = mongoose.model('SkillS', skillSchema);