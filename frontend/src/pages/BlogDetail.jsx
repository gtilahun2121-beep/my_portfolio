import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { blogsAPI } from '../services/api'

function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const response = await blogsAPI.getOne(slug)
      setBlog(response.data)
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading blog post...</div>
  }

  if (!blog) {
    return <div className="loading">Blog post not found</div>
  }

  return (
    <div style={{ color: 'white', padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{blog.title}</h1>
        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }} />
        )}
        <div style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
          {blog.content}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
