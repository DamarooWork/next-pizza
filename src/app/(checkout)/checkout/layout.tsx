
import { Container } from '@/components/shared'
import { Header } from '@/components/shared/header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Pizza | Оформление заказа',
  description: 'Dodo pizza clone with Next by Damaroo',
}

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="bg-[#f4f1ee] min-h-screen">
      <Header hasSearch={false} hasCart={false} />
      <Container className="mt-10 pb-14 ">{children}</Container>
    </main>
  )
}
