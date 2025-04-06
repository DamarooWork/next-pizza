import { cn } from '@/lib/utils'
import React from 'react'
import { Container } from './container'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
// import { Category } from '@prisma/client';

interface Props {
  categories: []
  className?: string
}
const cats = [
  { id: 1, name: 'Пиццы' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
]
export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories items={cats} />
        <SortPopup />
      </Container>
    </div>
  )
}
