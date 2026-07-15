import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUsers, FaEnvelope, FaProjectDiagram, FaBlog, FaChartLine, FaEye, FaTrash, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

function AdminAnalytics() {
  const navigate = useNavigate()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchAnalytics()
  }, [navigate, timeRange])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Fetching analytics with token:', token ? 'Token exists' : 'No token')
      
      const response = await axios.get(
        `http://localhost:5000/api/analytics?days=${timeRange}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log('Analytics response:', response.data)
      setAnalytics(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Analytics error:', error)
      console.error('Error response:', error.response)
      
      if (error.response?.status === 401) {
        navigate('/admin/login')
        return
      }
      
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `http://localhost:5000/api/analytics/messages/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchAnalytics()
    } catch (error) {
      console.error('Mark as read error:', error)
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return
    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `http://localhost:5000/api/analytics/messages/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchAnalytics()
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Loading analytics...</div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>Failed to load analytics</div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Analytics Dashboard</h1>
        <div style={styles.headerButtons}>
          <button onClick={() => navigate('/admin')} style={styles.backButton}>
            ← Back to Dashboard
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* Time Range Filter */}
      <div style={styles.filterContainer}>
        <label style={styles.filterLabel}>Time Range:</label>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="365">Last Year</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div style={styles.overviewGrid}>
        <div style={{...styles.statCard, ...styles.cardBlue}}>
          <div style={styles.statIcon}><FaUsers /></div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{analytics.overview.totalVisitors}</div>
            <div style={styles.statLabel}>Total Visitors</div>
            <div style={styles.statSubtext}>
              {analytics.overview.visitorsInRange} in last {timeRange} days
            </div>
          </div>
        </div>

        <div style={{...styles.statCard, ...styles.cardGreen}}>
          <div style={styles.statIcon}><FaEnvelope /></div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{analytics.overview.totalMessages}</div>
            <div style={styles.statLabel}>Contact Messages</div>
            <div style={styles.statSubtext}>
              {analytics.overview.unreadMessages} unread
            </div>
          </div>
        </div>

        <div style={{...styles.statCard, ...styles.cardPurple}}>
          <div style={styles.statIcon}><FaProjectDiagram /></div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{analytics.overview.totalProjects}</div>
            <div style={styles.statLabel}>Total Projects</div>
          </div>
        </div>

        <div style={{...styles.statCard, ...styles.cardOrange}}>
          <div style={styles.statIcon}><FaBlog /></div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{analytics.overview.totalBlogs}</div>
            <div style={styles.statLabel}>Blog Posts</div>
          </div>
        </div>
      </div>

      {/* Visitors Chart */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}><FaChartLine /> Daily Visitors (Last 7 Days)</h2>
        <div style={styles.chartContainer}>
          {analytics.last7Days.map((day, index) => (
            <div key={index} style={styles.chartBar}>
              <div 
                style={{
                  ...styles.barFill,
                  height: `${Math.max((day.visitors / Math.max(...analytics.last7Days.map(d => d.visitors))) * 100, 5)}%`
                }}
              >
                <span style={styles.barValue}>{day.visitors}</span>
              </div>
              <div style={styles.barLabel}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={styles.twoColumnGrid}>
        {/* Top Pages */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}><FaEye /> Most Visited Pages</h2>
          <div style={styles.tableContainer}>
            {analytics.pageVisits.map((page, index) => (
              <div key={index} style={styles.tableRow}>
                <span style={styles.pageRank}>#{index + 1}</span>
                <span style={styles.pageName}>{page._id || 'Homepage'}</span>
                <span style={styles.pageCount}>{page.count} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Projects */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}><FaProjectDiagram /> Top Projects</h2>
          <div style={styles.tableContainer}>
            {analytics.topProjects.length > 0 ? (
              analytics.topProjects.map((project, index) => (
                <div key={index} style={styles.tableRow}>
                  <span style={styles.pageRank}>#{index + 1}</span>
                  <span style={styles.pageName}>{project.title}</span>
                  <span style={styles.pageCount}>{project.views || 0} views</span>
                </div>
              ))
            ) : (
              <p style={styles.emptyState}>No projects yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Contact Messages */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}><FaEnvelope /> Recent Contact Messages</h2>
        <div style={styles.messagesContainer}>
          {analytics.recentMessages.length > 0 ? (
            analytics.recentMessages.map((message) => (
              <div 
                key={message._id} 
                style={{
                  ...styles.messageCard,
                  ...(message.read ? {} : styles.messageUnread)
                }}
              >
                <div style={styles.messageHeader}>
                  <div>
                    <strong>{message.name}</strong>
                    <span style={styles.messageEmail}> ({message.email})</span>
                  </div>
                  <div style={styles.messageActions}>
                    {!message.read && (
                      <button
                        onClick={() => markAsRead(message._id)}
                        style={styles.actionButton}
                        title="Mark as read"
                      >
                        <FaCheckCircle />
                      </button>
                    )}
                    <button
                      onClick={() => deleteMessage(message._id)}
                      style={{...styles.actionButton, color: '#ef4444'}}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                {message.subject && (
                  <div style={styles.messageSubject}>{message.subject}</div>
                )}
                <div style={styles.messageText}>{message.message}</div>
                <div style={styles.messageDate}>
                  {new Date(message.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p style={styles.emptyState}>No messages yet</p>
          )}
        </div>
      </div>

      {/* Browser & Device Stats */}
      <div style={styles.twoColumnGrid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🌐 Browsers</h2>
          <div style={styles.statsContainer}>
            {analytics.browserStats.map((stat, index) => (
              <div key={index} style={styles.statItem}>
                <span style={styles.statItemName}>{stat._id || 'Unknown'}</span>
                <span style={styles.statItemValue}>{stat.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📱 Devices</h2>
          <div style={styles.statsContainer}>
            {analytics.deviceStats.map((stat, index) => (
              <div key={index} style={styles.statItem}>
                <span style={styles.statItemName}>{stat._id || 'Unknown'}</span>
                <span style={styles.statItemValue}>{stat.count}</span>
              </div>
            ))}
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
  filterContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  filterLabel: {
    fontWeight: '600',
    color: '#1a202c'
  },
  filterSelect: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '2px solid #e2e8f0',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  cardBlue: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  },
  cardGreen: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white'
  },
  cardPurple: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: 'white'
  },
  cardOrange: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    color: 'white'
  },
  statIcon: {
    fontSize: '2.5rem',
    opacity: 0.9
  },
  statContent: {
    flex: 1
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.25rem'
  },
  statLabel: {
    fontSize: '0.9rem',
    opacity: 0.9,
    marginBottom: '0.25rem'
  },
  statSubtext: {
    fontSize: '0.85rem',
    opacity: 0.8
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#1a202c',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '200px',
    gap: '1rem',
    padding: '1rem 0'
  },
  chartBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%'
  },
  barFill: {
    width: '100%',
    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '0.5rem',
    transition: 'height 0.3s ease',
    marginTop: 'auto'
  },
  barValue: {
    color: 'white',
    fontWeight: '600',
    fontSize: '0.9rem'
  },
  barLabel: {
    marginTop: '0.5rem',
    fontSize: '0.85rem',
    color: '#718096',
    fontWeight: '600'
  },
  twoColumnGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f7fafc',
    borderRadius: '8px',
    transition: 'background 0.2s'
  },
  pageRank: {
    fontWeight: '700',
    color: '#667eea',
    fontSize: '1.1rem',
    minWidth: '30px'
  },
  pageName: {
    flex: 1,
    color: '#1a202c',
    fontWeight: '500'
  },
  pageCount: {
    color: '#718096',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  messageCard: {
    padding: '1.5rem',
    background: '#f7fafc',
    borderRadius: '12px',
    borderLeft: '4px solid transparent'
  },
  messageUnread: {
    background: '#eff6ff',
    borderLeftColor: '#3b82f6'
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  messageEmail: {
    color: '#718096',
    fontSize: '0.9rem'
  },
  messageActions: {
    display: 'flex',
    gap: '0.5rem'
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#10b981',
    padding: '0.25rem',
    transition: 'transform 0.2s'
  },
  messageSubject: {
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '0.5rem'
  },
  messageText: {
    color: '#4a5568',
    lineHeight: '1.6',
    marginBottom: '0.5rem'
  },
  messageDate: {
    fontSize: '0.85rem',
    color: '#718096'
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem',
    background: '#f7fafc',
    borderRadius: '8px'
  },
  statItemName: {
    color: '#1a202c',
    fontWeight: '500'
  },
  statItemValue: {
    color: '#667eea',
    fontWeight: '700'
  },
  loading: {
    color: 'white',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '4rem'
  },
  error: {
    color: 'white',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '4rem'
  },
  emptyState: {
    textAlign: 'center',
    color: '#718096',
    padding: '2rem',
    fontStyle: 'italic'
  }
}

export default AdminAnalytics
