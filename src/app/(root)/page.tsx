import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductsGroupList } from '@/components/shared'
import { Suspense } from 'react'
import { prisma } from '@/../prisma'
export default async function Home() {
  const categories = await prisma?.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  })
  return (
    <>
      <Container className="mt-4 lg:mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories?.filter(
          (category) => category?.products.length > 0
        )}
      />
      <Container className="mt-10 pb-14 ">
        <div className="flex  gap-[60px]  ">
          {/* Фильтрация */}
          <Suspense fallback={<div>Loading...</div>}>
            <Filters />
          </Suspense>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories?.map(
                (category, i) =>
                  category?.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
