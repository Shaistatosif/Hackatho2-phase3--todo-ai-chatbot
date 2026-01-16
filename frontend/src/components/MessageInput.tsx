'use client'

import { useState, useCallback, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'

interface MessageInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
}: MessageInputProps) {
  const [input, setInput] = useState('')

  const handleSend = useCallback(() => {
    const trimmed = input.trim()
    if (trimmed && !disabled) {
      onSend(trimmed)
      setInput('')
    }
  }, [input, disabled, onSend])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    [handleSend]
  )

  return (
    <div className="bg-charcoal-light/50 backdrop-blur-xl border border-violet-soft/20 rounded-2xl p-2 flex items-end gap-2 shadow-lg shadow-violet-soft/5">
      <textarea
        id="message-input"
        name="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-transparent px-4 py-3 text-white placeholder-gray-500
                   focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                   max-h-32 overflow-y-auto text-sm"
        style={{ minHeight: '48px' }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="p-3 bg-gradient-to-r from-violet-soft via-orange-accent to-cyan-accent text-white rounded-xl
                   hover:shadow-lg hover:shadow-orange-accent/40 hover:scale-105
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   transition-all duration-300 group"
      >
        <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  )
}
