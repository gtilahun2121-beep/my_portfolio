const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const campusProject = {
  title: 'Campus PC Monitoring System',
  description: 'A comprehensive real-time monitoring solution designed for educational institutions to track and manage computer lab resources. The system provides real-time monitoring of PC performance, usage statistics, and system health across multiple campus locations. Features include dashboard analytics, alert systems, and administrative controls for efficient IT management. Administrators can monitor CPU usage, memory consumption, disk space, network activity, and user sessions across all connected PCs in the campus network.',
  shortDesc: 'Real-time monitoring system for tracking PC usage and performance across campus computer labs',
  image: 'https://via.placeholder.com/600x400/4f46e5/white?text=Campus+PC+Monitor',
  screenshots: [
    'https://via.placeholder.com/800x600/10b981/white?text=Dashboard+View',
    'https://via.placeholder.com/800x600/f59e0b/white?text=PC+Status+Grid',
    'https://via.placeholder.com/800x600/ef4444/white?text=Analytics+Charts'
  ],
  github: 'https://github.com/gtilahun2121-beep/campus-pc-monitoring',
  liveDemo: '', // Add if you have a live demo
  technologies: ['Python', 'Flask', 'JavaScript', 'HTML5', 'CSS3', 'SQLite', 'Chart.js', 'Bootstrap', 'WebSocket'],
  category: 'Web Application',
  featured: true,
  order: 1,
  problem: 'Campus IT administrators needed a centralized way to monitor computer lab usage, track system performance, and identify maintenance needs across multiple locations without manually checking each PC.',
  solution: 'Developed a web-based monitoring system with real-time data collection, automated alerting capabilities, and intuitive dashboards that allow administrators to manage campus computing resources efficiently from a single interface.',
  architecture: 'Built using Flask backend with SQLite database, real-time WebSocket connections for live updates, Chart.js for data visualization, and responsive Bootstrap frontend for cross-device compatibility.'
};

async function addProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if project already exists
    const existingProject = await Project.findOne({ 
      $or: [
        { title: campusProject.title },
        { github: campusProject.github }
      ]
    });

    if (existingProject) {
      console.log('⚠️  Project already exists! Updating...');
      await Project.findByIdAndUpdate(existingProject._id, campusProject);
      console.log('✅ Project updated successfully!');
    } else {
      const project = new Project(campusProject);
      await project.save();
      console.log('✅ Campus PC Monitoring project added successfully!');
    }

    console.log('');
    console.log('📁 Project Details:');
    console.log(`   📝 Title: ${campusProject.title}`);
    console.log(`   🔧 Technologies: ${campusProject.technologies.join(', ')}`);
    console.log(`   🔗 GitHub: ${campusProject.github}`);
    console.log(`   ⭐ Featured: ${campusProject.featured ? 'Yes' : 'No'}`);
    console.log('');
    console.log('🎉 Your project is now live!');
    console.log('👀 View at: http://localhost:3000/projects');
    console.log('⚙️  Manage at: http://localhost:3000/admin/projects');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addProject();