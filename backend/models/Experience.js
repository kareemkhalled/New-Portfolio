const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },        // زي "Frontend Developer"
  company: { type: String },                       // زي "EMS — Engineering Management Systems"
  location: { type: String },
  period: { type: String },                        // زي "2024 — Present"
  bullets: [String],                               // نقاط وصف المسؤوليات
  technologies: [String],                          // زي ["React", "TypeScript"]
  order: { type: Number, default: 0 },             // ترتيب العرض
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
