import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Filosofie Chat - Wat is de mens?',
  description: 'Chat met beroemde filosofen over de vraag "Wat is de mens?" - Een educatieve app voor VWO leerlingen',
  manifest: '/manifest.json',
  themeColor: '#7c3aed',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Filosofie Chat'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors" suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}