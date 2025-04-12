import { Container, Filters, Title, TopBar } from '@/components/shared'
import { ProductsGroupList } from '@/components/shared'
import { Suspense } from 'react'
import { FindPizzas } from '@/lib'
import { CategoryWithProducts, GetSearchParams } from '@/lib/find-pizzas'

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams
}) {
  const params = await searchParams
  const categories: CategoryWithProducts[] = await FindPizzas(params)
  return (
    <>
      <Container className="mt-4 lg:mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className="mt-10 pb-14 ">
        <div className="flex  gap-[60px]  ">
          {/* Фильтрация */}
          <Suspense>
            <Filters />
          </Suspense>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
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
