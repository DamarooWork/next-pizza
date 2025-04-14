import { PaymentCallbackData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {  OrderStatus } from '@prisma/client'
import { CartItemDTO } from '@/services/dto/cart.dto'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData

    const order = await prisma.order.findFirst({
      where: {
        id: +body.object.metadata.order_id,
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (body.type === 'payment.succeeded') {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: OrderStatus.SUCCESSED,
        },
      })
     
    }
    const items = order.items as unknown as CartItemDTO[]

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('[Checkout Callback] Server error', error)
    return NextResponse.json(
      { error: 'Failed to Checkout Callback' },
      { status: 500 }
    )
  }
  return
}
