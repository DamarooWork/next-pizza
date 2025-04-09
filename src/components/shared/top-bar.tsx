import { cn } from '@/lib/utils'
import React from 'react'
import { Container } from './container'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
import { CategoryWithProducts } from '@/app/(root)/page'

interface Props {
  categories: CategoryWithProducts[]
  className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
