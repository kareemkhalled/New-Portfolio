const express = require('express');
const router = express.Router();
const About = require('../models/About');

// GET — جيب بيانات الـ about (سجل واحد)
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT — عدّل (أو أنشئ لو مش موجود) — upsert
router.put('/', async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,          // لو مفيش سجل، اعمل واحد
      runValidators: true,
    });
    res.json(about);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;