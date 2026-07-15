import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 0', color: 'white' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Admin Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ color: '#333' }}>Projects</h3>
            <p style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>0</p>
            <button onClick={() => navigate('/admin/projects')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Manage Projects
            </button>
          </div>
          <div className="card">
            <h3 style={{ color: '#333' }}>Blog Posts</h3>
            <p style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>0</p>
            <button onClick={() => navigate('/admin/blogs')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Manage Blogs
            </button>
          </div>
          <div className="card">
            <h3 style={{ color: '#333' }}>Homepage Stats</h3>
            <p style={{ fontSize: '1.2rem', color: '#667eea', fontWeight: 'bold' }}>📊</p>
            <button onClick={() => navigate('/admin/stats')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Manage Stats
            </button>
          </div>
          <div className="card">
            <h3 style={{ color: '#333' }}>Analytics</h3>
            <p style={{ fontSize: '1.2rem', color: '#667eea', fontWeight: 'bold' }}>📈</p>
            <button onClick={() => navigate('/admin/analytics')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
