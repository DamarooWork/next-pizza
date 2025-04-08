import { cn } from '@/lib/utils'
import { ProductItem } from '@prisma/client'
import { Ingredient } from '@prisma/client'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items: ProductItem[]
  loading?: boolean
  onSubmit: (itemId: number, ingredients: number[]) => void
  className?: string
}
export function ChoosePizzaForm({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onSubmit,
}: Props) {
  const textDetails = '40 см, традиционное тесто'
  const totalPrice = 350
  return (
    <section className={cn('flex flex-1', className)}>
      <ProductImage src={imageUrl} alt={name} size={40} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} className="font-extrabold mb-1" size="md" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        {/* <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div> */}
        {/* </div> */}
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </section>
  )
}
