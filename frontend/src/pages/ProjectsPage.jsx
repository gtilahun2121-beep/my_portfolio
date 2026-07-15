import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projectsAPI } from '../services/api'
import './ProjectsPage.css'

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll()
      if (response.data && response.data.length > 0) {
        setProjects(response.data)
      } else {
        // Show demo projects if none exist in database
        setProjects(getDemoProjects())
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Show demo projects on error
      setProjects(getDemoProjects())
    } finally {
      setLoading(false)
    }
  }

  const getDemoProjects = () => {
    return [
      {
        _id: '1',
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with MERN stack.',
        shortDesc: 'Full-stack e-commerce platform with payment integration',
        image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=E-Commerce+Platform',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
        github: 'https://github.com/yourusername/ecommerce',
        liveDemo: 'https://demo-ecommerce.com'
      },
      {
        _id: '2',
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, team collaboration, and project tracking features.',
        shortDesc: 'Real-time collaborative task management system',
        image: 'https://via.placeholder.com/400x250/764ba2/ffffff?text=Task+Manager',
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        github: 'https://github.com/yourusername/task-manager',
        liveDemo: 'https://demo-tasks.com'
      },
      {
        _id: '3',
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media metrics with data visualization, charts, and reporting features.',
        shortDesc: 'Analytics dashboard with beautiful visualizations',
        image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Social+Dashboard',
        technologies: ['React', 'Chart.js', 'REST API', 'CSS3'],
        github: 'https://github.com/yourusername/social-dashboard',
        liveDemo: 'https://demo-dashboard.com'
      },
      {
        _id: '4',
        title: 'Weather Forecast App',
        description: 'Real-time weather application with 7-day forecast, location search, and interactive maps.',
        shortDesc: 'Weather app with real-time forecasts',
        image: 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Weather+App',
        technologies: ['React', 'Weather API', 'Geolocation'],
        github: 'https://github.com/yourusername/weather-app',
        liveDemo: 'https://demo-weather.com'
      },
      {
        _id: '5',
        title: 'Blog CMS Platform',
        description: 'Content management system for blogging with markdown support, categories, tags, and SEO optimization.',
        shortDesc: 'Blog CMS with markdown editor',
        image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Blog+CMS',
        technologies: ['React', 'Node.js', 'MongoDB', 'Markdown'],
        github: 'https://github.com/yourusername/blog-cms',
        liveDemo: 'https://demo-blog.com'
      },
      {
        _id: '6',
        title: 'Chat Application',
        description: 'Real-time chat application with private messaging, group chats, file sharing, and emoji support.',
        shortDesc: 'Real-time chat with group messaging',
        image: 'https://via.placeholder.com/400x250/ef4444/ffffff?text=Chat+App',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
        github: 'https://github.com/yourusername/chat-app',
        liveDemo: 'https://demo-chat.com'
      }
    ]
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="loading">Loading projects...</div>
  }

  return (
    <div className="projects-page">
      <div className="container">
        <h1 className="page-title">My Projects</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <p>No projects match your search.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id} className="project-card">
                <img src={project.image} alt={project.title} />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.shortDesc || project.description.substring(0, 100)}...</p>
                  <div className="tech-tags">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsPage
