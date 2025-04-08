const mapPizzaSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const

const mapPizzaType = {
  1: 'Традиционное',
  2: 'Тонкое',
} as const

const pizzaSizes = Object.entries(mapPizzaSize).map(([key, value]) => ({
  name: value,
  value: key,
}))

const pizzaTypes = Object.entries(mapPizzaType).map(([key, value]) => ({
  name: value,
  value: key,
}))
export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType

export { pizzaSizes, pizzaTypes, mapPizzaSize, mapPizzaType }
