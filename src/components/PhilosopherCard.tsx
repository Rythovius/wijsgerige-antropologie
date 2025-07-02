import { Philosopher } from '@/lib/philosophers'

interface PhilosopherCardProps {
  philosopher: Philosopher
  isSelected: boolean
  onSelect: () => void
}

export function PhilosopherCard({ philosopher, isSelected, onSelect }: PhilosopherCardProps) {
  return (
    <div 
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-200 bg-white hover:border-purple-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{philosopher.name}</h3>
          <p className="text-sm text-gray-500">{philosopher.period}</p>
        </div>
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          {philosopher.name.charAt(0)}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{philosopher.summary}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {philosopher.keyIdeas.slice(0, 2).map((idea, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
          >
            {idea}
          </span>
        ))}
      </div>
      
      <blockquote className="text-xs italic text-gray-500 border-l-2 border-purple-300 pl-2">
        "{philosopher.quote}"
      </blockquote>
    </div>
  )
}