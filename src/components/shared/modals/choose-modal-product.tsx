'use client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Prisma } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'

const ProductSelect = {
  id: true,
  name: true,
  imageUrl: true,
  items: true,
  ingredients: true,
} satisfies Prisma.ProductSelect
interface Props {
  product: Prisma.ProductGetPayload<{
    select: typeof ProductSelect
  }>
  className?: string
}
export function ChooseModalProduct({ product, className }: Props) {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType)
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
            onSubmit={() => {}}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={() => {}}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
