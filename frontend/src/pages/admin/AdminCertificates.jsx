import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCertificate, FaPlus, FaEdit, FaTrash, FaUpload, FaEye, FaStar } from 'react-icons/fa'
import axios from 'axios'

function AdminCertificates() {
  const navigate = useNavigate()
  const [certificates, setCertificates] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    category: '',
    year: '',
    description: '',
    skills: '',
    credentialId: '',
    url: '',
    image: '',
    pdfFile: '',
    fileType: 'image',
    featured: false,
    order: 0
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
      return
    }
    fetchCertificates()
  }, [navigate])

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/certificates')
      setCertificates(response.data)
    } catch (error) {
      console.error('Error fetching certificates:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const skillsArray = formData.skills ? formData.skills.split(',').map(s => s.trim()) : []
      
      const certificateData = {
        ...formData,
        skills: skillsArray
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/certificates/${editingId}`,
          certificateData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          'http://localhost:5000/api/certificates',
          certificateData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }

      setShowForm(false)
      setEditingId(null)
      resetForm()
      fetchCertificates()
    } catch (error) {
      console.error('Error saving certificate:', error)
      alert('Error saving certificate')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (certificate) => {
    setFormData({
      ...certificate,
      skills: certificate.skills ? certificate.skills.join(', ') : ''
    })
    setEditingId(certificate._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(
        `http://localhost:5000/api/certificates/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchCertificates()
    } catch (error) {
      console.error('Error deleting certificate:', error)
      alert('Error deleting certificate')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      category: '',
      year: '',
      description: '',
      skills: '',
      credentialId: '',
      url: '',
      image: '',
      pdfFile: '',
      fileType: 'image',
      featured: false,
      order: 0
    })
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Check file type
    const isImage = file.type.startsWith('image/')
    const isPDF = file.type === 'application/pdf'
    
    if (!isImage && !isPDF) {
      alert('Please select an image or PDF file')
      return
    }

    setUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append(isImage ? 'image' : 'file', file)

      const token = localStorage.getItem('token')
      const response = await axios.post(
        'http://localhost:5000/api/upload',
        formDataUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (isImage) {
        setFormData({ 
          ...formData, 
          image: response.data.url, 
          fileType: 'image',
          pdfFile: '' // Clear PDF if image is uploaded
        })
      } else {
        setFormData({ 
          ...formData, 
          pdfFile: response.data.url, 
          fileType: 'pdf',
          image: '' // Clear image if PDF is uploaded
        })
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file')
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
          <FaCertificate /> Manage Certificates
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
          <FaPlus /> Add New Certificate
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>
              {editingId ? 'Edit Certificate' : 'Add New Certificate'}
            </h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.twoColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Certificate Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={styles.input}
                    placeholder="e.g., Artificial Intelligence Fundamentals"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Issuer *</label>
                  <input
                    type="text"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    style={styles.input}
                    placeholder="e.g., Cisco, Coursera, Google"
                    required
                  />
                </div>
              </div>

              <div style={styles.twoColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={styles.input}
                  >
                    <option value="">Select Category</option>
                    <option value="Programming">Programming</option>
                    <option value="AI/ML">AI/Machine Learning</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Networking">Networking</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Security">Security</option>
                    <option value="Design">Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    style={styles.input}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                  placeholder="Brief description of what you learned or achieved..."
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Skills Gained (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  style={styles.input}
                  placeholder="e.g., Machine Learning, Python, TensorFlow"
                />
              </div>

              <div style={styles.twoColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Credential ID</label>
                  <input
                    type="text"
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    style={styles.input}
                    placeholder="Certificate ID or number"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Verification URL</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    style={styles.input}
                    placeholder="https://verify.certificate.com/..."
                  />
                </div>
              </div>

              {/* File Upload */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Certificate File</label>
                
                {/* File Type Selection */}
                <div style={styles.fileTypeSelection}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="image"
                      checked={formData.fileType === 'image'}
                      onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                      style={styles.radio}
                    />
                    📷 Image (JPG, PNG)
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      value="pdf"
                      checked={formData.fileType === 'pdf'}
                      onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}
                      style={styles.radio}
                    />
                    📄 PDF Document
                  </label>
                </div>

                <div style={styles.imageUpload}>
                  <input
                    type="file"
                    accept={formData.fileType === 'image' ? 'image/*' : '.pdf'}
                    onChange={handleFileUpload}
                    style={styles.fileInput}
                    id="fileUpload"
                  />
                  <label htmlFor="fileUpload" style={styles.uploadButton}>
                    <FaUpload /> {uploading ? 'Uploading...' : `Choose ${formData.fileType === 'image' ? 'Image' : 'PDF'}`}
                  </label>
                  
                  {/* Preview */}
                  {formData.image && formData.fileType === 'image' && (
                    <div style={styles.imagePreview}>
                      <img src={formData.image} alt="Preview" style={styles.previewImg} />
                    </div>
                  )}
                  
                  {formData.pdfFile && formData.fileType === 'pdf' && (
                    <div style={styles.pdfPreview}>
                      <div style={styles.pdfIcon}>📄</div>
                      <span>PDF uploaded successfully</span>
                      <a 
                        href={formData.pdfFile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={styles.viewPdfLink}
                      >
                        View PDF
                      </a>
                    </div>
                  )}
                </div>
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
                    Featured Certificate
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
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'} Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificates List */}
      <div style={styles.certificatesList}>
        {certificates.length === 0 ? (
          <div style={styles.emptyState}>
            <FaCertificate style={styles.emptyIcon} />
            <h3>No Certificates Yet</h3>
            <p>Add your first certificate to get started!</p>
          </div>
        ) : (
          <div style={styles.certificatesGrid}>
            {certificates.map((certificate) => (
              <div key={certificate._id} style={styles.certificateCard}>
                {certificate.featured && (
                  <div style={styles.featuredBadge}>
                    <FaStar /> Featured
                  </div>
                )}
                
                {certificate.image && certificate.fileType === 'image' && (
                  <div style={styles.certificateImageContainer}>
                    <img 
                      src={certificate.image} 
                      alt={certificate.title}
                      style={styles.certificateImage}
                    />
                  </div>
                )}
                
                {certificate.pdfFile && certificate.fileType === 'pdf' && (
                  <div style={styles.certificatePdfContainer}>
                    <div style={styles.pdfIcon}>📄</div>
                    <p style={styles.pdfLabel}>PDF Certificate</p>
                    <a 
                      href={certificate.pdfFile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.viewPdfButton}
                    >
                      <FaEye /> View PDF
                    </a>
                  </div>
                )}
                
                <div style={styles.certificateInfo}>
                  <h3 style={styles.certificateTitle}>{certificate.title}</h3>
                  <p style={styles.certificateIssuer}>{certificate.issuer}</p>
                  {certificate.category && (
                    <span style={styles.certificateCategory}>{certificate.category}</span>
                  )}
                  {certificate.year && (
                    <span style={styles.certificateYear}>{certificate.year}</span>
                  )}
                  {certificate.description && (
                    <p style={styles.certificateDescription}>{certificate.description}</p>
                  )}
                  {certificate.skills && certificate.skills.length > 0 && (
                    <div style={styles.skillsContainer}>
                      {certificate.skills.map((skill, index) => (
                        <span key={index} style={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={styles.certificateActions}>
                  {certificate.url && (
                    <button
                      onClick={() => window.open(certificate.url, '_blank')}
                      style={styles.actionButton}
                      title="View Certificate"
                    >
                      <FaEye />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(certificate)}
                    style={styles.actionButton}
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(certificate._id)}
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
    maxWidth: '600px',
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
  certificatesList: {
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
  certificatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem'
  },
  certificateCard: {
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
  certificateImageContainer: {
    marginBottom: '1rem'
  },
  certificateImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #e2e8f0'
  },
  certificateInfo: {
    marginBottom: '1rem'
  },
  certificateTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.5rem'
  },
  certificateIssuer: {
    color: '#667eea',
    fontWeight: '600',
    marginBottom: '0.75rem'
  },
  certificateCategory: {
    background: '#eff6ff',
    color: '#3b82f6',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginRight: '0.5rem'
  },
  certificateYear: {
    background: '#f0fdf4',
    color: '#16a34a',
    padding: '0.25rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  certificateDescription: {
    color: '#4b5563',
    fontSize: '0.9rem',
    marginTop: '0.75rem',
    lineHeight: '1.5'
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.75rem'
  },
  skillTag: {
    background: '#f3f4f6',
    color: '#374151',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: '500'
  },
  certificateActions: {
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
  fileTypeSelection: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    transition: 'border-color 0.3s'
  },
  radio: {
    width: '16px',
    height: '16px'
  },
  pdfPreview: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f0fdf4',
    border: '2px solid #16a34a',
    borderRadius: '8px'
  },
  pdfIcon: {
    fontSize: '2rem'
  },
  viewPdfLink: {
    color: '#16a34a',
    textDecoration: 'none',
    fontWeight: '600'
  },
  certificatePdfContainer: {
    background: '#f8fafc',
    border: '2px dashed #cbd5e1',
    borderRadius: '12px',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  pdfLabel: {
    color: '#64748b',
    margin: '0.5rem 0',
    fontWeight: '600'
  },
  viewPdfButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: '#16a34a',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'background 0.2s'
  }
}

export default AdminCertificates