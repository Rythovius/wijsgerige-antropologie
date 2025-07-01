'use client'

import { Philosopher } from '@/lib/supabase'
import Link from 'next/link'

interface PhilosopherCardProps {
  philosopher: Philosopher
}

export function PhilosopherCard({ philosopher }: PhilosopherCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {philosopher.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {philosopher.period}
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {philosopher.name.charAt(0)}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {philosopher.short_summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {philosopher.key_concepts.slice(0, 3).map((concept, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full"
            >
              {concept}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Link
            href={`/philosopher/${philosopher.id}`}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            📚 Lees meer
          </Link>
          <Link
            href={`/chat/${philosopher.id}`}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center"
          >
            💬 Chat
          </Link>
        </div>
      </div>
    </div>
  )
}