// Reverts seed-education-experience.js by dropping everything it added.
// Safe to run even if the collections don't exist.
// Usage: node revert-education-experience.js
require('dotenv').config();
const mongoose = require('mongoose');
const Education = require('./models/Education');
const Experience = require('./models/Experience');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const edResult = await Education.deleteMany({});
  console.log(`Removed ${edResult.deletedCount} education entries`);

  const expResult = await Experience.deleteMany({});
  console.log(`Removed ${expResult.deletedCount} experience entries`);

  await mongoose.disconnect();
  console.log('Done. Database data reverted to pre-Education/Experience state.');
}

run().catch((err) => {
  console.error('Revert failed:', err);
  process.exit(1);
});
