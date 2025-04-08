'use client'
import { cn } from '@/lib/utils'
import { Title } from './title'
import ProductCard from './product-card'
import { useIntersection } from 'react-use'
import { useEffect, useRef } from 'react'
import { useCategoryStore } from '@/store/category'

interface Props {
  title: string
  items: any[]
  categoryId: number
  className?: string
  listClassName?: string
}
export function ProductsGroupList({
  title,
  items,
  listClassName,
  categoryId,
  className,
}: Props) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = useRef<HTMLDivElement>(null)
  const intersection = useIntersection(intersectionRef as React.RefObject<HTMLElement>, {
    threshold: 0.4,
  })
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting, title, categoryId])
  return (
    <section ref={intersectionRef} id={title} className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <ul
        className={cn(
          'grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-[30px] ',
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </ul>
    </section>
  )
}
