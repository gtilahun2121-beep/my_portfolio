import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaProjectDiagram, FaPlus, FaEdit, FaTrash, FaUpload, FaEye, FaStar, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import api from '../../services/api'

function AdminProjects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDesc: '',
    image: '',
    screenshots: '',
    github: '',
    liveDemo: '',
    technologies: '',
    category: '',
    featured: false,
    order: 0,
    problem: '',
    solution: '',
    architecture: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchProjects()
  }, [navigate])

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects')
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const techArray = formData.technologies ? formData.technologies.split(',').map(t => t.trim()) : []
      const screenshotsArray = formData.screenshots ? formData.screenshots.split(',').map(s => s.trim()) : []
      
      const projectData = {
        ...formData,
        technologies: techArray,
        screenshots: screenshotsArray
      }

      if (editingId) {
await api.put(
        `/projects/${editingId}`,
        projectData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } else {
      await api.post(
        '/projects',
          projectData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      setShowForm(false)
      setEditingId(null)
      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies ? project.technologies.join(', ') : '',
      screenshots: project.screenshots ? project.screenshots.join(', ') : ''
    })
    setEditingId(project._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return

    try {
      const token = localStorage.getItem('token')
      await api.delete(
        `/projects/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDesc: '',
      image: '',
      screenshots: '',
      github: '',
      liveDemo: '',
      technologies: '',
      category: '',
      featured: false,
      order: 0,
      problem: '',
      solution: '',
      architecture: ''
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('image', file)

      const token = localStorage.getItem('token')
      const response = await api.post(
        '/upload',
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setFormData({ ...formData, image: response.data.url })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/admin/login')
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <FaProjectDiagram /> Manage Projects
        </h1>
        <div style={styles.headerButtons}>
          <button onClick={() => navigate('/admin')} style={styles.backButton}>
            ← Back to Dashboard
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {/* Add Button */}
      <div style={styles.actions}>
        <button
          onClick={() => {
            resetForm()
            setEditingId(null)
            setShowForm(true)
          }}
          style={styles.addButton}
        >
          <FaPlus /> Add New Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Basic Info */}
              <div style={styles.twoColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={styles.input}
                    placeholder="e.g., E-commerce Website"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={styles.input}
                  >
                    <option value="">Select Category</option>
                    <option value="Web App">Web Application</option>
                    <option value="Mobile App">Mobile Application</option>
                    <option value="Website">Website</option>
                    <option value="API">API/Backend</option>
                    <option value="Desktop">Desktop Application</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Short Description *</label>
                <input
                  type="text"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  style={styles.input}
                  placeholder="Brief one-line description for project cards"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Full Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...styles.input, height: '120px', resize: 'vertical' }}
                  placeholder="Detailed project description, features, and what it does..."
                  required
                />
              </div>

              {/* GitHub & Links */}
              <div style={styles.twoColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>GitHub Repository *</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    style={styles.input}
                    placeholder="https://github.com/gtilahun2121-beep/project-name"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.liveDemo}
                    onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                    style={styles.input}
                    placeholder="https://your-project-demo.com"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Technologies Used (comma-separated) *</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., React, Node.js, MongoDB, Express"
                  required
                />
              </div>

              {/* Project Images */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Main Project Image</label>
                <div style={styles.imageUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={styles.fileInput}
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" style={styles.uploadButton}>
                    <FaUpload /> {uploading ? 'Uploading...' : 'Choose Image'}
                  </label>
                  {formData.image && (
                    <div style={styles.imagePreview}>
                      <img src={formData.image} alt="Preview" style={styles.previewImg} />
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Additional Screenshots (comma-separated URLs)</label>
                <input
                  type="text"
                  value={formData.screenshots}
                  onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
                  style={styles.input}
                  placeholder="https://image1.com, https://image2.com"
                />
              </div>

              {/* Project Details */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Problem Solved</label>
                <textarea
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  style={{ ...styles.input, height: '80px' }}
                  placeholder="What problem does this project solve?"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Solution Approach</label>
                <textarea
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  style={{ ...styles.input, height: '80px' }}
                  placeholder="How did you solve it? What was your approach?"
                />
              </div>

              <div style={styles.twoColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      style={styles.checkbox}
                    />
                    Featured Project
                  </label>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    style={styles.input}
                    placeholder="0"
                  />
                </div>
              </div>

              <div style={styles.formButtons}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'} Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div style={styles.projectsList}>
        {projects.length === 0 ? (
          <div style={styles.emptyState}>
            <FaProjectDiagram style={styles.emptyIcon} />
            <h3>No Projects Yet</h3>
            <p>Add your first project from GitHub to get started!</p>
          </div>
        ) : (
          <div style={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project._id} style={styles.projectCard}>
                {project.featured && (
                  <div style={styles.featuredBadge}>
                    <FaStar /> Featured
                  </div>
                )}
                
                {project.image && (
                  <div style={styles.projectImageContainer}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      style={styles.projectImage}
                    />
                  </div>
                )}
                
                <div style={styles.projectInfo}>
                  <h3 style={styles.projectTitle}>{project.title}</h3>
                  {project.category && (
                    <span style={styles.projectCategory}>{project.category}</span>
                  )}
                  <p style={styles.projectDescription}>{project.shortDesc}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div style={styles.techContainer}>
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} style={styles.techTag}>{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span style={styles.techTag}>+{project.technologies.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                <div style={styles.projectActions}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.actionLink}
                      title="View on GitHub"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.actionLink}
                      title="Live Demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(project)}
                    style={styles.actionButton}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    style={{ ...styles.actionButton, color: '#ef4444' }}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
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
  actions: {
    marginBottom: '2rem'
  },
  addButton: {
    padding: '1rem 2rem',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modalContent: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalTitle: {
    marginBottom: '2rem',
    color: '#1a202c'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: '600',
    color: '#1a202c'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600',
    color: '#1a202c'
  },
  checkbox: {
    width: '18px',
    height: '18px'
  },
  imageUpload: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  fileInput: {
    display: 'none'
  },
  uploadButton: {
    padding: '0.75rem 1.5rem',
    background: '#667eea',
    color: 'white',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    border: 'none',
    fontSize: '1rem'
  },
  imagePreview: {
    maxWidth: '200px'
  },
  previewImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '2px solid #e2e8f0'
  },
  formButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    background: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    background: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600'
  },
  projectsList: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '2rem'
  },
  emptyState: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '4rem 2rem'
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
    color: '#d1d5db'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem'
  },
  projectCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  featuredBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: '#f59e0b',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  projectImageContainer: {
    marginBottom: '1rem'
  },
  projectImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #e2e8f0'
  },
  projectInfo: {
    marginBottom: '1rem'
  },
  projectTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.5rem'
  },
  projectCategory: {
    background: '#eff6ff',
    color: '#3b82f6',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    display: 'inline-block'
  },
  projectDescription: {
    color: '#4b5563',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    lineHeight: '1.5'
  },
  techContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  techTag: {
    background: '#f3f4f6',
    color: '#374151',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  projectActions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end'
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#667eea',
    padding: '0.5rem',
    borderRadius: '6px',
    transition: 'background 0.2s'
  },
  actionLink: {
    color: '#667eea',
    fontSize: '1.2rem',
    padding: '0.5rem',
    borderRadius: '6px',
    transition: 'background 0.2s',
    textDecoration: 'none'
  }
}

export default AdminProjects
