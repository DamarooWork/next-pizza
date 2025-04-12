'use client'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Prisma } from '@prisma/client'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/shared'

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
  const router = useRouter()
  const routerBack = () => {
    router.back()
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={routerBack}>
      <DialogContent
        className={cn(
          'p-0  min-w-fit max-w-[1060px] min-h-[500px] max-h-[90vh]  bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="hidden">{product.name}</DialogTitle>
        <ProductForm product={product} onSubmit={routerBack} />
      </DialogContent>
    </Dialog>
  )
}
