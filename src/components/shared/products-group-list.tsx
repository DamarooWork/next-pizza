import { cn } from '@/lib/utils'
import { Title } from './title'
import ProductCard from './product-card'

interface Props {
  title: string
  items: any[]
  categoryId: number
  className?: string
  listClassName?: string
}
export default function ProductsGroupList({
  title,
  items,
  listClassName,
  categoryId,
  className,
}: Props) {
  return (
    <section className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <ul
        className={cn(
          'grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-[50px]',
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
