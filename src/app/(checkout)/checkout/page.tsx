import { CheckoutForm, Title } from '@/components/shared'
import { Suspense } from 'react'

export default async function CheckoutPage() {
  return (
    <section>
      <Title
        text="Оформление заказа"
        size="xl"
        className="font-extrabold mb-8"
      />
      <Suspense>
        <CheckoutForm />
      </Suspense>
    </section>
  )
}
