import { cn } from '@/lib/utils'

interface Props {
  orderId: number
  totalAmount: number
  paymentUrl: string
  className?: string
}
export function PayOrderTemplate({
  orderId,
  totalAmount,
  className,
  paymentUrl,
}: Props) {
  return (
    <section
      className={cn(
        className,
        'bg-white p-8 rounded-lg shadow-md flex justify-center items-center'
      )}
    >
      <h1>Заказ №{orderId}</h1>
      <p>
        Оплатите заказ на сумму {totalAmount} ₽. Перейдите по этой{' '}
        <a className="underline" href={paymentUrl}>
          ссылке
        </a>{' '}
        , чтобы завершить оплату.
      </p>
      <img
        className="size-80 aspect-square"
        src="https://i.pinimg.com/736x/0f/9a/ff/0f9aff5fc8a976ef0f4a1babc5a1a27c.jpg"
        alt="Котик"
      />
    </section>
  )
}
