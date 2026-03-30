import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const stats = await Promise.all([
      prisma.contact.count({ where: { status: 'CUSTOMER' } }),
      prisma.invoice.aggregate({ _sum: { total: true } }),
      prisma.inventoryItem.count(),
      prisma.project.count({ where: { status: 'ACTIVE' } })
    ])

    return NextResponse.json({
      customers: stats[0],
      revenue: stats[1]._sum.total || 0,
      inventoryItems: stats[2],
      activeProjects: stats[3]
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
