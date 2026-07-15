const mongoose = require('mongoose');
const Certificate = require('../models/Certificate');
require('dotenv').config();

const sampleCertificates = [
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'Online Course Platform',
    category: 'AI/ML',
    year: '2024',
    description: 'Comprehensive course covering machine learning algorithms, neural networks, and practical AI applications.',
    skills: ['Machine Learning', 'Neural Networks', 'Python', 'TensorFlow'],
    featured: true,
    order: 1,
    image: 'https://via.placeholder.com/400x300/4f46e5/white?text=AI+Certificate'
  },
  {
    title: 'Data Analysis Fundamentals', 
    issuer: 'Data Science Institute',
    category: 'Data Science',
    year: '2024',
    description: 'Learned statistical analysis, data visualization, and interpretation of complex datasets.',
    skills: ['Data Analysis', 'Statistics', 'Excel', 'Tableau'],
    featured: false,
    order: 2,
    image: 'https://via.placeholder.com/400x300/10b981/white?text=Data+Analysis'
  },
  {
    title: 'Android Developer Fundamentals',
    issuer: 'Google Developer',
    category: 'Mobile Development', 
    year: '2024',
    description: 'Complete Android development course covering Java, Kotlin, UI design, and app deployment.',
    skills: ['Android', 'Java', 'Kotlin', 'Mobile UI'],
    featured: false,
    order: 3,
    image: 'https://via.placeholder.com/400x300/f59e0b/white?text=Android+Dev'
  },
  {
    title: 'CCNA Certification',
    issuer: 'Cisco',
    category: 'Networking',
    year: '2023',
    description: 'Cisco Certified Network Associate certification demonstrating networking fundamentals and Cisco technologies.',
    skills: ['Networking', 'Routing', 'Switching', 'Network Security'],
    credentialId: 'CSCO12345678',
    featured: true,
    order: 0,
    image: 'https://via.placeholder.com/400x300/ef4444/white?text=CCNA+Cisco'
  }
];

async function addSampleCertificates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing certificates
    await Certificate.deleteMany({});
    console.log('🗑️  Cleared existing certificates');

    // Add sample certificates
    const certificates = await Certificate.insertMany(sampleCertificates);
    console.log(`✅ Added ${certificates.length} sample certificates:`);
    
    certificates.forEach(cert => {
      console.log(`   📜 ${cert.title} (${cert.issuer})`);
    });

    console.log('');
    console.log('🎉 Sample certificates added successfully!');
    console.log('Visit: http://localhost:3000/certificates to view them');
    console.log('Admin: http://localhost:3000/admin/certificates to manage them');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addSampleCertificates();