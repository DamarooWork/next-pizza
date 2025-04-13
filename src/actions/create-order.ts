'use server'

import { CheckoutFormValues } from '@/components/shared'
import { prisma } from '../../prisma'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'

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
    // Создаем заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: cart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(cart.items),
      },
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

    // TODO: Создать заказ в системе ЮMoney

    return '/checkout/' + cartToken
  } catch (error) {
    console.error(error)
    return null
  }
}
