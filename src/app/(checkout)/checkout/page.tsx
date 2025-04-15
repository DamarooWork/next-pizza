import { Title } from '@/components/shared'
import dynamic from 'next/dynamic'
const CheckoutForm = dynamic(
  () =>
    import('@/components/shared').then((mod) => ({
      default: mod.CheckoutForm,
    })),
  { ssr: !!false }
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
