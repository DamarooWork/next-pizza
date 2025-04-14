import { cn } from '@/lib/utils'
import {
  Container,
  SearchInput,
  CartButton,
  HeaderLogo,
  ProfileButton,
} from '@/components/shared'

import { Suspense } from 'react'

interface headerProps {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}
export function Header({
  className,
  hasSearch = true,
  hasCart = true,
}: headerProps) {
  return (
    <header className={cn('border-b-[1px]', className)}>
      <Container className="flex items-center justify-between py-8">
        {/*Левая часть */}
        <Suspense>
          <HeaderLogo />
        </Suspense>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <section className="flex items-center gap-3">
         <ProfileButton/>
          {hasCart && <CartButton />}
        </section>
      </Container>
    </header>
  )
}
