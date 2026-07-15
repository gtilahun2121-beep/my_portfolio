'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaSearch, FaClock, FaEye } from 'react-icons/fa'
import axios from 'axios'
import { format } from 'date-fns'

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/admin/blogs?published=true')
      setBlogs(response.data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', ...new Set(blogs.map(b => b.category).filter(Boolean))]

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase()) ||
                         blog.content.toLowerCase().includes(search.toLowerCase()) ||
                         blog.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading blog posts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-2xl font-bold text-white hover:text-primary-400 transition">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Thoughts, tutorials, and insights on web development, programming, and technology.
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-400 mb-6">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No blog posts found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 hover:border-primary-500 transition group"
                >
                  {/* Cover Image */}
                  {blog.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                  )}

                  {/* Blog Info */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs font-semibold mb-3">
                      {blog.category}
                    </span>

                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition line-clamp-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {blog.excerpt || blog.content.substring(0, 150) + '...'}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      {blog.readTime && (
                        <div className="flex items-center gap-1">
                          <FaClock size={14} />
                          <span>{blog.readTime} min read</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <FaEye size={14} />
                        <span>{blog.views} views</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-700 text-gray-400 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="block w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition text-center font-semibold"
                    >
                      Read More
                    </Link>

                    {/* Date */}
                    <p className="text-gray-500 text-xs mt-3">
                      {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
