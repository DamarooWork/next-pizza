import { cn } from '@/lib/utils'
import { Container, SearchInput } from '@/components/shared'
import Image from 'next/image'
import { Button, Input } from '@/components/ui'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
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
          <div>
            <Button className="group relative cursor-pointer">
              <b>520 P</b>
              <span className="h-full w-[1px] bg-white/30 mx-3"></span>
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart size={16} className="relative" strokeWidth={2} />
                <b>5</b>
              </div>
              <ArrowRight
                size={20}
                className="absolute right-5 transition-all duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
              />
            </Button>
          </div>
        </section>
      </Container>
    </header>
  )
}
