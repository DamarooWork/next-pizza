import { CheckoutForm, Title } from '@/components/shared'

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
