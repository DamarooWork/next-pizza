import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../prisma'
import FindOrCreateCart from '@/lib/find-or-create-cart'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { updateCartTotalAmount } from '@/lib'
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value
    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] }, { status: 200 })
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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let token = req.cookies.get('cartToken')?.value
    if (!token) {
      token = crypto.randomUUID()
    }
    const cart = await FindOrCreateCart(token)

    const body = (await req.json()) as CreateCartItemValues
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productItemId: body.productItemId,
        ingredients: {
          every: {
            id: {
              in: body.ingredients,
            },
          },
        },
      },
    })
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productItemId: body.productItemId,
          ingredients: {
            connect: body.ingredients?.map((id) => ({ id })),
          },
          quantity: 1,
        },
      })
    }
    const updatedCart = await updateCartTotalAmount(token)
    const resp = NextResponse.json(updatedCart)
    resp.cookies.set('cartToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return resp
  } catch (error) {
    console.log('[CART_POST] Server error', error)
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    )
  }
}
