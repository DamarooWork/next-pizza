import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next Pizza | Dashboard',
  description: 'Dodo pizza clone with Next by Damaroo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
