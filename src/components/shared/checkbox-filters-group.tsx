'use client'
import { useState } from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input, Skeleton } from '../ui'

type Item = FilterCheckboxProps
interface Props {
  title: string
  items: Item[]
  defaultItems?: Item[]
  limit?: number
  searchInputPlaceholder?: string
  onClickCheckbox?: (id: string) => void
  defaultValue?: string[]
  className?: string
  name?: string
  loading?: boolean
  selected?: Set<string>
}
export default function CheckboxFiltersGroup({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  defaultValue,
  className,
  loading,
  selected,
  name,
}: Props) {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  if (loading) {
    return (
      <section className={className}>
        <p className="font-bold mb-3">{title}</p>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-full mt-4 rounded-xl" />
        ))}
        <Skeleton className="h-6 w-28 mt-4 rounded-xl" />
      </section>
    )
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
      )
    : (defaultItems || items).slice(0, limit)

  return (
    <section className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 pb-4 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            name={name}
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className={`text-primary  cursor-pointer mt-3`}
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </section>
  )
}
