'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'

export default function NewProject() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    description: '',
    image: '',
    screenshots: [] as string[],
    github: '',
    liveDemo: '',
    technologies: '',
    category: '',
    featured: false,
    problem: '',
    solution: '',
    architecture: '',
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      setFormData((prev) => ({ ...prev, image: response.data.url }))
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem('token')
    const technologies = formData.technologies.split(',').map((t) => t.trim())

    try {
      await axios.post(
        '/api/admin/projects',
        {
          ...formData,
          technologies,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      router.push('/admin/projects')
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-white">Create New Project</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Short Description</label>
              <input
                type="text"
                value={formData.shortDesc}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                placeholder="Brief one-line description"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Full Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 h-32"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Main Image *</label>
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="Image URL"
                  required
                />
                <label className="px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition cursor-pointer flex items-center gap-2">
                  <FaUpload />
                  {uploading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="https://github.com/..."
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Live Demo URL</label>
                <input
                  type="url"
                  value={formData.liveDemo}
                  onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Technologies (comma-separated) *</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                placeholder="Web App, Mobile App, etc."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                Featured Project
              </label>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Problem (Case Study)</label>
              <textarea
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 h-24"
                placeholder="What problem does this project solve?"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Solution (Case Study)</label>
              <textarea
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 h-24"
                placeholder="How did you solve it?"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Architecture (Case Study)</label>
              <textarea
                value={formData.architecture}
                onChange={(e) => setFormData({ ...formData, architecture: e.target.value })}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500 h-24"
                placeholder="Technical architecture and design decisions"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/projects')}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
