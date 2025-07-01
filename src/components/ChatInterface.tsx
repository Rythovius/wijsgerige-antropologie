'use client'

import { useState, useRef, useEffect } from 'react'
import { Philosopher } from '@/lib/supabase'
import MarkdownRenderer from './MarkdownRenderer'
import { v4 as uuidv4 } from 'uuid'

interface Message {
  id: string
  speaker: string
  message: string
  timestamp: string
}

interface ChatInterfaceProps {
  philosophers: Philosopher[]
  mode: 'single' | 'debate'
}

export function ChatInterface({ philosophers, mode }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPhilosophers, setSelectedPhilosophers] = useState<string[]>(
    mode === 'single' ? [philosophers[0]?.id] : []
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getPhilosopherPrompt = (philosopher: Philosopher, userMessage: string, conversationHistory: Message[]) => {
    const historyContext = conversationHistory.length > 0 
      ? `\n\nVorige gesprek:\n${conversationHistory.slice(-6).map(m => `${m.speaker}: ${m.message}`).join('\n')}`
      : ''

    return `Je bent ${philosopher.name} (${philosopher.period}). Reageer op de volgende vraag of opmerking in jouw filosofische stijl en vanuit jouw perspectief.

Belangrijke richtlijnen:
- Antwoord als ${philosopher.name} zelf, gebruik "ik" 
- Houd je antwoord begrijpelijk voor 4 VWO leerlingen
- Maximaal 150 woorden
- Gebruik jouw kernconcepten: ${philosopher.key_concepts.join(', ')}
- Wees authentiek aan jouw filosofische visie
- Maak het interessant en toegankelijk

${historyContext}

Leerling vraagt: "${userMessage}"

Antwoord als ${philosopher.name}:`
  }

  const getDebatePrompt = (philosophers: Philosopher[], userMessage: string, conversationHistory: Message[]) => {
    const philosopherNames = philosophers.map(p => p.name).join(' en ')
    const philosopherDescriptions = philosophers.map(p => 
      `${p.name} (${p.period}): ${p.short_summary} Kernconcepten: ${p.key_concepts.join(', ')}`
    ).join('\n\n')

    const historyContext = conversationHistory.length > 0 
      ? `\n\nVorige gesprek:\n${conversationHistory.slice(-8).map(m => `${m.speaker}: ${m.message}`).join('\n')}`
      : ''

    return `Je faciliteert een debat tussen ${philosopherNames} over de vraag "Wat is de mens?". 

Filosofen in het debat:
${philosopherDescriptions}

Richtlijnen:
- Laat elke filosoof reageren in hun eigen stijl en vanuit hun perspectief
- Gebruik "ik" wanneer een filosoof spreekt
- Houd antwoorden begrijpelijk voor 4 VWO leerlingen
- Maximaal 100 woorden per filosoof
- Laat ze reageren op elkaars argumenten
- Maak het levendig en interessant

Format je antwoord als:
**${philosophers[0].name}:** [antwoord]

**${philosophers[1].name}:** [antwoord]

${historyContext}

Onderwerp/vraag: "${userMessage}"

Laat het debat beginnen:`
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || selectedPhilosophers.length === 0) return

    const userMessage: Message = {
      id: uuidv4(),
      speaker: 'Leerling',
      message: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const selectedPhils = philosophers.filter(p => selectedPhilosophers.includes(p.id))
      
      let prompt: string
      if (mode === 'single') {
        prompt = getPhilosopherPrompt(selectedPhils[0], userMessage.message, messages)
      } else {
        prompt = getDebatePrompt(selectedPhils, userMessage.message, messages)
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          aiModel: 'smart'
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      
      const aiMessage: Message = {
        id: uuidv4(),
        speaker: mode === 'single' ? selectedPhils[0].name : 'Debat',
        message: data.response,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: uuidv4(),
        speaker: 'Systeem',
        message: 'Sorry, er ging iets mis. Probeer het opnieuw.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const exportToPDF = async () => {
    if (messages.length === 0) return

    try {
      const jsPDF = (await import('jspdf')).default
      const doc = new jsPDF()
      
      // Title
      doc.setFontSize(20)
      doc.text('Filosofie Gesprek', 20, 20)
      
      // Participants
      doc.setFontSize(12)
      const participants = mode === 'single' 
        ? philosophers.find(p => selectedPhilosophers.includes(p.id))?.name || ''
        : philosophers.filter(p => selectedPhilosophers.includes(p.id)).map(p => p.name).join(' & ')
      
      doc.text(`Deelnemers: ${participants}`, 20, 35)
      doc.text(`Datum: ${new Date().toLocaleDateString('nl-NL')}`, 20, 45)
      
      // Messages
      let yPosition = 60
      doc.setFontSize(10)
      
      messages.forEach((message) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        
        // Speaker
        doc.setFont(undefined, 'bold')
        doc.text(`${message.speaker}:`, 20, yPosition)
        yPosition += 7
        
        // Message content
        doc.setFont(undefined, 'normal')
        const lines = doc.splitTextToSize(message.message, 170)
        doc.text(lines, 20, yPosition)
        yPosition += lines.length * 5 + 10
      })
      
      doc.save(`filosofie-gesprek-${Date.now()}.pdf`)
    } catch (error) {
      console.error('PDF export error:', error)
      alert('Er ging iets mis bij het exporteren naar PDF')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {mode === 'single' ? 'Filosofie Chat' : 'Filosofen Debat'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mode === 'single' 
                ? 'Stel vragen aan een filosoof'
                : 'Laat filosofen met elkaar debatteren'
              }
            </p>
          </div>
          <button
            onClick={exportToPDF}
            disabled={messages.length === 0}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white text-sm rounded-lg transition-colors"
          >
            📄 Export PDF
          </button>
        </div>
        
        {/* Philosopher Selection */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {mode === 'single' ? 'Kies een filosoof:' : 'Kies filosofen voor het debat (max 3):'}
          </label>
          <div className="flex flex-wrap gap-2">
            {philosophers.map((philosopher) => (
              <button
                key={philosopher.id}
                onClick={() => {
                  if (mode === 'single') {
                    setSelectedPhilosophers([philosopher.id])
                  } else {
                    setSelectedPhilosophers(prev => {
                      if (prev.includes(philosopher.id)) {
                        return prev.filter(id => id !== philosopher.id)
                      } else if (prev.length < 3) {
                        return [...prev, philosopher.id]
                      }
                      return prev
                    })
                  }
                }}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  selectedPhilosophers.includes(philosopher.id)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {philosopher.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <div className="text-4xl mb-4">🤔</div>
            <p>Begin een gesprek met {mode === 'single' ? 'een filosoof' : 'de filosofen'}!</p>
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
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">
                  {message.speaker === 'Leerling' ? '🎓' : message.speaker === 'Debat' ? '⚖️' : '🧠'} {message.speaker}
                </span>
                <span className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString('nl-NL', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="text-sm">
                {message.speaker === 'Leerling' ? (
                  message.message
                ) : (
                  <MarkdownRenderer content={message.message} />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Filosoof denkt na...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              selectedPhilosophers.length === 0 
                ? 'Selecteer eerst een filosoof...'
                : mode === 'single'
                ? 'Stel een vraag aan de filosoof...'
                : 'Start een debat tussen de filosofen...'
            }
            disabled={selectedPhilosophers.length === 0 || isLoading}
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || selectedPhilosophers.length === 0 || isLoading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg transition-colors self-end"
          >
            {isLoading ? '⏳' : '🚀'}
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Tip: Druk Enter om te verzenden, Shift+Enter voor een nieuwe regel
        </p>
      </div>
    </div>
  )
}