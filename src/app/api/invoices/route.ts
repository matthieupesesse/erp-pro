import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        contact: { select: { name: true, company: true } },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const invoice = await prisma.invoice.create({
      data: {
        number: data.number,
        contactId: data.contactId,
        userId: data.userId || 'default-user-id',
        amount: parseFloat(data.amount),
        tax: parseFloat(data.tax || '0'),
        total: parseFloat(data.total),
        status: 'DRAFT',
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        description: data.description,
        items: {
          create: data.items || []
        }
      },
      include: { items: true }
    })
    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
