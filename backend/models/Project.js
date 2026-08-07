const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  liveUrl: { type: String },
  githubUrl: { type: String },
  technologies: [String],   // مصفوفة زي ["React", "Node.js"]
}, { timestamps: true });    // بيضيف createdAt و updatedAt تلقائي

module.exports = mongoose.model('Project', projectSchema);