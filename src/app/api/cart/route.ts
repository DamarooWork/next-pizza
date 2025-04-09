import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma'

export async function GET(req: NextRequest) {
  try {
    const userId = 1
    const token = req.headers.get('cartToken')?.valueOf()
    if (!token) {
      return NextResponse.json({ items: [] }, { status: 200 })
    }
    const cart = await prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: true
      },
    })
    return NextResponse.json({ items: cart?.items })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 })
  }
}
