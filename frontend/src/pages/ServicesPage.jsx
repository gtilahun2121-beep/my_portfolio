import { motion } from 'framer-motion'
import { FaCode, FaServer, FaDatabase, FaMobile, FaPaintBrush, FaRocket } from 'react-icons/fa'
import './ServicesPage.css'

function ServicesPage() {
  const services = [
    {
      icon: <FaCode />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces using React, HTML5, CSS3, and JavaScript.',
      features: [
        'Responsive web design',
        'Single Page Applications (SPA)',
        'React component development',
        'Modern UI/UX implementation'
      ],
      color: '#667eea'
    },
    {
      icon: <FaServer />,
      title: 'Backend Development',
      description: 'Creating robust and scalable server-side applications with Node.js and Express.',
      features: [
        'RESTful API development',
        'Server-side logic',
        'Authentication & authorization',
        'Third-party API integration'
      ],
      color: '#764ba2'
    },
    {
      icon: <FaDatabase />,
      title: 'Database Design',
      description: 'Designing and implementing efficient database solutions with MongoDB and MySQL.',
      features: [
        'Database schema design',
        'Query optimization',
        'Data modeling',
        'Database migration'
      ],
      color: '#10b981'
    },
    {
      icon: <FaMobile />,
      title: 'Full Stack Development',
      description: 'End-to-end web application development from concept to deployment.',
      features: [
        'Complete MERN stack projects',
        'Full project lifecycle',
        'Testing & debugging',
        'Performance optimization'
      ],
      color: '#f59e0b'
    },
    {
      icon: <FaPaintBrush />,
      title: 'UI/UX Design',
      description: 'Creating beautiful and intuitive user experiences that engage your audience.',
      features: [
        'User interface design',
        'Wireframing & prototyping',
        'User experience optimization',
        'Design system creation'
      ],
      color: '#ef4444'
    },
    {
      icon: <FaRocket />,
      title: 'Website Deployment',
      description: 'Deploying and maintaining web applications on modern cloud platforms.',
      features: [
        'Cloud deployment',
        'Domain & hosting setup',
        'Performance monitoring',
        'Continuous maintenance'
      ],
      color: '#3b82f6'
    }
  ]

  return (
    <div className="services-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="services-title">Services I Offer</h1>
          <p className="services-subtitle">
            Professional web development services to bring your ideas to life
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="service-card"
              >
                <div 
                  className="service-icon" 
                  style={{ background: service.color }}
                >
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>
                      <span className="feature-bullet" style={{ background: service.color }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="services-cta"
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Let's discuss how I can help bring your vision to life</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Get Started</a>
              <a href="/projects" className="btn btn-secondary">View Portfolio</a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServicesPage
