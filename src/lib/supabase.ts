import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Philosopher = {
  id: string
  name: string
  period: string
  short_summary: string
  detailed_text: string
  key_concepts: string[]
  famous_quotes: string[]
  image_url?: string
  created_at: string
}

export type Conversation = {
  id: string
  title: string
  participants: string[] // philosopher IDs
  messages: ConversationMessage[]
  created_at: string
  updated_at: string
}

export type ConversationMessage = {
  id: string
  speaker: string // philosopher name or 'user'
  message: string
  timestamp: string
}