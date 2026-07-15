import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminStats() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    projects: '10+',
    clients: '5+',
    experience: '2 Years',
    technologies: '10+'
  })
  const [socialLinks, setSocialLinks] = useState({
    github: 'https://github.com/gtilahun2121-beep',
    linkedin: 'https://www.linkedin.com/in/getanew-',
    email: 'gtilahun2121@gmail.com'
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }

    // Load stats from localStorage
    const savedStats = localStorage.getItem('portfolioStats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }

    // Load social links from localStorage
    const savedSocialLinks = localStorage.getItem('portfolioSocialLinks')
    if (savedSocialLinks) {
      setSocialLinks(JSON.parse(savedSocialLinks))
    }
  }, [navigate])

  const handleChange = (field, value) => {
    setStats(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('portfolioStats', JSON.stringify(stats))
    setMessage('✅ Stats saved successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Homepage Stats</h1>
        <div style={styles.headerButtons}>
          <button onClick={() => navigate('/admin')} style={styles.backButton}>
            ← Back to Dashboard
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Edit Your Stats</h2>
        <p style={styles.description}>
          These numbers will appear on your homepage. You can change them anytime.
        </p>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Projects</label>
            <input
              type="text"
              value={stats.projects}
              onChange={(e) => handleChange('projects', e.target.value)}
              style={styles.input}
              placeholder="e.g., 10+ or 15"
            />
            <small style={styles.hint}>Example: 10+, 25, 50+</small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Clients</label>
            <input
              type="text"
              value={stats.clients}
              onChange={(e) => handleChange('clients', e.target.value)}
              style={styles.input}
              placeholder="e.g., 5+ or 8"
            />
            <small style={styles.hint}>Example: 5+, 10, 20+</small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Experience</label>
            <input
              type="text"
              value={stats.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              style={styles.input}
              placeholder="e.g., 2 Years or 3+ Years"
            />
            <small style={styles.hint}>Example: 2 Years, 3+ Years, 5 Years</small>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Technologies</label>
            <input
              type="text"
              value={stats.technologies}
              onChange={(e) => handleChange('technologies', e.target.value)}
              style={styles.input}
              placeholder="e.g., 10+ or 15"
            />
            <small style={styles.hint}>Example: 10+, 20, 30+</small>
          </div>

          <button onClick={handleSave} style={styles.saveButton}>
            💾 Save Stats
          </button>
        </div>
      </div>

      <div style={styles.previewCard}>
        <h3 style={styles.previewTitle}>Preview</h3>
        <div style={styles.previewGrid}>
          <div style={styles.previewStat}>
            <div style={styles.previewValue}>{stats.projects}</div>
            <div style={styles.previewLabel}>Projects</div>
          </div>
          <div style={styles.previewStat}>
            <div style={styles.previewValue}>{stats.clients}</div>
            <div style={styles.previewLabel}>Clients</div>
          </div>
          <div style={styles.previewStat}>
            <div style={styles.previewValue}>{stats.experience}</div>
            <div style={styles.previewLabel}>Experience</div>
          </div>
          <div style={styles.previewStat}>
            <div style={styles.previewValue}>{stats.technologies}</div>
            <div style={styles.previewLabel}>Technologies</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    color: 'white',
    fontSize: '2rem',
    margin: 0
  },
  headerButtons: {
    display: 'flex',
    gap: '1rem'
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  logoutButton: {
    padding: '0.75rem 1.5rem',
    background: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  message: {
    background: '#10b981',
    color: 'white',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    color: '#1a202c'
  },
  description: {
    color: '#718096',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1a202c'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  hint: {
    color: '#718096',
    fontSize: '0.85rem'
  },
  saveButton: {
    padding: '1rem',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '1rem'
  },
  previewCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  },
  previewTitle: {
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    color: '#1a202c',
    textAlign: 'center'
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1.5rem'
  },
  previewStat: {
    textAlign: 'center',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white'
  },
  previewValue: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem'
  },
  previewLabel: {
    fontSize: '1rem',
    opacity: 0.9
  }
}

export default AdminStats
