import { cn } from '@/lib/utils'
import { Container, SearchInput, CartButton } from '@/components/shared'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { User } from 'lucide-react'
import Link from 'next/link'

interface headerProps {
  className?: string
}
export function Header({ className }: headerProps) {
  return (
    <header className={cn('border-b-[1px]', className)}>
      <Container className="flex items-center justify-between py-8">
        {/*Левая часть */}
        <Link href={'/'} className="flex items-center gap-4">
          <Image
            className="size-9 min-w-9 min-h-9"
            src={'/logo.png'}
            alt="logo"
            width={36}
            height={36}
          />
          <div>
            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
            <p className="text-sm text-gray-400 leading-3">
              вкусней уже некуда
            </p>
          </div>
        </Link>

        <div className=" mx-10 flex-1">
          <SearchInput />
        </div>

        {/* Правая часть */}
        <section className="flex items-center gap-3">
          <Button className="flex items-center gap-1 " variant={'outline'}>
            <User size={16} />
            Войти
          </Button>

          <CartButton />
        </section>
      </Container>
    </header>
  )
}
