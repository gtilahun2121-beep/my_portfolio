import { motion } from 'framer-motion'
import { FaDownload, FaGraduationCap, FaBriefcase, FaAward } from 'react-icons/fa'
import './AboutPage.css'

function AboutPage() {
  const handleDownloadResume = () => {
    // This will trigger the download of your resume
    // You'll need to place your resume.pdf in the public folder
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Getanew_Tilahun_Resume.pdf'
    link.click()
  }

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Bahir Dar University',
      year: '2022 - Present',
      description: 'Focused on software development, web technologies, and database systems. Building modern web applications and solving real-world problems through technology.'
    }
  ]

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Developed full-stack web applications using React, Node.js, and MongoDB. Built responsive user interfaces and RESTful APIs for various clients.',
      achievements: [
        'Built 10+ web applications with MERN stack',
        'Developed responsive and modern UIs',
        'Implemented authentication systems with JWT',
        'Created RESTful APIs and database designs'
      ]
    },
    {
      title: 'Computer Science Student',
      company: 'Bahir Dar University',
      period: '2022 - Present',
      description: 'Learning and mastering modern web technologies, algorithms, and software development practices.',
      achievements: [
        'Learned React, Node.js, and MongoDB',
        'Built portfolio projects and personal websites',
        'Gained CCNA certification',
        'Completed multiple online certifications'
      ]
    }
  ]

  const certificates = [
    {
      name: 'Artificial Intelligence Fundamentals',
      issuer: 'Online Course',
      year: '2024'
    },
    {
      name: 'Data Analysis Fundamentals',
      issuer: 'Online Course',
      year: '2024'
    },
    {
      name: 'Android Developer Fundamentals',
      issuer: 'Online Course',
      year: '2024'
    },
    {
      name: 'CCNA Certification',
      issuer: 'Cisco',
      year: '2023'
    }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="about-hero-content"
          >
            <img 
              src="/profile.jpg" 
              alt="Getanew Tilahun" 
              className="about-profile-photo"
            />
            <h1 className="about-title">About Me</h1>
            <p className="about-subtitle">Full Stack Developer | Problem Solver | Continuous Learner</p>
            <button onClick={handleDownloadResume} className="download-resume-btn">
              <FaDownload /> Download Resume
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bio-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bio-content"
          >
            <h2 className="section-title">My Story</h2>
            <div className="bio-text">
              <p>
                Hi! I'm <strong>Getanew Tilahun</strong>, a passionate Computer Science student at Bahir Dar University 
                and a Full Stack Developer with expertise in building modern web applications. I love turning ideas into 
                reality through clean code and elegant design.
              </p>
              <p>
                My journey in web development started with curiosity and grew into a passion for creating 
                user-friendly applications that solve real-world problems. I specialize in the MERN stack 
                (MongoDB, Express.js, React, Node.js) and enjoy learning new technologies.
              </p>
              <p>
                I'm CCNA certified and have completed certifications in Artificial Intelligence, Data Analysis, 
                and Android Development. I'm proficient in HTML, CSS, JavaScript, React, Node.js, and MongoDB.
              </p>
              <p>
                <strong>Location:</strong> Bahir Dar, Ethiopia<br/>
                <strong>What drives me:</strong> Creating impactful solutions, learning continuously, and growing 
                both personally and professionally in the tech industry. I'm a fast learner with strong teamwork 
                and problem-solving abilities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaGraduationCap /> Education
            </h2>
            <div className="timeline">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="timeline-item"
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>{edu.degree}</h3>
                    <p className="timeline-meta">{edu.school} | {edu.year}</p>
                    <p className="timeline-description">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaBriefcase /> Work Experience
            </h2>
            <div className="timeline">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="timeline-item"
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>{exp.title}</h3>
                    <p className="timeline-meta">{exp.company} | {exp.period}</p>
                    <p className="timeline-description">{exp.description}</p>
                    <ul className="achievements-list">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="certificates-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <FaAward /> Certificates & Achievements
            </h2>
            <div className="certificates-grid">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ delay: index * 0.1 }}
                  className="certificate-card"
                >
                  <div className="certificate-icon">
                    <FaAward />
                  </div>
                  <h3>{cert.name}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-year">{cert.year}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="cta-content"
          >
            <h2>Let's Work Together</h2>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">Get In Touch</a>
              <a 
                href="https://calendly.com/gtilahun2121/30min" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                📅 Schedule a Call
              </a>
              <button onClick={handleDownloadResume} className="btn btn-secondary">
                <FaDownload /> Download Resume
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
