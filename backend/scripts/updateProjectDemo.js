const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

async function updateProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Update the Campus PC Monitoring project with live demo link
    const project = await Project.findOneAndUpdate(
      { github: 'https://github.com/gtilahun2121-beep/campus-pc-monitoring' },
      { 
        liveDemo: 'https://gtilahun2121-beep.github.io/campus-pc-monitoring/',
        $set: {
          // Update description to mention it's live
          description: 'A comprehensive real-time monitoring solution designed for educational institutions to track and manage computer lab resources. The system provides real-time monitoring of PC performance, usage statistics, and system health across multiple campus locations. Features include dashboard analytics, alert systems, and administrative controls for efficient IT management. This live demo showcases the monitoring interface with interactive dashboards and real-time data visualization.',
        }
      },
      { new: true }
    );

    if (project) {
      console.log('✅ Project updated with live demo link!');
      console.log('');
      console.log('📁 Updated Project:');
      console.log(`   📝 Title: ${project.title}`);
      console.log(`   🔗 GitHub: ${project.github}`);
      console.log(`   🌐 Live Demo: ${project.liveDemo}`);
      console.log(`   ⭐ Featured: ${project.featured ? 'Yes' : 'No'}`);
      console.log('');
      console.log('🎉 Your project now has a working live demo!');
      console.log('👀 View portfolio: http://localhost:3000/projects');
      console.log('🚀 Live demo: https://gtilahun2121-beep.github.io/campus-pc-monitoring/');
    } else {
      console.log('❌ Project not found. Make sure it exists first.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateProject();