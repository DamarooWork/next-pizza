import { Container, Filters, Title, TopBar } from '@/components/shared'
import ProductCard from '@/components/shared/product-card'
import ProductsGroupList from '@/components/shared/products-group-list'

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
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={'Пиццы'}
                items={[
                  {
                    id: 1,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={0}
              />
              <ProductsGroupList
                title={'Комбо'}
                items={[
                  {
                    id: 1,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Мясной микс с говядиной и колбасками',
                    price: 550,
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.avif',
                    ingredients: [
                      'Пряная говядина',
                      'баварские колбаски',
                      'пикантная пепперони',
                      'бекон',
                      'моцарелла',
                      'фирменный томатный соус',
                    ],
                    items: [{ price: 550 }],
                  },
                ]}
                categoryId={0}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
