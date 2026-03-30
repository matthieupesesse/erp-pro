import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const item = await prisma.inventoryItem.create({
      data: {
        sku: data.sku,
        name: data.name,
        description: data.description,
        quantity: parseInt(data.quantity) || 0,
        reorderLevel: parseInt(data.reorderLevel) || 10,
        unitPrice: parseFloat(data.unitPrice),
        category: data.category,
        location: data.location
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create inventory item' }, { status: 500 })
  }
}
