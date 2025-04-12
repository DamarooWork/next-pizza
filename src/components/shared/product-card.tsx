import Link from 'next/link'
import Image from 'next/image'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { Prisma } from '@prisma/client'

const ProductSelect = {
  id: true,
  name: true,
  imageUrl: true,
  ingredients: true,
} satisfies Prisma.ProductSelect

interface ProductCardProps
  extends Prisma.ProductGetPayload<{
    select: typeof ProductSelect
  }> {
  className?: string
  price: number
}

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  ingredients,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className={'group flex flex-col justify-between'}
    >
      <div>
        <div className="flex justify-center p-6 bg-primary-foreground rounded-lg h-[260px]">
          <Image
            className="size-[215px] group-hover:translate-y-1 group-active:translate-y-2  transition-all duration-300 ease-in-out"
            src={imageUrl}
            alt={name}
            width={215}
            height={215}
            sizes="215px"
          />
        </div>
        <Title
          text={name}
          size="sm"
          className="mb-1 mt-3 font-bold line-clamp-1"
        />
        <p className="text-sm text-gray-400 line-clamp-3">
          {ingredients
            .map((ingredient, i) => {
              if (i === 0) {
                return ingredient.name
              }
              return ingredient.name.toLowerCase()
            })
            .join(', ')}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price.toFixed()} ₽</b>
        </span>

        <Button variant="secondary" className="text-base font-bold">
          <Plus size={20} className="mr-1" />
          Добавить
        </Button>
      </div>
    </Link>
  )
}
