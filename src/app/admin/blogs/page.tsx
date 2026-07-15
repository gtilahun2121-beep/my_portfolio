'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'
import { format } from 'date-fns'

export default function AdminBlogs() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchBlogs(token)
  }, [router])

  const fetchBlogs = async (token: string) => {
    try {
      const response = await axios.get('/api/admin/blogs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    const token = localStorage.getItem('token')
    try {
      await axios.delete(`/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBlogs(blogs.filter((b) => b.id !== id))
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Failed to delete blog post')
    }
  }

  const togglePublish = async (id: string, currentStatus: boolean) => {
    const token = localStorage.getItem('token')
    try {
      await axios.put(
        `/api/admin/blogs/${id}`,
        { published: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setBlogs(blogs.map((b) => (b.id === id ? { ...b, published: !currentStatus } : b)))
    } catch (error) {
      console.error('Error updating blog:', error)
      alert('Failed to update blog status')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Manage Blog Posts</h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/admin/blogs/new')}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition flex items-center gap-2"
              >
                <FaPlus /> New Post
              </button>
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No blog posts yet</p>
            <button
              onClick={() => router.push('/admin/blogs/new')}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
            >
              Write Your First Post
            </button>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Title</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Views</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-slate-700 hover:bg-slate-700/50">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{blog.title}</div>
                      <div className="text-gray-400 text-sm">{blog.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-sm">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {blog.published ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{blog.views}</td>
                    <td className="px-6 py-4 text-gray-300">
                      {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePublish(blog.id, blog.published)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          title={blog.published ? 'Unpublish' : 'Publish'}
                        >
                          {blog.published ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => router.push(`/admin/blogs/${blog.id}`)}
                          className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
