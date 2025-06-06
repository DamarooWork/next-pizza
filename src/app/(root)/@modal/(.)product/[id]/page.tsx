import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ChooseModalProduct } from '@/components/shared/modals'
interface Props {
  params: {
    id: string
  }
}
export default async function ProductModalPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  })

  if (!product) {
    return notFound()
  }
  return <ChooseModalProduct product={product} />
}
