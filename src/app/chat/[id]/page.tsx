import { philosophersData } from '@/lib/philosophers-data'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ChatInterface } from '@/components/ChatInterface'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ChatPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params
  const philosopher = philosophersData.find(p => p.id === id)
  
  if (!philosopher) {
    notFound()
  }

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
                  Chat met {philosopher.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {philosopher.period}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/philosopher/${philosopher.id}`}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
              >
                📚 Lees meer
              </Link>
              <Link
                href="/debate"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                ⚖️ Debat
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="container mx-auto px-4 py-6 h-[calc(100vh-88px)]">
        <div className="max-w-4xl mx-auto h-full">
          <ChatInterface 
            philosophers={[philosopher as any]} 
            mode="single" 
          />
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return philosophersData.map((philosopher) => ({
    id: philosopher.id,
  }))
}