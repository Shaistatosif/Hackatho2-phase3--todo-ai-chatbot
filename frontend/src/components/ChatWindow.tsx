'use client'

import { useChat } from '@/hooks/useChat'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { AlertCircle } from 'lucide-react'

interface ChatWindowProps {
  userName?: string
}

export function ChatWindow({ userName }: ChatWindowProps) {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat()

  return (
    <div className="flex flex-col h-full">
      {/* Error Banner */}
      {error && (
        <div className="mx-4 mt-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} userName={userName} onSuggestionClick={sendMessage} />

      {/* Input */}
      <div className="p-4">
        <MessageInput
          onSend={sendMessage}
          disabled={isLoading}
          placeholder={isLoading ? 'Thinking...' : 'Ask me to add, view, or manage your tasks...'}
        />
      </div>
    </div>
  )
}
