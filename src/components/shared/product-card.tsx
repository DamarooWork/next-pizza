import Link from 'next/link'
import Image from 'next/image'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
  ingredients: string[]
  className?: string
}
export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  ingredients,
  className,
}: Props) {
  return (
    <Link href={`/product/${id}`} className={className + 'block group'}>
      <div className="flex justify-center p-6 bg-primary-foreground rounded-lg h-[260px]">
        <Image
          className="size-[215px] group-hover:-translate-y-1  transition-all duration-300 ease-in-out"
          src={imageUrl}
          alt={name}
          width={215}
          height={215}
          sizes="215px"
        />
      </div>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      <p className="text-sm text-gray-400">
        Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус
        альфредо, чеснок
      </p>
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
