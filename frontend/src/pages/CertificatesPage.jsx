import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt, FaStar, FaCalendar, FaUser } from 'react-icons/fa'
import api from '../services/api'
import './CertificatesPage.css'

function CertificatesPage() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates')
      setCertificates(response.data)
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', ...new Set(certificates.map(cert => cert.category).filter(Boolean))]
  
  const filteredCertificates = selectedCategory === 'All' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory)

  const featuredCertificates = certificates.filter(cert => cert.featured)

  if (loading) {
    return (
      <div className="certificates-page">
        <div className="container">
          <div className="loading-state">
            <FaCertificate className="loading-icon" />
            <p>Loading certificates...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="certificates-page">
      <div className="container">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="certificates-hero"
        >
          <h1 className="page-title">
            <FaCertificate className="title-icon" />
            My Certifications
          </h1>
          <p className="page-subtitle">
            Professional certifications and achievements that demonstrate my expertise 
            in various technologies and domains.
          </p>
        </motion.section>

        {/* Featured Certificates */}
        {featuredCertificates.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="featured-section"
          >
            <h2 className="section-title">
              <FaStar className="section-icon" />
              Featured Certifications
            </h2>
            <div className="featured-grid">
              {featuredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.1 }}
                  className="featured-card"
                >
                  <div className="featured-badge">
                    <FaStar /> Featured
                  </div>
                  
                  {certificate.image && (
                    <div className="certificate-image-container">
                      <img 
                        src={certificate.image} 
                        alt={certificate.title}
                        className="certificate-image"
                      />
                    </div>
                  )}
                  
                  <div className="certificate-content">
                    <h3 className="certificate-title">{certificate.title}</h3>
                    <p className="certificate-issuer">
                      <FaUser className="issuer-icon" />
                      {certificate.issuer}
                    </p>
                    {certificate.year && (
                      <p className="certificate-year">
                        <FaCalendar className="year-icon" />
                        {certificate.year}
                      </p>
                    )}
                    {certificate.description && (
                      <p className="certificate-description">{certificate.description}</p>
                    )}
                    {certificate.skills && certificate.skills.length > 0 && (
                      <div className="skills-container">
                        <h4>Skills:</h4>
                        <div className="skills-list">
                          {certificate.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {certificate.url && (
                      <a 
                        href={certificate.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="verify-button"
                      >
                        <FaExternalLinkAlt /> Verify Certificate
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="filter-section"
          >
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Certificates Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="certificates-section"
        >
          <h2 className="section-title">
            All Certifications
            <span className="certificates-count">({filteredCertificates.length})</span>
          </h2>
          
          {filteredCertificates.length === 0 ? (
            <div className="empty-state">
              <FaCertificate className="empty-icon" />
              <h3>No certificates found</h3>
              <p>No certificates match the selected category.</p>
            </div>
          ) : (
            <div className="certificates-grid">
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                  className="certificate-card"
                >
                  {certificate.image && (
                    <div className="certificate-image-container">
                      <img 
                        src={certificate.image} 
                        alt={certificate.title}
                        className="certificate-image"
                      />
                    </div>
                  )}
                  
                  <div className="certificate-content">
                    <div className="certificate-header">
                      <h3 className="certificate-title">{certificate.title}</h3>
                      {certificate.category && (
                        <span className="category-tag">{certificate.category}</span>
                      )}
                    </div>
                    
                    <p className="certificate-issuer">
                      <FaUser className="issuer-icon" />
                      {certificate.issuer}
                    </p>
                    
                    {certificate.year && (
                      <p className="certificate-year">
                        <FaCalendar className="year-icon" />
                        {certificate.year}
                      </p>
                    )}
                    
                    {certificate.description && (
                      <p className="certificate-description">{certificate.description}</p>
                    )}
                    
                    {certificate.credentialId && (
                      <p className="credential-id">
                        <strong>ID:</strong> {certificate.credentialId}
                      </p>
                    )}
                    
                    {certificate.skills && certificate.skills.length > 0 && (
                      <div className="skills-container">
                        <div className="skills-list">
                          {certificate.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                          ))}
                          {certificate.skills.length > 3 && (
                            <span className="skill-tag more">+{certificate.skills.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="certificate-footer">
                      {certificate.url && (
                        <a 
                          href={certificate.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="verify-link"
                        >
                          <FaExternalLinkAlt /> Verify
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="cta-section"
        >
          <h2>Interested in Working Together?</h2>
          <p>
            These certifications represent my commitment to continuous learning and professional growth. 
            Let's discuss how my expertise can help bring your project to life.
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Get In Touch</a>
            <a href="/projects" className="btn btn-secondary">View My Work</a>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default CertificatesPage