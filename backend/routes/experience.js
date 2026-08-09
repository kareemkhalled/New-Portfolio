const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// GET all experience entries
router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ order: 1, createdAt: 1 });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) return res.status(404).json({ error: 'Experience entry not found' });
    res.json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ error: 'Experience entry not found' });
    res.json({ message: 'Experience entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
