import { ProductItem, Ingredient } from '@prisma/client'
import { PizzaType, PizzaSize } from './constants'
/**
 * Функция для расчета общей стоимости пиццы
 * @example ```const totalPrice = CalcTotalPizzaPrice(items, ingredients,selectedIngredients, type, size)```
 * @param items - массив вариаций пиццы
 * @param ingredients - массив ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @param type - тип пиццы
 * @param size - размер пиццы
 *
 * @returns общая стоимость пиццы
 */
export function CalcTotalPizzaPrice(
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  type: PizzaType,
  size: PizzaSize
) {
  const pizzaPrice = items
    .find((item) => item.pizzaType === type && item.size === size)
    ?.price.toFixed(0)
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)
    .toFixed(0)
  return Number(pizzaPrice) + Number(totalIngredientsPrice)
}
