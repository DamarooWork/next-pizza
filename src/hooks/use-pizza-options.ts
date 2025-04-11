import { Variant } from '@/components/shared/group-variants'
import { GetAvailablePizzaSizes, PizzaSize, PizzaType } from '@/lib'
import { ProductItem } from '@prisma/client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  availablePizzaSizes: Variant[]
  setSize: (size: PizzaSize) => void
  setType: (type: PizzaType) => void
  selectedIngredients: Set<number>
  addIngredient: (ingredient: number) => void
  currentItemId: number | undefined
}
export function UsePizzaOptions(
  items: ProductItem[],
  ingredients: Ingredient[]

) {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>()
  ) 
  const availablePizzaSizes = GetAvailablePizzaSizes(items, type)
  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id
  useEffect(() => {
    const isAvailableSize = availablePizzaSizes.find(
      (item) => Number(item.value) === size && !item.disabled
    )
    const availablePizzaSize = availablePizzaSizes.find(
      (pizzaSize) => !pizzaSize.disabled
    )
    if (!isAvailableSize && availablePizzaSize) {
      setSize(Number(availablePizzaSize.value) as PizzaSize)
    }
  }, [type])
  return {
    size,
    type,
    availablePizzaSizes,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    currentItemId,
  }
}
