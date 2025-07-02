'use client'

import { useState } from 'react'
import { philosophers } from '@/lib/philosophers'
import { PhilosopherCard } from '@/components/PhilosopherCard'
import { ChatInterface } from '@/components/ChatInterface'

export function PhilosopherSelection() {
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
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
      {/* Philosopher Selection */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-lg p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Kies Filosofen (max 3)
            </h2>
            {selectedPhilosophers.length > 0 && (
              <span className="text-sm text-purple-600 font-medium">
                {selectedPhilosophers.length} geselecteerd
              </span>
            )}
          </div>
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
  )
}