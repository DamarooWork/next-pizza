import { Metadata } from 'next'
import { Header } from '@/components/shared/header'

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'Dodo pizza clone with Next by Damaroo',
}

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
        {modal}
      </main>
    </>
  )
}
