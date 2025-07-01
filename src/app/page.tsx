import { PhilosopherCard } from '@/components/PhilosopherCard'
import { ThemeToggle } from '@/components/ThemeToggle'
import { philosophersData } from '@/lib/philosophers-data'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filosofie Chat
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wat is de mens?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="/debate"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                ⚖️ Filosofen Debat
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ontdek de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Filosofie</span> van de Mens
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Ga in gesprek met de grootste denkers uit de geschiedenis over de fundamentele vraag: 
            <strong className="text-purple-600 dark:text-purple-400"> "Wat is de mens?"</strong>
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Leer & Ontdek</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Verdiep je in de rijke filosofische tradities en ontdek verschillende visies op de menselijke natuur.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Chat & Vraag</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Stel directe vragen aan filosofen en krijg antwoorden in hun authentieke stijl en denkwijze.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="text-3xl mb-3">⚖️</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Debat & Vergelijk</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Laat filosofen met elkaar debatteren en ontdek de verschillen in hun denkwijzen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophers Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ontmoet de Filosofen
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Klik op een filosoof om meer te leren of direct een gesprek te beginnen
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {philosophersData.map((philosopher) => (
            <PhilosopherCard 
              key={philosopher.id} 
              philosopher={philosopher as any} 
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💜 Gemaakt voor VWO leerlingen • Powered by AI & Filosofie
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            Een educatieve tool om filosofie toegankelijk te maken
          </p>
        </div>
      </footer>
    </div>
  )
}