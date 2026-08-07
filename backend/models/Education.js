const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },      // زي "Computer Science" أو "AI & Machine Learning Diploma"
  institution: { type: String },                 // زي "Canadian International College (CIC) — Cairo"
  description: { type: String },
  period: { type: String },                       // زي "2019 — 2021" أو "Completed"
  order: { type: Number, default: 0 },            // ترتيب العرض
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
