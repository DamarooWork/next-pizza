export const dynamic = 'force-dynamic'

import { Title, CheckoutForm } from '@/components/shared'
export default function CheckoutPage() {
  return (
    <>
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold mb-8"
      />
      <CheckoutForm />
    </>
  )
}
