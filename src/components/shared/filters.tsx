import { Input } from '../ui'
import CheckboxFiltersGroup from './checkbox-filters-group'
import { FilterCheckbox } from './filter-checkbox'
import { RangeSlider } from './range-slider'
import { Title } from './title'

interface filtersProps {}
export function Filters({}: filtersProps) {
  return (
    <aside className="w-[250px] sticky top-33 self-start">
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
            { text: 'Цыпленок', value: '1' },
            { text: 'Сырный соус', value: '2' },
            { text: 'Моцарелла', value: '3' },
            { text: 'Сыры чеддер и пармезан', value: '4' },
          ]}
          items={[
            { text: 'Цыпленок', value: '1' },
            { text: 'Сырный соус', value: '2' },
            { text: 'Моцарелла', value: '3' },
            { text: 'Сыры чеддер и пармезан', value: '4' },
            { text: 'Курица', value: '5' },
            { text: 'Колбаски', value: '6' },
            { text: 'Соус альфредо', value: '4' },
            { text: 'Чеснок', value: '5' },
            { text: 'Томаты', value: '6' },
          ]}
          // loading={loading}
          // onClickCheckbox={filters.setSelectedIngredients}
          // selected={filters.selectedIngredients}
        />
      </div>
    </aside>
  )
}
