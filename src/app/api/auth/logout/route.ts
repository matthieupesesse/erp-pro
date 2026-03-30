import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh-token')?.value

    if (refreshToken) {
      await prisma.session.deleteMany({ where: { token: refreshToken } })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.delete('access-token')
    response.cookies.delete('refresh-token')

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
