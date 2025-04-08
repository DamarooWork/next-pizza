import { ProductItem } from '@prisma/client'
import { Ingredient } from '@prisma/client'
import { PizzaType, PizzaSize, mapPizzaType, CalcTotalPizzaPrice } from '@/lib'

export function GetPizzaDetails(
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  type: PizzaType,
  size: PizzaSize
) {
  const totalPrice = CalcTotalPizzaPrice(
    items,
    ingredients,
    selectedIngredients,
    type,
    size
  )
  const textDetails = `${size} см, ${mapPizzaType[type].toLowerCase()} тесто`
  return {
    totalPrice,
    textDetails,
  }
}
