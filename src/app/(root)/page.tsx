import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductsGroupList } from '@/components/shared'
import { Suspense } from 'react'
import { prisma } from '@/../prisma'
import { Prisma } from '@prisma/client'
import { Skeleton } from '@/components/ui'
const categorySelect = {
  id: true,
  name: true,
  products: {
    include: {
      items: true,
      ingredients: true,
    },
  },
} satisfies Prisma.CategorySelect

export interface CategoryWithProducts
  extends Prisma.CategoryGetPayload<{
    select: typeof categorySelect
  }> {}

export default async function Home() {
  let categories: CategoryWithProducts[] = []
  let isLoading: boolean = false
  try {
    isLoading = true
    categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            items: true,
            ingredients: true,
          },
        },
      },
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
  } finally {
    isLoading = false
  }

  return (
    <>
      <Container className="mt-4 lg:mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      {isLoading ? (
        <Skeleton className="h-[50px] w-full" />
      ) : (
        <TopBar
          categories={categories.filter(
            (category) => category.products.length > 0
          )}
        />
      )}
      <Container className="mt-10 pb-14 ">
        <div className="flex  gap-[60px]  ">
          {/* Фильтрация */}
          <Suspense fallback={<div>Loading...</div>}>
            <Filters />
          </Suspense>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
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
