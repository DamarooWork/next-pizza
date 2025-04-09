import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value
    if (!token) {
      return NextResponse.json({totalAmount: 0, items: [] }, { status: 200 })
    }
    const cart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    })
    return NextResponse.json(cart)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get cart' }, { status: 500 })
  }
}
