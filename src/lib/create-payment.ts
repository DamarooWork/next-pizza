import { PaymentData } from '@/types'
import axios from 'axios'
interface CreatePaymentProps {
  totalPrice: number
  orderId: number
  description: string
}
export async function CreatePayment(details: CreatePaymentProps) {
  const { data } = await axios.post<PaymentData>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.totalPrice.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.YOOKASSA_CALLBACK_URL as string,
      },
    },
    {
      auth: {
        username: process.env.YOOKASSA_SHOP_ID as string,
        password: process.env.YOOKASSA_SECRET_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 15)}`,
        // Authorization: `Basic ${Buffer.from(
        //   `${process.env.YOOKASSA_SHOP_ID as string}:${
        //     process.env.YOOKASSA_SECRET_KEY as string
        //   }`
        // ).toString('base64')}`,
      },
    }
  )
  return data
}
