import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import Testimonials from '../components/Testimonials'
import './HomePage.css'

function HomePage() {
  // Load stats from localStorage or use defaults
  const getStats = () => {
    const savedStats = localStorage.getItem('portfolioStats')
    if (savedStats) {
      const parsed = JSON.parse(savedStats)
      return [
        { label: 'Projects', value: parsed.projects },
        { label: 'Clients', value: parsed.clients },
        { label: 'Experience', value: parsed.experience },
        { label: 'Technologies', value: parsed.technologies }
      ]
    }
    // Default stats
    return [
      { label: 'Projects', value: '10+' },
      { label: 'Clients', value: '5+' },
      { label: 'Experience', value: '2 Years' },
      { label: 'Technologies', value: '10+' }
    ]
  }

  const stats = getStats()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            {/* Profile Photo */}
            <div className="profile-photo">
              <img 
                src="/profile.jpg" 
                alt="Getanew Tilahun" 
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '5px solid rgba(255, 255, 255, 0.3)',
                  marginBottom: '2rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
              />
            </div>
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Getanew Tilahun</span>
            </h1>
            <h2 className="hero-subtitle">Full Stack Developer</h2>
            <p className="hero-description">
              Building modern web applications with React, Node.js, and MongoDB.
              Passionate about clean code and exceptional user experiences.
            </p>
            <div className="hero-buttons">
              <Link to="/projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get In Touch
              </Link>
            </div>
            <div className="social-links">
              <a href="https://github.com/gtilahun2121-beep" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/getanew-" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:gtilahun2121@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack">
        <div className="container">
          <h2 className="section-title">Tech Stack</h2>
          <div className="tech-grid">
            {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'CSS3'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="tech-card"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="cta-content"
          >
            <h2>Let's Build Something Amazing Together</h2>
            <p>I'm always open to discussing new projects and creative ideas.</p>
            <Link to="/contact" className="btn btn-primary">
              Start a Conversation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
