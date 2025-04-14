'use server'

import { CheckoutFormValues, PayOrderTemplate } from '@/components/shared'
import { prisma } from '../../prisma'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'
import { CreatePayment, getTotalAndVatPrice, SendEmailPayOrder } from '@/lib'
export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies()
    const cartToken = cookieStore.get('cartToken')?.value as string
    if (!cartToken) {
      throw new Error('Cart token not found')
    }
    // Находим корзину по токену
    const cart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })
    // Если корзина не найдена или ее сумма равна 0, то возвращаем ошибку
    if (!cart) {
      throw new Error('Cart not found')
    }
    if (cart?.totalAmount === 0) {
      throw new Error('Cart is empty')
    }
    // Вычисляем общую сумму заказа с учетом Налога и Доставки
    const { totalPrice } = getTotalAndVatPrice(cart.totalAmount)

    // Создаем заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: totalPrice,
        status: OrderStatus.PENDING,
        items: JSON.stringify(cart.items),
      },
    })
   

    // Создаем платеж
    const paymentData = await CreatePayment({
      totalPrice: totalPrice,
      orderId: order.id,
      description: 'Оплата заказа # ' + order.id,
    })
    // Обрабатываем платеж
    if (!paymentData) {
      throw new Error('Ошибка создания платежа')
    }
    // Обновляем paymentId в заказе если платеж создан
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    })
    const paymentUrl = paymentData.confirmation.confirmation_url
    // Отправляем email с параметрами платежа
    const info = await SendEmailPayOrder({
      subject: `Оплата  заказа #${order.id} на сумму ${totalPrice} ₽`,
      emailTo: data.email,
      ReactNode: PayOrderTemplate({
        orderId: order.id,
        totalAmount: totalPrice,
        paymentUrl,
        className: 'bg-white p-8 rounded-lg shadow-md',
      }),
    })
     // Обнуляем totalAmount корзину
     await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        totalAmount: 0,
      },
    })
    // Удаляем все товары из корзины
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    })

    return paymentUrl
  } catch (error) {
    console.error('[CreateOrder] Server error', error)
    return null
  }
}
