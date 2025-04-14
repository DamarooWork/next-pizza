'use client'
import { Filters } from './use-filters'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useDebounce } from 'react-use'

export function useQueryFilters(filters: Filters) {
  const router = useRouter()

  useDebounce(
    () => {
      const params = {
        ...filters.prices,
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
        selectedIngredients: Array.from(filters.selectedIngredients),
      }
      const query = qs.stringify(params, { arrayFormat: 'comma' })
      router.push(`?${query}`, { scroll: false })
      localStorage.setItem('filters', JSON.stringify(params))
    },
    250,
    [filters]
  )
  return
}
