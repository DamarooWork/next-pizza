import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'
import { useMemo, useState } from 'react'

export interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  sizes: string
  pizzaTypes: string
  selectedIngredients: string
}
export interface Filters {
  sizes: Set<string>
  pizzaTypes: Set<string>
  selectedIngredients: Set<string>
  prices: PriceProps
}
interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void
  setPizzaTypes: (value: string) => void
  setSizes: (value: string) => void
  setSelectedIngredients: (value: string) => void
}
export function useFilters(): ReturnProps {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >
  /*Фильтр ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('selectedIngredients')?.split(','))
  )
  const toggleSelectedIngredients = (id: string) => {
    toggleIngredients(id)
  }
  /*Фильтр размеров */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes')?.split(',') || [])
  )
  /*Фильтр типов пиццы */
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(',') || [])
  )
  /*Фильтр цен */
  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })
  const updatePrices = (name: keyof PriceProps, value: number) => {
    if (value > 1000) return
    setPrice((prev) => ({ ...prev, [name]: value }))
  }

  return useMemo(
    () => ({
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrices,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleSelectedIngredients,
    }),
    [sizes, pizzaTypes, selectedIngredients, prices]
  )
}
