import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'eric-page',
  description: '반갑습니다!',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`inter.className h-screen notosansttf bg-global-color min-w-80 relative`}>{children}</body>
    </html>
  )
}
