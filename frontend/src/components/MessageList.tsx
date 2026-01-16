'use client'

import { useEffect, useRef } from 'react'
import { ChatMessage } from '@/hooks/useChat'
import { Sparkles, MessageCircle, Zap } from 'lucide-react'

interface MessageListProps {
  messages: ChatMessage[]
  userName?: string
  onSuggestionClick?: (text: string) => void
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      <div className="w-2 h-2 bg-violet-soft rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-violet-soft rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-cyan-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  )
}

function BotAvatar() {
  return (
    <div className="w-10 h-10 rounded-full flex-shrink-0 shadow-lg shadow-violet-soft/40 ring-2 ring-violet-soft/30 bg-gradient-to-br from-violet-soft via-violet-dark to-cyan-accent p-0.5">
      <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-8 h-8">
          <defs>
            <linearGradient id="msgBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C7CFF" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <filter id="msgBotGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="35" fill="none" stroke="url(#msgBotGrad)" strokeWidth="2" filter="url(#msgBotGlow)" />
          <ellipse cx="38" cy="45" rx="6" ry="8" fill="url(#msgBotGrad)" filter="url(#msgBotGlow)">
            <animate attributeName="ry" values="8;1;8" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="62" cy="45" rx="6" ry="8" fill="url(#msgBotGrad)" filter="url(#msgBotGlow)">
            <animate attributeName="ry" values="8;1;8" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <path d="M 35 60 Q 50 75 65 60" fill="none" stroke="url(#msgBotGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#msgBotGlow)" />
        </svg>
      </div>
    </div>
  )
}

function UserAvatar({ name }: { name?: string }) {
  const initial = name?.charAt(0).toUpperCase() || 'U'
  return (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-soft via-orange-accent to-cyan-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-accent/30">
      <span className="text-sm font-bold text-charcoal">{initial}</span>
    </div>
  )
}

function MessageBubble({ message, userName }: { message: ChatMessage; userName?: string }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex gap-3 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      {isUser ? <UserAvatar name={userName} /> : <BotAvatar />}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl backdrop-blur-sm ${
            isUser
              ? 'bg-gradient-to-r from-violet-soft via-orange-accent to-cyan-accent text-white rounded-tr-md shadow-lg shadow-orange-accent/20'
              : 'bg-charcoal-light/70 border border-violet-soft/20 text-gray-100 rounded-tl-md'
          }`}
        >
          {message.isLoading ? (
            <TypingIndicator />
          ) : (
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
              {message.content}
            </p>
          )}
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : ''}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}

export function MessageList({ messages, userName, onSuggestionClick }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const suggestions = [
    { icon: '➕', text: 'Add buy groceries to my list' },
    { icon: '📋', text: 'Show me my tasks' },
    { icon: '✅', text: 'Mark task 1 as done' },
  ]

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          {/* Large Bot Avatar */}
          <div className="w-28 h-28 rounded-full mx-auto mb-6 shadow-2xl shadow-violet-soft/50 ring-4 ring-violet-soft/30 bg-gradient-to-br from-violet-soft via-violet-dark to-cyan-accent p-1 animate-float-slow">
            <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                <defs>
                  <linearGradient id="welcomeBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C7CFF" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <filter id="welcomeBotGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="38" fill="none" stroke="url(#welcomeBotGrad)" strokeWidth="2" filter="url(#welcomeBotGlow)" />
                <ellipse cx="35" cy="42" rx="7" ry="10" fill="url(#welcomeBotGrad)" filter="url(#welcomeBotGlow)">
                  <animate attributeName="ry" values="10;2;10" dur="3s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="65" cy="42" rx="7" ry="10" fill="url(#welcomeBotGrad)" filter="url(#welcomeBotGlow)">
                  <animate attributeName="ry" values="10;2;10" dur="3s" repeatCount="indefinite" />
                </ellipse>
                <path d="M 32 62 Q 50 80 68 62" fill="none" stroke="url(#welcomeBotGrad)" strokeWidth="4" strokeLinecap="round" filter="url(#welcomeBotGlow)" />
                <circle cx="22" cy="28" r="3" fill="#7C7CFF">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="78" cy="28" r="3" fill="#22D3EE">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="50" cy="15" r="2.5" fill="#9D9DFF">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            Hello{userName ? `, ${userName}` : ''}!
            <Sparkles className="w-5 h-5 text-orange-accent" />
          </h2>
          <p className="text-gray-400 mb-6">
            I&apos;m <span className="text-orange-accent font-medium">Shaista&apos;s AI</span> assistant. How can I help you today?
          </p>

          {/* Suggestion Cards */}
          <div className="grid grid-cols-1 gap-3">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => onSuggestionClick?.(suggestion.text)}
                className="group flex items-center gap-3 text-sm text-gray-300
                         bg-charcoal-light/50 hover:bg-charcoal-light/80
                         border border-violet-soft/10 hover:border-violet-soft/30
                         rounded-xl px-4 py-3.5 backdrop-blur-sm
                         transition-all duration-300 hover:scale-[1.02]
                         hover:shadow-lg hover:shadow-violet-soft/10
                         cursor-pointer text-left"
              >
                <span className="text-lg">{suggestion.icon}</span>
                <span className="flex-1">&quot;{suggestion.text}&quot;</span>
                <Zap className="w-4 h-4 text-violet-soft opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <span className="px-3 py-1 text-xs text-violet-soft bg-violet-soft/10 border border-violet-soft/20 rounded-full">
              Add Tasks
            </span>
            <span className="px-3 py-1 text-xs text-orange-accent bg-orange-accent/10 border border-orange-accent/20 rounded-full">
              View Tasks
            </span>
            <span className="px-3 py-1 text-xs text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/20 rounded-full">
              Complete Tasks
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} userName={userName} />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
