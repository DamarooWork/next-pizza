import Image from 'next/image'
import { Title } from '@/components/shared'
interface Props {
  className?: string
}
export function EmptyCartPlaceholder({ className }: Props) {
  return (
    <>
      <Image
        src="/assets/images/empty-box.png"
        alt="Корзина"
        width={150}
        height={150}
      />
      <Title
        size="md"
        text="Корзина пустая"
        className="text-center font-bold my-2"
      />
      <p className="text-center text-neutral-500 mb-5 px-4">
        Добавьте хотя бы один товар в корзину, чтобы совершить заказ
      </p>
    </>
  )
}
