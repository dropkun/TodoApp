import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Headers from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Todo application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body>
        <div className="flex">
          <div className="flex-auto w-48 h-screen">
            <Headers />
          </div>
          <div className="flex-auto w-4/5">
            <main className='mx-32'>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
