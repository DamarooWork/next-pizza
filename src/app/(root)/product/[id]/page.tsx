import { Container } from '@/components/shared/container'
import { notFound } from 'next/navigation'
import {  ProductForm } from '@/components/shared'
import { prisma } from '@/../prisma'
interface Props {
  params: {
    id: string
  }
}
export default async function ProductPage({ params }: Props) {
  const { id } = await params
  if (!id) {
    return notFound()
  }
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true
    },
  })

  if (!product) {
    return notFound()
  }
  
  return (
    <Container className="mt-10">
      <ProductForm product={product} />
    </Container>
  )
}
