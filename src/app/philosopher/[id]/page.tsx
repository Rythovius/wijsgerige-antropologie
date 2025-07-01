import { philosophersData } from '@/lib/philosophers-data'
import { ThemeToggle } from '@/components/ThemeToggle'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PhilosopherPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PhilosopherPage({ params }: PhilosopherPageProps) {
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
                  {philosopher.name}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {philosopher.period}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href={`/chat/${philosopher.id}`}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                💬 Chat met {philosopher.name}
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl flex-shrink-0">
                {philosopher.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {philosopher.name}
                </h2>
                <p className="text-lg text-purple-600 dark:text-purple-400 font-medium mb-4">
                  {philosopher.period}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {philosopher.short_summary}
                </p>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                🔑
              </span>
              Kernconcepten
            </h3>
            <div className="flex flex-wrap gap-3">
              {philosopher.key_concepts.map((concept, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full font-medium"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          {/* Famous Quotes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                💭
              </span>
              Beroemde Uitspraken
            </h3>
            <div className="space-y-4">
              {philosopher.famous_quotes.map((quote, index) => (
                <blockquote
                  key={index}
                  className="border-l-4 border-purple-500 pl-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-r-lg"
                >
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{quote}"
                  </p>
                  <cite className="text-sm text-gray-500 dark:text-gray-400 not-italic">
                    — {philosopher.name}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>

          {/* Detailed Text */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownRenderer content={philosopher.detailed_text} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 justify-center">
            <Link
              href={`/chat/${philosopher.id}`}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              💬 Start een gesprek met {philosopher.name}
            </Link>
            <Link
              href="/debate"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              ⚖️ Voeg toe aan debat
            </Link>
          </div>
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