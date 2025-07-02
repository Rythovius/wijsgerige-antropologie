'use client'

import { useState } from 'react'
import { philosophers } from '@/lib/philosophers'
import { PhilosopherCard } from '@/components/PhilosopherCard'
import { ChatInterface } from '@/components/ChatInterface'

export default function Home() {
  const [selectedPhilosophers, setSelectedPhilosophers] = useState<string[]>([])

  const togglePhilosopher = (philosopherId: string) => {
    setSelectedPhilosophers(prev => {
      if (prev.includes(philosopherId)) {
        return prev.filter(id => id !== philosopherId)
      } else if (prev.length < 3) {
        return [...prev, philosopherId]
      }
      return prev
    })
  }

  const selectedPhilosopherObjects = philosophers.filter(p => 
    selectedPhilosophers.includes(p.id)
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🧠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Filosofie Chat</h1>
                <p className="text-sm text-gray-600">Wat is de mens?</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {selectedPhilosophers.length > 0 && (
                <span>{selectedPhilosophers.length} filosof{selectedPhilosophers.length > 1 ? 'en' : ''} geselecteerd</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Philosopher Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 h-full">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Kies Filosofen (max 3)
              </h2>
              <div className="space-y-3 overflow-y-auto h-[calc(100%-60px)]">
                {philosophers.map((philosopher) => (
                  <PhilosopherCard
                    key={philosopher.id}
                    philosopher={philosopher}
                    isSelected={selectedPhilosophers.includes(philosopher.id)}
                    onSelect={() => togglePhilosopher(philosopher.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface selectedPhilosophers={selectedPhilosopherObjects} />
          </div>
        </div>
      </div>
    </div>
  )
}