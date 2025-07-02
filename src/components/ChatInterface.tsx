'use client'

import { useState, useRef, useEffect } from 'react'
import { Philosopher } from '@/lib/philosophers'

interface Message {
  id: string
  speaker: string
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  selectedPhilosophers: Philosopher[]
}

export function ChatInterface({ selectedPhilosophers }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const createPrompt = (userMessage: string) => {
    if (selectedPhilosophers.length === 1) {
      const philosopher = selectedPhilosophers[0]
      return `Je bent ${philosopher.name} (${philosopher.period}). Reageer op de volgende vraag vanuit jouw filosofische perspectief.

Belangrijke richtlijnen:
- Antwoord als ${philosopher.name} zelf, gebruik "ik"
- Houd je antwoord begrijpelijk voor VWO leerlingen
- Maximaal 150 woorden
- Gebruik jouw kernconcepten: ${philosopher.keyIdeas.join(', ')}
- Wees authentiek aan jouw filosofische visie

Leerling vraagt: "${userMessage}"

Antwoord als ${philosopher.name}:`
    } else {
      const philosopherNames = selectedPhilosophers.map(p => p.name).join(', ')
      const philosopherDescriptions = selectedPhilosophers.map(p => 
        `${p.name} (${p.period}): ${p.summary} Kernconcepten: ${p.keyIdeas.join(', ')}`
      ).join('\n\n')

      return `Laat de volgende filosofen elk reageren op de vraag vanuit hun eigen perspectief:

${philosopherDescriptions}

Richtlijnen:
- Laat elke filosoof reageren in hun eigen stijl
- Gebruik "ik" wanneer een filosoof spreekt
- Houd antwoorden begrijpelijk voor VWO leerlingen
- Maximaal 100 woorden per filosoof
- Maak het interessant en toegankelijk

Format je antwoord als:
**${selectedPhilosophers[0].name}:** [antwoord]

**${selectedPhilosophers[1].name}:** [antwoord]

${selectedPhilosophers.length > 2 ? `**${selectedPhilosophers[2].name}:** [antwoord]` : ''}

Leerling vraagt: "${userMessage}"`
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || selectedPhilosophers.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      speaker: 'Leerling',
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const prompt = createPrompt(userMessage.content)
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        speaker: selectedPhilosophers.length === 1 ? selectedPhilosophers[0].name : 'Filosofen',
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        speaker: 'Systeem',
        content: 'Sorry, er ging iets mis. Probeer het opnieuw.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting for philosopher responses
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\n/g, '<br />')
  }

  if (selectedPhilosophers.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">🤔</div>
          <p>Selecteer eerst een of meer filosofen om mee te chatten</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-gray-900">
          Chat met {selectedPhilosophers.map(p => p.name).join(', ')}
        </h2>
        <p className="text-sm text-gray-500">
          Stel vragen over "Wat is de mens?" en andere filosofische onderwerpen
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-4">💭</div>
            <p>Begin een gesprek met de filosofen!</p>
            <p className="text-sm mt-2">
              Stel vragen over de mens, het leven, of filosofische concepten.
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.speaker === 'Leerling' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.speaker === 'Leerling'
                  ? 'bg-purple-600 text-white'
                  : message.speaker === 'Systeem'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">
                  {message.speaker === 'Leerling' ? '🎓' : message.speaker === 'Filosofen' ? '🧠' : '🤖'} {message.speaker}
                </span>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('nl-NL', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div 
                className="text-sm prose"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600">Filosofen denken na...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Stel een vraag aan de filosofen..."
            disabled={isLoading}
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors self-end"
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Tip: Druk Enter om te verzenden, Shift+Enter voor een nieuwe regel
        </p>
      </div>
    </div>
  )
}