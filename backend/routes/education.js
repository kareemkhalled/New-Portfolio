const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

// GET all education entries
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: 1 });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!education) return res.status(404).json({ error: 'Education entry not found' });
    res.json(education);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ error: 'Education entry not found' });
    res.json({ message: 'Education entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
