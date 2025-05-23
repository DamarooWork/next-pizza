import { PizzaSize, PizzaType, mapPizzaType } from '@/lib/constants/pizza';
import { CartStateItem } from '@/lib/get-cart-details';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaSize?: PizzaSize,
  pizzaType?: PizzaType,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};