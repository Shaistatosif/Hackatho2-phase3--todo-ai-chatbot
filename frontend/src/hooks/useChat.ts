/**
 * useChat hook for API communication (T066)
 */

import { useState, useCallback, useEffect } from 'react'
import { api, ChatResponse, Message, Conversation } from '@/lib/api'
import { getSession } from '@/lib/auth'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
}

export interface UseChatReturn {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  conversationId: number | null
  sendMessage: (content: string) => Promise<void>
  loadConversation: (id: number) => Promise<void>
  clearMessages: () => void
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<number | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    const session = getSession()
    if (!session.user) {
      setError('Please log in to send messages')
      return
    }

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    const loadingMessage: ChatMessage = {
      id: `loading_${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.sendMessage(
        session.user.id,
        content,
        conversationId ?? undefined
      )

      setConversationId(response.conversation_id)

      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      }

      setMessages((prev) =>
        prev.filter((m) => !m.isLoading).concat(assistantMessage)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
      setMessages((prev) => prev.filter((m) => !m.isLoading))
    } finally {
      setIsLoading(false)
    }
  }, [conversationId])

  const loadConversation = useCallback(async (id: number) => {
    const session = getSession()
    if (!session.user) {
      setError('Please log in to view conversations')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const conversation = await api.getConversation(session.user.id, id)
      setConversationId(conversation.id)

      if (conversation.messages) {
        const chatMessages: ChatMessage[] = conversation.messages.map((m) => ({
          id: `msg_${m.id}`,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.created_at),
        }))
        setMessages(chatMessages)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load conversation')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setConversationId(null)
    setError(null)
  }, [])

  return {
    messages,
    isLoading,
    error,
    conversationId,
    sendMessage,
    loadConversation,
    clearMessages,
  }
}
