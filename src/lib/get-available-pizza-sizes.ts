import { ProductItem } from '@prisma/client'
import { pizzaSizes, PizzaType } from './constants'
import { Variant } from '@/components/shared/group-variants'

export function GetAvailablePizzaSizes(
  items: ProductItem[],
  type: PizzaType
): Variant[] {
  const availablePizzaSizes = pizzaSizes.map((pizzaSize) => {
    const item = items.find(
      (item) => item.pizzaType === type && item.size === Number(pizzaSize.value)
    )
    return {
      ...pizzaSize,
      disabled: !item,
    }
  })
  return availablePizzaSizes
}
