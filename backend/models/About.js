const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  bio: { type: String },
  email: { type: String },
  photoUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);