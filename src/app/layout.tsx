import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Filosofie Chat - Wat is de mens?',
  description: 'Chat met beroemde filosofen over de vraag "Wat is de mens?"',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}