import { cn } from '@/lib/utils'
import {
  Container,
  SearchInput,
  CartButton,
  HeaderLogo,
} from '@/components/shared'
import { Button } from '@/components/ui'
import { User } from 'lucide-react'
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
          <Button className="flex items-center gap-1 " variant={'outline'}>
            <User size={16} />
            Войти
          </Button>
          {hasCart && <CartButton />}
        </section>
      </Container>
    </header>
  )
}
