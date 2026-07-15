import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogsAPI } from '../services/api'

function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await blogsAPI.getAll()
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading blog posts...</div>
  }

  return (
    <div style={{ minHeight: '100vh', padding: '4rem 0', color: 'white' }}>
      <div className="container">
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '3rem' }}>Blog</h1>
        {blogs.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '1.25rem' }}>No blog posts yet. Check back soon!</p>
        ) : (
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {blogs.map((blog) => (
              <Link 
                key={blog._id} 
                to={`/blog/${blog.slug}`}
                style={{ background: 'white', color: '#333', padding: '2rem', borderRadius: '12px', textDecoration: 'none' }}
              >
                <h2>{blog.title}</h2>
                <p>{blog.excerpt || blog.content.substring(0, 150)}...</p>
                <span style={{ color: '#667eea' }}>Read more →</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage
