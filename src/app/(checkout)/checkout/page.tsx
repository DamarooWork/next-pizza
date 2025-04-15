import { Title } from '@/components/shared'
import React from 'react'
const CheckoutForm = React.lazy(() =>
  import('@/components/shared').then((mod) => ({
    default: mod.CheckoutForm,
  }))
)
export default function CheckoutPage() {
  return (
    <section>
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold mb-8"
      />
      <CheckoutForm />
    </section>
  )
}
