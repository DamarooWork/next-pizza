'use client'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import NextTopLoader from 'nextjs-toploader'
export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
      <NextTopLoader />
    </>
  )
}
