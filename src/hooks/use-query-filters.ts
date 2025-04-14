'use client'
import { Filters } from './use-filters'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useRef } from 'react'
import { useDebounce } from 'react-use'

export function useQueryFilters(filters: Filters) {
  const isMounted = useRef(false)
  const router = useRouter()

  useDebounce(
    () => {
      if (isMounted.current) {
        const params = {
          ...filters.prices,
          sizes: Array.from(filters.sizes),
          pizzaTypes: Array.from(filters.pizzaTypes),
          selectedIngredients: Array.from(filters.selectedIngredients),
        }
        const query = qs.stringify(params, { arrayFormat: 'comma' })
        router.push(`?${query}`, { scroll: false })
        localStorage.setItem('filters', JSON.stringify(params))
      }
      isMounted.current = true
    },
    250,
    [filters]
  )
  return
}
