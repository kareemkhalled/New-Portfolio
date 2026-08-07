require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());          // يخلي السيرفر يفهم الـ JSON
app.use(express.static('public')); // يقدّم ملفات الفرونت لاحقاً

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/about', require('./routes/about'));
app.use('/api/education', require('./routes/education'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/upload', require('./routes/upload'));

// Test route — نتأكد إن السيرفر شغال
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Connect to MongoDB, then start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });