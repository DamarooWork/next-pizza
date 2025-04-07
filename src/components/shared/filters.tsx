'use client'

import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import { Input } from '../ui'
import CheckboxFiltersGroup from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { Title } from './title'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

interface QueryFilters extends PriceProps {
  sizes: string
  pizzaTypes: string
  selectedIngredients: string
}
export function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >

  const {
    ingredients,
    isLoading,
    selectedIngredients,
    toggleSelectedIngredients,
  } = useFilterIngredients()

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes')?.split(',') || [])
  )
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(',') || [])
  )

  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })
  const updatePrice = (name: keyof PriceProps, value: number) => {
    if (value > 1000) return
    setPrice({ ...prices, [name]: value })
  }
  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }))

  useEffect(() => {
    const filters = {
      ...prices,
      sizes: Array.from(sizes),
      pizzaTypes: Array.from(pizzaTypes),
      selectedIngredients: Array.from(selectedIngredients),
    }
    const query = qs.stringify(filters, { arrayFormat: 'comma' })
    router.push(`?${query}`, { scroll: false })
    localStorage.setItem('filters', JSON.stringify(filters))
  }, [prices, sizes, pizzaTypes, selectedIngredients])
  return (
    <aside className="w-[250px]  self-start">
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />
      <CheckboxFiltersGroup
        title="Тип теста"
        name="pizzaTypes"
        className="mb-5"
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(prices.priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(prices.priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => {
            setPrice({ priceFrom, priceTo })
          }}
        />
      </div>
      <CheckboxFiltersGroup
        title="Ингредиенты"
        name="ingredients"
        className="mt-4"
        limit={5}
        defaultItems={items.slice(0, 5)}
        items={items}
        loading={isLoading}
        onClickCheckbox={toggleSelectedIngredients}
        selected={selectedIngredients}
      />
    </aside>
  )
}
