import { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/shared/header'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})
export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'Dodo pizza clone with Next by Damaroo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head>
      <body className={nunito.className + 'min-h-screen'}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
