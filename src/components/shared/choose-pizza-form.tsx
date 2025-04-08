'use client'
import { ProductItem, Ingredient } from '@prisma/client'
import {
  IngredientItem,
  PizzaImage,
  GroupVariants,
  Title,
} from '@/components/shared'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { GetPizzaDetails, PizzaSize, PizzaType, pizzaTypes } from '@/lib'
import { UsePizzaOptions } from '@/hooks'
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
  const {
    size,
    type,
    availablePizzaSizes,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
  } = UsePizzaOptions(items, ingredients)

  const { totalPrice, textDetails } = GetPizzaDetails(
    items,
    ingredients,
    selectedIngredients,
    type,
    size
  )
  const handleSubmit = () => {
    onSubmit(items[0].id, Array.from(selectedIngredients))
  }
  return (
    <section className={cn('flex flex-1 items-center max-h-[90vh]', className)}>
      <PizzaImage src={imageUrl} alt={name} size={size} className=" m-8" />
      <div className="flex  flex-col justify-between w-[490px] h-full bg-[#f7f6f5] p-7">
        <div className="flex flex-col gap-2">
          <Title text={name} className="font-extrabold" size="md" />

          <p className="text-gray-400">{textDetails}</p>
          <GroupVariants
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
            items={availablePizzaSizes}
          />
          <GroupVariants
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
            items={pizzaTypes}
          />
          <div className="grid grid-cols-3 gap-3 max-h-[450px] overflow-y-auto py-2 pr-2 scrollbar">
            {ingredients.map((ingredient) => {
              return (
                <IngredientItem
                  key={ingredient.id}
                  imageUrl={ingredient.imageUrl}
                  name={ingredient.name}
                  price={ingredient.price}
                  active={selectedIngredients.has(ingredient.id)}
                  onClick={() => addIngredient(ingredient.id)}
                />
              )
            })}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 float-end"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </section>
  )
}
