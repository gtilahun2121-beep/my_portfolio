import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { skillsAPI } from '../services/api'
import './SkillsPage.css'

function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    // Set skills directly (not fetching from API for now)
    setSkills([
      // Frontend
      { name: 'HTML5', category: 'Frontend' },
      { name: 'CSS3', category: 'Frontend' },
      { name: 'JavaScript', category: 'Frontend' },
      { name: 'React', category: 'Frontend' },
      
      // Backend
      { name: 'Node.js', category: 'Backend' },
      { name: 'PHP', category: 'Backend' },
      
      // Database
      { name: 'MongoDB', category: 'Database' },
      { name: 'MySQL', category: 'Database' },
      
      // Tools
      { name: 'Git', category: 'Tools' },
      { name: 'GitHub', category: 'Tools' }
    ])
    setLoading(false)
  }

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return '#10b981'
      case 'advanced': return '#3b82f6'
      case 'intermediate': return '#f59e0b'
      case 'beginner': return '#6366f1'
      default: return '#8b5cf6'
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="skills-page">
        <div className="container">
          <div className="loading">Loading skills...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="skills-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">My Skills</h1>
          <p className="page-subtitle">
            Technologies and tools I work with to build amazing projects
          </p>

          <div className="skills-container">
            {Object.keys(groupedSkills).map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="skill-category"
              >
                <h2 className="category-title">{category}</h2>
                <div className="skills-grid">
                  {groupedSkills[category].map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="skill-card"
                    >
                      <div className="skill-name">{skill.name}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SkillsPage
