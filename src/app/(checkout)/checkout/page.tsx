import { Title } from '@/components/shared/title'
import { CheckoutForm } from '@/components/shared/checkout/checkout-form'

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
