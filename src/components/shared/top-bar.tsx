'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import { Container } from './container'
import { Categories } from './categories'
import { SortPopup } from './sort-popup'
import { CategoryWithProducts } from '@/lib/find-pizzas'
import { useWindowScroll } from 'react-use'
import { CartButton } from './cart-button'

interface Props {
  categories: CategoryWithProducts[]
  className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const { y } = useWindowScroll()
  return (
    <div
      className={cn(
        'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories categories={categories} />
        <div className="flex gap-2 items-center">
          <SortPopup />
          <CartButton
            className={`h-13 ${
              y > 108 ? '' : 'opacity-0 scale-0 w-0 p-0 -ml-2 text-primary/0'
            }`}
          />
        </div>
      </Container>
    </div>
  )
}
