const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: { type: String },
  description: { type: String },
  period: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
