'use client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Prisma } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'
import { useCartStore } from '@/store/cart'
const ProductSelect = {
  id: true,
  name: true,
  imageUrl: true,
  items: true,
  description: true,
  ingredients: true,
} satisfies Prisma.ProductSelect
interface Props {
  product: Prisma.ProductGetPayload<{
    select: typeof ProductSelect
  }>
  className?: string
}
export function ChooseModalProduct({ product, className }: Props) {
  const { addCartItem } = useCartStore()
  const router = useRouter()
  const firstItem = product.items[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)
  const onAddProduct = async (
    productItemId?: number,
    ingredients?: number[]
  ) => {
    try {
      const itemId = productItemId ?? firstItem.id
      await addCartItem({
        productItemId: itemId,
        ingredients,
      })
      router.back()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0  min-w-fit max-w-[1060px] min-h-[500px] max-h-[90vh]  bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden">{product.name}</DialogTitle>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onAddProduct}
            description={product.description}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstItem.price}
            onSubmit={onAddProduct}
            description={product.description}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
