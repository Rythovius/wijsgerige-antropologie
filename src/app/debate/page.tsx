import { philosophersData } from '@/lib/philosophers-data'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ChatInterface } from '@/components/ChatInterface'
import Link from 'next/link'

export default function DebatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link 
                href="/"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
              >
                <span className="text-white font-bold">←</span>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filosofen Debat
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Laat filosofen met elkaar discussiëren
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Debate Interface */}
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-88px)]">
        <div className="max-w-5xl mx-auto h-full">
          <ChatInterface 
            philosophers={philosophersData as any} 
            mode="debate" 
          />
        </div>
      </main>
    </div>
  )
}