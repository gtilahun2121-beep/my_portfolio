import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromRequest, isAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)

    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get total counts
    const [totalProjects, totalBlogs, totalMessages, totalVisitors] =
      await Promise.all([
        prisma.project.count(),
        prisma.blog.count({ where: { published: true } }),
        prisma.contact.count(),
        prisma.visitor.count(),
      ])

    // Get unread messages
    const unreadMessages = await prisma.contact.count({
      where: { read: false },
    })

    // Get recent analytics
    const analyticsData = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: 'asc' },
    })

    // Get top viewed projects (through blog views as proxy)
    const topBlogs = await prisma.blog.findMany({
      take: 5,
      orderBy: { views: 'desc' },
      select: {
        id: true,
        title: true,
        views: true,
      },
    })

    // Get visitor stats
    const visitorsByDevice = await prisma.visitor.groupBy({
      by: ['device'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    })

    const visitorsByBrowser = await prisma.visitor.groupBy({
      by: ['browser'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate,
        },
      },
    })

    // Get recent visitors
    const recentVisitors = await prisma.visitor.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      overview: {
        totalProjects,
        totalBlogs,
        totalMessages,
        totalVisitors,
        unreadMessages,
      },
      analytics: analyticsData,
      topBlogs,
      visitorsByDevice,
      visitorsByBrowser,
      recentVisitors,
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
