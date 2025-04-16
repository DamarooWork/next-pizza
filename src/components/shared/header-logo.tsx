'use client'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
interface Props {
  className?: string
}
export function HeaderLogo({ className }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    let toastMessage = ''
    if (searchParams.has('paid')) {
      toastMessage =
        'Ваш заказ успешно оформлен. Данные об заказе отправлены вам на почту.'
    }
    if (searchParams.has('verified')) {
      toastMessage =
        'Ваша почта успешно подтверждена! Теперь вы можете зайти в свой профиль! 🎉'
    }
    if (toastMessage) {
      setTimeout(() => {
        toast.success(toastMessage, {
          duration: 5000,
        })
        router.push('/')
      }, 300)
    }
  }, [])
  return (
    <Link href={'/'} className={cn('flex items-center gap-4', className)}>
      <Image
        className="size-9 min-w-9 min-h-9"
        src={'/logo.png'}
        alt="logo"
        width={36}
        height={36}
      />
      <div>
        <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
        <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
      </div>
    </Link>
  )
}
