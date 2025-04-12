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
  description: string
  onSubmit: (productItemId: number, ingredients: number[]) => void
  className?: string
}
export function ChoosePizzaForm({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  description,
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
    currentItemId,
  } = UsePizzaOptions(items, ingredients)

  const { totalPrice, textDetails } = GetPizzaDetails(
    items,
    ingredients,
    selectedIngredients,
    type,
    size
  )

  const handleSubmit = async () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }
  return (
    <section
      className={cn('flex flex-1 items-center justify-between', className)}
    >
      <PizzaImage src={imageUrl} alt={name} size={size} className=" m-8" />
      <div className="flex  flex-col justify-between w-[490px] h-full  bg-[#f7f6f5] p-7">
        <div className="flex flex-col gap-2">
          <Title text={name} className="font-extrabold" size="md" />
          <p className="text-gray-400">{description}</p>

          <p className="text-gray-400 mb-2">{textDetails}</p>
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
          <div className="grid grid-cols-3 gap-3 max-h-[380px] overflow-y-auto py-2 pr-2 scrollbar">
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
          loading={loading}
          onClick={handleSubmit}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 float-end"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </section>
  )
}
