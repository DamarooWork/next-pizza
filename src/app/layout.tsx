
import { Nunito } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/shared'
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={nunito.className + ' min-h-screen relative'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
