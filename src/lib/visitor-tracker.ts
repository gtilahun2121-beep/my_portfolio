import { prisma } from './prisma'
import { NextRequest } from 'next/server'

export async function trackVisitor(request: NextRequest, page: string) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Parse user agent (simplified)
    const device = userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
    const browser = getBrowser(userAgent)
    const os = getOS(userAgent)

    // Create visitor record
    await prisma.visitor.create({
      data: {
        ip,
        page,
        device,
        browser,
        os,
      },
    })

    // Update daily analytics
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    await prisma.analytics.upsert({
      where: { date: today },
      create: {
        date: today,
        totalVisitors: 1,
        totalViews: 1,
        uniqueVisitors: 1,
      },
      update: {
        totalVisitors: { increment: 1 },
        totalViews: { increment: 1 },
      },
    })
  } catch (error) {
    console.error('Error tracking visitor:', error)
  }
}

function getBrowser(userAgent: string): string {
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Other'
}

function getOS(userAgent: string): string {
  if (userAgent.includes('Windows')) return 'Windows'
  if (userAgent.includes('Mac')) return 'MacOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS')) return 'iOS'
  return 'Other'
}
