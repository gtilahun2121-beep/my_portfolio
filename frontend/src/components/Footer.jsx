import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-brand">Getanew Tilahun</h3>
            <p className="footer-description">
              Full Stack Developer passionate about building modern web applications 
              and solving real-world problems through code.
            </p>
            <div className="footer-social">
              <a href="https://github.com/gtilahun2121-beep" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/getanew-" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:gtilahun2121@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li>Web Development</li>
              <li>Full Stack Development</li>
              <li>Frontend Development</li>
              <li>Backend Development</li>
              <li>API Development</li>
              <li>Database Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Get In Touch</h4>
            <ul className="footer-contact">
              <li>
                <FaEnvelope className="contact-icon" />
                <a href="mailto:gtilahun2121@gmail.com">gtilahun2121@gmail.com</a>
              </li>
              <li>
                <FaGithub className="contact-icon" />
                <a href="https://github.com/gtilahun2121-beep" target="_blank" rel="noopener noreferrer">
                  github.com/gtilahun2121-beep
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            © {currentYear} Getanew Tilahun. Made with <FaHeart className="heart-icon" /> using React & Node.js
          </p>
          <p className="footer-note">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
