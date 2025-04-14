'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import { CircleUser, User } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '../ui'
import { AuthModal } from '@/components/shared/modals'

interface Props {
  className?: string
}

export const ProfileButton: React.FC<Props> = ({ className }) => {
  const [openAuthModal, setOpenAuthModal] = React.useState(false)
  const { data: session, status } = useSession()
  const onClickSignIn = () => {
    setOpenAuthModal(true)
  }
  if (status === 'loading') {
    return <Skeleton className="w-28 h-10" />
  }
  return (
    <>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </>
  )
}
