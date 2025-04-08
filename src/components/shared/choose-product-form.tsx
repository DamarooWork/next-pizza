import { cn } from '@/lib/utils'
import { ProductItem } from '@prisma/client'
import { Ingredient } from '@prisma/client'
import { Title } from './title'
import { Button } from '../ui'
import Image from 'next/image'

interface Props {
  imageUrl: string
  name: string
  loading?: boolean
  onSubmit: (itemId: number, ingredients: number[]) => void
  className?: string
}
export function ChooseProductForm({
  className,
  imageUrl,
  name,
  loading,
  onSubmit,
}: Props) {
  const textDetails = '40 см, традиционное тесто'
  const totalPrice = 350
  return (
    <section className={cn('flex flex-1', className)}>
      <div className="flex items-center justify-center relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 size-[350px] min-w-[350px] min-h-[350px]"
          width={350}
          height={350}
        />
      </div>
      <div className="flex justify-between flex-col w-[490px] bg-[#f7f6f5] p-7">
        <div>
          <Title text={name} className="font-extrabold mb-1" size="md" />
          <p className="text-gray-400">{textDetails}</p>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 float-end">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </section>
  )
}
