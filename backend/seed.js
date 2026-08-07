// One-off/rerunnable seed script — imports content from the old portfolio
// (kareemkhalled.github.io/kareem-portfolio) into this project's database.
// Usage: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const About = require('./models/About');
const Skill = require('./models/Skills');
const Project = require('./models/Project');

const about = {
  name: 'Kareem Khaled',
  title: 'Frontend Developer & SCADA UI Engineer',
  bio: "I specialize in translating complex industrial data from PLCs and IoT sensors into intuitive, high-performance dashboards. Currently at EMS (Engineering Management Systems), a Siemens-related infrastructure company, I've built monitoring systems for sewage stations, smart towers, warehouses, compounds, and malls — with hands-on experience across SCADA architecture, PLC tag mapping, DevOps pipelines, and backend services.",
  email: 'kareemkhalled268@gmail.com',
};

const skills = [
  // Frontend
  { name: 'Next.js 15', category: 'Frontend' },
  { name: 'React 19', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'JavaScript (ES2024)', category: 'Frontend' },
  { name: 'HTML5/CSS3', category: 'Frontend' },
  { name: 'Responsive UI/UX', category: 'Frontend' },
  // Industrial / SCADA
  { name: 'SCADA System Design', category: 'Industrial/SCADA' },
  { name: 'PLC Tag Mapping', category: 'Industrial/SCADA' },
  { name: 'IEC 61131-3 Logic', category: 'Industrial/SCADA' },
  { name: 'IoT Data Integration', category: 'Industrial/SCADA' },
  { name: 'ECharts / ECharts GL', category: 'Industrial/SCADA' },
  { name: 'Cesium.js 3D Maps', category: 'Industrial/SCADA' },
  { name: 'Real-time Dashboards', category: 'Industrial/SCADA' },
  // Backend & DevOps
  { name: 'Node.js', category: 'Backend & DevOps' },
  { name: 'Python/Flask', category: 'Backend & DevOps' },
  { name: 'REST APIs', category: 'Backend & DevOps' },
  { name: 'Docker/Nginx', category: 'Backend & DevOps' },
  { name: 'Cloudflare Tunnel', category: 'Backend & DevOps' },
  { name: 'Git/GitHub', category: 'Backend & DevOps' },
  { name: 'Linux/Ubuntu', category: 'Backend & DevOps' },
  // AI & Data
  { name: 'Machine Learning', category: 'AI & Data' },
  { name: 'TF-IDF / Scikit-learn', category: 'AI & Data' },
  { name: 'Data Visualization', category: 'AI & Data' },
  { name: 'NLP/Arabic OCR', category: 'AI & Data' },
  { name: 'AI-powered UI', category: 'AI & Data' },
  // Design
  { name: 'UI/UX Design', category: 'Design' },
  { name: 'HMI/SCADA UI Patterns', category: 'Design' },
  { name: 'SVG Animation', category: 'Design' },
  { name: 'Figma', category: 'Design' },
  { name: 'Dark Theme Systems', category: 'Design' },
  // Languages
  { name: 'Arabic', level: 'Native', category: 'Languages' },
  { name: 'English', level: 'Professional', category: 'Languages' },
];

const projects = [
  {
    title: 'Water Station SCADA Dashboard',
    description:
      'Full-scale SCADA monitoring system for a sewage lifting station, featuring a 3D isometric facility visualization, real-time pump heatmaps, water hammer monitoring, AI-generated flow & pressure predictions, fault/trip analytics, and SDG-aligned KPI dashboards.',
    technologies: ['Next.js 15', 'React 19', 'ECharts GL', 'TypeScript', 'PLC Tags', 'Siemens', 'AI Integration', 'Tailwind CSS'],
  },
  {
    title: 'CN-05 Tower — Smart Building BMS Dashboard',
    description:
      'Building management system for a high-rise tower covering energy runtime, chiller system, street lighting, HVAC (AHUs), elevator monitoring, security with live CCTV feeds, and occupancy tracking.',
    technologies: ['Next.js', 'React', 'IoT/BMS', 'TypeScript', 'Siemens'],
  },
  {
    title: 'Park Lane Compound — Infrastructure Control',
    description:
      'Smart monitoring platform for a residential & commercial compound covering occupancy, operation cost tracking (electrical/water/gas), carbon footprint analytics, sustainability metrics (solar PV, recycle revenue), and parking statistics.',
    technologies: ['React 19', 'TypeScript', 'BMS', 'Tailwind CSS', 'Siemens'],
  },
  {
    title: 'Abdul Latif Jameel — Warehouse Operational Dashboard',
    description:
      'Industrial facility monitoring dashboard built for Secutronic, covering electrical consumption by zone, chiller temperature monitoring, AHU control, fire alarm system, CCTV, vehicle entry/exit analysis, and staff occupancy tracking.',
    technologies: ['Next.js', 'ECharts', 'IoT', 'TypeScript', 'Secutronic'],
  },
  {
    title: 'Zia Mall — BMS & IoT Monitoring',
    description:
      'Complete monitoring dashboard for a mall in the New Administrative Capital, covering data center monitoring, UPS systems, battery status, access control, CCTV with live feeds, internet connectivity stats, and passive infrastructure (fiber optic) monitoring.',
    technologies: ['React', 'TypeScript', 'BMS', 'Siemens'],
  },
  {
    title: 'Cesium.js 3D Station Map',
    description:
      "Interactive 3D geospatial map of Cairo's water infrastructure network, built on Cesium.js with CartoDB Dark Matter tiles, real-time station status markers, and Cairo-bounded OSM Nominatim search.",
    technologies: ['Cesium.js', 'Next.js', 'OpenStreetMap', '3D Mapping'],
    githubUrl: 'https://github.com/kareemkhalled/water-station-dashboard-analysis-model',
  },
  {
    title: 'BOQ Processing Platform',
    description:
      'Automated Bill of Quantities processor built in Python/Flask, supporting PDF, CSV, and Excel inputs with Arabic text detection, Google Translate integration, and ML-based CSI MasterFormat classification (TF-IDF + logistic regression) achieving a 100% match rate.',
    technologies: ['Python', 'Flask', 'Machine Learning', 'NLP', 'Arabic OCR'],
    githubUrl: 'https://github.com/kareemkhalled/bill-of-quantities-platform-analysis',
  },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await About.findOneAndUpdate({}, about, { upsert: true, new: true, runValidators: true });
  console.log('About upserted');

  for (const skill of skills) {
    await Skill.findOneAndUpdate({ name: skill.name }, skill, { upsert: true, runValidators: true });
  }
  console.log(`${skills.length} skills upserted`);

  for (const project of projects) {
    await Project.findOneAndUpdate({ title: project.title }, project, { upsert: true, runValidators: true });
  }
  console.log(`${projects.length} projects upserted`);

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
