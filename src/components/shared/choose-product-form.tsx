import { cn } from '@/lib/utils'
import { Title } from './title'
import { Button } from '../ui'
import Image from 'next/image'

interface Props {
  imageUrl: string
  name: string
  price: number
  loading?: boolean
  onSubmit: () => void
  className?: string
  description: string
}
export function ChooseProductForm({
  className,
  imageUrl,
  name,
  price,
  loading,
  onSubmit,
  description,
}: Props) {
  return (
    <section className={cn('flex flex-1 justify-around', className)}>
      <div className="flex items-center justify-center  relative ">
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
          <p className="text-gray-400">{description}</p>
        </div>

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 float-end"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </section>
  )
}
