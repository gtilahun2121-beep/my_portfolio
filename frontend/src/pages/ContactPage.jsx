import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import { contactAPI } from '../services/api'
import './ContactPage.css'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await contactAPI.submit(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Failed to send message. Please try again or email me directly.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'gtilahun2121@gmail.com',
      link: 'mailto:gtilahun2121@gmail.com'
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/getanew-',
      link: 'https://www.linkedin.com/in/getanew-'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      value: 'github.com/gtilahun2121-beep',
      link: 'https://github.com/gtilahun2121-beep'
    }
  ]

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="contact-content">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-form-container"
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="success-message"
                >
                  <FaCheckCircle /> Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="error-message"
                >
                  {error}
                </motion.div>
              )}
              
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Your Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
                  placeholder="Tell me about your project or just say hi..."
                  required
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span> Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-info"
          >
            <h2>Let's Connect</h2>
            <p className="contact-description">
              I'm always open to discussing new projects, creative ideas, 
              or opportunities to be part of your vision.
            </p>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="contact-card"
                >
                  <div className="contact-icon">{info.icon}</div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    <p>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="availability">
              <div className="status-indicator"></div>
              <span>Available for freelance work</span>
            </div>

            <div className="cta-buttons">
              <a 
                href="https://calendly.com/gtilahun2121/30min" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                📅 Schedule a Call
              </a>
              <a 
                href="/resume.pdf" 
                download="Getanew_Tilahun_Resume.pdf"
                className="btn btn-outline"
              >
                📄 Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
