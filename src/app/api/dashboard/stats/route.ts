import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
    }

    const [totalContacts, leads, customers] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'LEAD' } }),
      prisma.contact.count({ where: { status: 'CUSTOMER' } }),
    ])

    const [totalInvoices, paidInvoices, pendingInvoices] = await Promise.all([
      prisma.invoice.count(),
      prisma.invoice.count({ where: { status: 'PAID' } }),
      prisma.invoice.count({ where: { status: { in: ['DRAFT', 'SENT'] } } }),
    ])

    const [totalProjects, activeProjects] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'ACTIVE' } }),
    ])

    const [totalTasks, todoTasks, doneTasks] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { status: 'TODO' } }),
      prisma.task.count({ where: { status: 'DONE' } }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        contacts: { total: totalContacts, leads, customers },
        invoices: { total: totalInvoices, paid: paidInvoices, pending: pendingInvoices },
        projects: { total: totalProjects, active: activeProjects },
        tasks: { total: totalTasks, todo: todoTasks, done: doneTasks },
      },
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
