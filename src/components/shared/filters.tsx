'use client'
import { useIngredients, useFilters, useQueryFilters } from '@/hooks'
import { Input } from '../ui'
import CheckboxFiltersGroup from './checkbox-filters-group'
import { RangeSlider } from './range-slider'
import { Title } from './title'

export function Filters() {
  const { ingredients, isLoading } = useIngredients()
  const filters = useFilters()
  useQueryFilters(filters)
  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }))
  const handleUpdatePrice = (values: number[]) => {
    filters.setPrices('priceFrom', values[0])
    filters.setPrices('priceTo', values[1])
  }

  return (
    <aside className="w-[250px]  self-start">
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}

      <CheckboxFiltersGroup
        title="Размеры"
        name="sizes"
        className="mb-5"
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
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
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
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
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={handleUpdatePrice}
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
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </aside>
  )
}
