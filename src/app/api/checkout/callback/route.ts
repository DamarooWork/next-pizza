import { PaymentCallbackData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { getTotalAndVatPrice, sendEmail, VAT } from '@/lib'
import { OrderSuccessTemplate } from '@/components/shared'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData
    // Находим заказ по id из ответа YOOKASSA
    const order = await prisma.order.findFirst({
      where: {
        id: +body.object.metadata.order_id,
      },
    })
    // Если нет заказа, то возвращаем ошибку
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
    // Проверяем статус оплаты
    const isSuccess = body.object.status === 'succeeded'
    // В случае успешной оплаты меняем статус заказа и отправляем email с параметрами заказа
    if (isSuccess) {
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: OrderStatus.SUCCESSED,
        },
      })
      const items = JSON.parse(
        order.items as string
      ) as unknown as CartItemDTO[]

      await sendEmail({
        subject: 'Next Pizza by Damaroo / Ваш заказ успешно оформлен 🎉',
        emailTo: order.email,
        ReactNode: OrderSuccessTemplate({
          order,
          items,
          
        }),
      })
    } else {
      // Если оплата не удалась, то меняем статус заказа на отмену
      await prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          status: OrderStatus.CANCELLED,
        },
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.log('[Checkout Callback] Server error', error)
    return NextResponse.json(
      { error: 'Failed to Checkout Callback' },
      { status: 500 }
    )
  }
}
