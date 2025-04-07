import { Container } from '@/components/shared/container'
import { prisma } from '../../../../prisma'
import { notFound } from 'next/navigation'
import { ProductImage } from '@/components/shared/product-image'
interface Props {
  params: {
    id: string
  }
}
export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  })

  if (!product) {
    return notFound()
  }
  return (
    <Container className="mt-10">
      <ProductImage
        className=""
        src={product.imageUrl}
        alt={product.name}
        size={40}
      />
    </Container>
  )
}
