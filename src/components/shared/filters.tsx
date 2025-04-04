import { Input } from '../ui'
import CheckboxFiltersGroup from './checkbox-filters-group'
import { FilterCheckbox } from './filter-checkbox'
import { RangeSlider } from './range-slider'
import { Title } from './title'

interface filtersProps {}
export function Filters({}: filtersProps) {
  return (
    <aside className="w-[250px]">
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Вверхние чекбоксы */}
      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Можно собирать" value="1" />
        <FilterCheckbox text="Новинки" value="2" />
      </div>

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            // value={String(filters.prices.priceFrom)}
            // onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            // value={String(filters.prices.priceTo)}
            // onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          // value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
          // onValueChange={updatePrices}
        />
        <CheckboxFiltersGroup
          title="Ингредиенты"
          name="ingredients"
          className="mt-10"
          limit={5}
          defaultItems={[
            { text: 'Томаты', value: '1' },
            { text: 'Сырный соус', value: '2' },
            { text: 'Томаты3', value: '3' },
            { text: 'Томаты4', value: '4' },
          ]}
          items={[
            { text: 'Томаты', value: '1' },
            { text: 'Сырный соус', value: '2' },
            { text: 'Томаты3', value: '3' },
            { text: 'Томаты4', value: '4' },
            { text: 'Томаты5', value: '5' },
            { text: 'Томаты6', value: '6' },
            { text: 'Томаты4', value: '4' },
            { text: 'Томаты5', value: '5' },
            { text: 'Томаты6', value: '6' },
          ]}
          // loading={loading}
          // onClickCheckbox={filters.setSelectedIngredients}
          // selected={filters.selectedIngredients}
        />
      </div>
    </aside>
  )
}
