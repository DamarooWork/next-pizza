'use client'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import Link from 'next/link'

interface categoriesProps {
  items: {
    id: number
    name: string
  }[]
}

export function Categories({ items }: categoriesProps) {
  const categoryActiveId = useCategoryStore((state) => state.activeId)
  return (
    <section className="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
      {items.map((item) => (
        <Link
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer',
            categoryActiveId === item.id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`#${item.name}`}
          key={item.id}
        >
          <button className="cursor-pointer">{item.name}</button>
        </Link>
      ))}
    </section>
  )
}
