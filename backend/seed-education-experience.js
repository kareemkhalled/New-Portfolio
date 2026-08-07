// Rerunnable seed script — adds Education & Experience content to the database.
// Usage: node seed-education-experience.js
// To undo: node revert-education-experience.js
require('dotenv').config();
const mongoose = require('mongoose');
const Education = require('./models/Education');
const Experience = require('./models/Experience');

const education = [
  {
    title: 'Computer Science',
    institution: 'Canadian International College (CIC) — Cairo',
    description: '2 years of CS fundamentals — algorithms, data structures, software engineering, programming. Transferred after 2 years.',
    period: '2019 — 2021',
    order: 0,
  },
  {
    title: 'Faculty of Commerce',
    institution: 'Banha University',
    description: 'Continued university education at Banha University Faculty of Commerce.',
    period: '2025 — Completed',
    order: 1,
  },
  {
    title: 'AI & Machine Learning Diploma',
    institution: 'AMIT Learning — Cairo (Offline)',
    description: 'Completed comprehensive AI/ML course covering supervised learning, neural networks, NLP, and data science fundamentals.',
    period: 'Completed',
    order: 2,
  },
  {
    title: 'Frontend Development Courses',
    institution: 'DataCamp & Udemy',
    description: 'Multiple courses in React, JavaScript, TypeScript, CSS, and modern frontend development practices.',
    period: '',
    order: 3,
  },
];

const experience = [
  {
    role: 'Frontend Developer',
    company: 'EMS — Engineering Management Systems',
    location: 'Cairo, Egypt',
    period: '2024 — Present',
    bullets: [
      'Designed and built 5+ live SCADA/IoT dashboards using Vue.js and React for Siemens-integrated industrial facilities including sewage stations, smart towers, warehouses, and compounds.',
      'Developed real-time data visualizations consuming PLC tag streams — pump heatmaps, 3D scatter charts, flow trends, and KPI analytics using ECharts GL.',
      'Built a Cesium.js 3D geospatial map for Cairo water infrastructure, integrating OpenStreetMap Nominatim search and real-time station status markers.',
      'Implemented AI-generated flow and pressure predictions integrated into the operational dashboard UI.',
      'Collaborated with engineers on PLC integration, IEC 61131-3 ladder diagram logic, and SCADA system architecture.',
    ],
    technologies: ['Vue.js', 'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'ECharts GL', 'Cesium.js', 'SCADA', 'PLC', 'Siemens'],
    order: 0,
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  for (const entry of education) {
    await Education.findOneAndUpdate({ title: entry.title, institution: entry.institution }, entry, {
      upsert: true,
      runValidators: true,
    });
  }
  console.log(`${education.length} education entries upserted`);

  for (const entry of experience) {
    await Experience.findOneAndUpdate({ role: entry.role, company: entry.company }, entry, {
      upsert: true,
      runValidators: true,
    });
  }
  console.log(`${experience.length} experience entries upserted`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
