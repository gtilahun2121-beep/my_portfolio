import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { projectsAPI } from '../services/api'

function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await projectsAPI.getOne(id)
      setProject(response.data)
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading project...</div>
  }

  if (!project) {
    return <div className="loading">Project not found</div>
  }

  return (
    <div className="project-detail" style={{ color: 'white', padding: '4rem 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{project.title}</h1>
        <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }} />
        <p style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>{project.description}</p>
        {project.technologies && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Technologies:</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {project.technologies.map(tech => (
                <span key={tech} style={{ background: '#667eea', padding: '0.5rem 1rem', borderRadius: '6px' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
