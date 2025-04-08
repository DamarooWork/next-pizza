import { Container } from '@/components/shared/container'
import { notFound } from 'next/navigation'
import { PizzaImage } from '@/components/shared/pizza-image'
import { Title } from '@/components/shared/title'
import { GroupVariants } from '@/components/shared'
import { prisma } from '@/../prisma'
import { pizzaSizes, pizzaTypes } from '@/lib/constants/pizza'
interface Props {
  params: {
    id: string
  }
}
export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!product) {
    return notFound()
  }
  return (
    <Container className="mt-10">
      <section className="flex flex-1 gap-10">
        <PizzaImage src={product.imageUrl} alt={product.name} size={40} />
        <div className="flex flex-col gap-2">
          <Title text={product.name} size="lg" className="font-extrabold" />
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <p className="text-2xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
          <GroupVariants value={'1'} items={pizzaSizes} />
          <GroupVariants items={pizzaTypes} />
        </div>
      </section>
    </Container>
  )
}
