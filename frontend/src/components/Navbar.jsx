import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  return (
    <nav className="navbar">
      <ThemeToggle />
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="logo">
            Portfolio
          </Link>

          <button 
            className="mobile-toggle" 
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/skills" onClick={() => setIsOpen(false)}>Skills</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {token ? (
              <>
                <Link to="/admin" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/admin/login" className="btn-login" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
