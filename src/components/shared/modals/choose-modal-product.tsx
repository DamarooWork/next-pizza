'use client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Prisma, Product } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm } from '@/components/shared'

const ProductSelect = {
  id: true,
  name: true,
  items: true,
  imageUrl: true,
  ingredients: true,
} satisfies Prisma.ProductSelect
interface Props {
  product: Prisma.ProductGetPayload<{
    select: typeof ProductSelect
  }>
  className?: string
  children: React.ReactNode
}
export function ChooseModalProduct({ product, className, children }: Props) {
  const router = useRouter()
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0  min-w-fit max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden">{product.name}</DialogTitle>
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
          onSubmit={() => {}}
        />
      </DialogContent>
    </Dialog>
  )
}
