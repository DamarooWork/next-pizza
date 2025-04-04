import { Container, Filters, Title, TopBar } from '@/components/shared'

export default function Home() {
  return (
    <>
      <Container className="mt-4 lg:mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categories={[]} />
      <Container className="mt-10 pb-14">
        <div className="flex  gap-[60px]">
          {/* Фильтрация */}
          <Filters />

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">Spisok tovarov</div>
          </div>
        </div>
      </Container>
    </>
  )
}
