'use client'
import { CategoryWithProducts } from '@/lib/find-pizzas'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import Link from 'next/link'

interface CategoriesProps {
  categories: CategoryWithProducts[]
}

export function Categories({ categories }: CategoriesProps) {
  const categoryActiveId = useCategoryStore((state) => state.activeId)
  return (
    <section className="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
      {categories.length > 0 &&
        categories.map((category) => (
          <Link
            className={cn(
              'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
            categoryActiveId === category.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`#${category.name}`}
          key={category.id}
        >
          <button className="cursor-pointer">{category.name}</button>
        </Link>
      ))}
    </section>
  )
}
