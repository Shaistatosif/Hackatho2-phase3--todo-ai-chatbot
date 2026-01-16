'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChatWindow } from '@/components/ChatWindow'
import { getSession, logout } from '@/lib/auth'
import { LogOut, Sparkles } from 'lucide-react'

export default function ChatPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = getSession()
    if (!session.isAuthenticated || !session.user) {
      router.push('/')
    } else {
      setUserName(session.user.name || 'User')
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-violet-soft/30 border-t-violet-soft rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Enhanced Galaxy Background */}
      <div className="galaxy-container">
        {/* More Stars - Multiple Layers */}
        <div className="stars" />
        <div className="stars" style={{ opacity: 0.6, animationDuration: '100s' }} />
        <div className="stars" style={{ opacity: 0.4, animationDuration: '150s' }} />

        {/* Moon */}
        <div className="absolute top-[15%] right-[10%] z-5">
          <div className="relative w-32 h-32 animate-float-slow">
            {/* Moon Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-accent/30 via-yellow-300/20 to-transparent blur-2xl animate-pulse" />
            {/* Moon Surface */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 shadow-2xl shadow-orange-accent/50">
              {/* Craters */}
              <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-gray-400/60 shadow-inner" />
              <div className="absolute top-14 right-10 w-8 h-8 rounded-full bg-gray-500/40 shadow-inner" />
              <div className="absolute bottom-8 left-12 w-5 h-5 rounded-full bg-gray-400/50 shadow-inner" />
              <div className="absolute top-20 left-16 w-4 h-4 rounded-full bg-gray-500/60 shadow-inner" />
              {/* Moon Shine */}
              <div className="absolute top-4 left-6 w-10 h-10 rounded-full bg-white/30 blur-md" />
            </div>
          </div>
        </div>

        {/* More Shooting Stars with Orange Trail */}
        <div className="shooting-star shooting-star-1" style={{ background: 'linear-gradient(90deg, rgba(255,107,53,0) 0%, rgba(255,107,53,0.8) 50%, rgba(124,124,255,1) 100%)' }} />
        <div className="shooting-star shooting-star-2" style={{ background: 'linear-gradient(90deg, rgba(34,211,238,0) 0%, rgba(34,211,238,0.8) 50%, rgba(255,107,53,1) 100%)' }} />
        <div className="shooting-star shooting-star-3" style={{ background: 'linear-gradient(90deg, rgba(255,107,53,0) 0%, rgba(255,107,53,0.8) 50%, rgba(124,124,255,1) 100%)' }} />
        <div className="shooting-star shooting-star-4" style={{ background: 'linear-gradient(90deg, rgba(124,124,255,0) 0%, rgba(124,124,255,0.8) 50%, rgba(255,107,53,1) 100%)' }} />

        {/* Additional Shooting Stars */}
        <div className="shooting-star shooting-star-1" style={{ top: '25%', animationDelay: '3s', background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.9))' }} />
        <div className="shooting-star shooting-star-2" style={{ top: '65%', animationDelay: '5s', background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.9))' }} />

        {/* Nebula Clouds */}
        <div className="absolute top-[20%] left-[5%] w-96 h-96 bg-violet-soft/10 rounded-full blur-[120px] animate-float opacity-60" />
        <div className="absolute bottom-[15%] right-[8%] w-80 h-80 bg-orange-accent/15 rounded-full blur-[100px] animate-float-slow opacity-70" />
        <div className="absolute top-[50%] left-[15%] w-64 h-64 bg-cyan-accent/10 rounded-full blur-[90px] animate-float opacity-50" />

        {/* Orbital paths with planets - Enhanced */}
        <div className="orbit orbit-1">
          <div className="planet planet-1" style={{ background: 'linear-gradient(135deg, #7C7CFF 0%, #22D3EE 100%)' }} />
        </div>
        <div className="orbit orbit-2">
          <div className="planet planet-2" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)' }} />
        </div>
        <div className="orbit orbit-3">
          <div className="planet planet-3" style={{ background: 'linear-gradient(135deg, #22D3EE 0%, #7C7CFF 100%)' }} />
        </div>
        <div className="orbit orbit-4">
          <div className="planet planet-4" style={{ background: 'linear-gradient(135deg, #F7931E 0%, #FF6B35 100%)' }} />
        </div>
        <div className="orbit orbit-5">
          <div className="planet planet-5" style={{ background: 'linear-gradient(135deg, #7C7CFF 0%, #FF6B35 100%)' }} />
        </div>

        {/* Free floating planets - With Orange */}
        <div className="planet planet-6" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #7C7CFF 100%)', boxShadow: '0 0 20px rgba(255,107,53,0.5)' }} />
        <div className="planet planet-7" style={{ background: 'linear-gradient(135deg, #22D3EE 0%, #FF6B35 100%)', boxShadow: '0 0 20px rgba(34,211,238,0.5)' }} />
        <div className="planet planet-8" style={{ background: 'linear-gradient(135deg, #7C7CFF 0%, #F7931E 100%)', boxShadow: '0 0 20px rgba(124,124,255,0.5)' }} />
        <div className="planet planet-9" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #22D3EE 100%)', boxShadow: '0 0 20px rgba(255,107,53,0.5)' }} />
        <div className="planet planet-10" style={{ background: 'linear-gradient(135deg, #F7931E 0%, #7C7CFF 100%)', boxShadow: '0 0 20px rgba(247,147,30,0.5)' }} />

        {/* Distant Stars (Twinkling) */}
        <div className="absolute top-[30%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
        <div className="absolute top-[60%] right-[25%] w-1 h-1 bg-orange-accent rounded-full animate-pulse shadow-lg shadow-orange-accent/50" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-[40%] left-[40%] w-1 h-1 bg-cyan-accent rounded-full animate-pulse shadow-lg shadow-cyan-accent/50" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[45%] right-[15%] w-1 h-1 bg-violet-soft rounded-full animate-pulse shadow-lg shadow-violet-soft/50" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Enhanced Ambient Glow with Orange */}
      <div className="signup-ambient-glow" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-orange-accent/5 rounded-full blur-[150px] animate-float opacity-40" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-violet-soft/8 rounded-full blur-[180px] animate-float-slow opacity-50" />

      {/* Darker Background overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-90 z-0" />

      {/* Header */}
      <header className="relative z-20 border-b border-orange-accent/30 bg-black/80 backdrop-blur-xl shadow-lg shadow-orange-accent/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Robot Avatar */}
            <div className="w-12 h-12 rounded-full shadow-lg shadow-orange-accent/50 ring-2 ring-orange-accent/40 bg-gradient-to-br from-orange-accent via-violet-soft to-cyan-accent p-0.5 animate-glow-pulse">
              <div className="w-full h-full rounded-full bg-charcoal flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-9 h-9">
                  <defs>
                    <linearGradient id="chatHeaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C7CFF" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                    <filter id="chatHeaderGlow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="50" cy="50" r="35" fill="none" stroke="url(#chatHeaderGrad)" strokeWidth="2" filter="url(#chatHeaderGlow)" />
                  <ellipse cx="38" cy="45" rx="6" ry="8" fill="url(#chatHeaderGrad)" filter="url(#chatHeaderGlow)">
                    <animate attributeName="ry" values="8;1;8" dur="3s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx="62" cy="45" rx="6" ry="8" fill="url(#chatHeaderGrad)" filter="url(#chatHeaderGlow)">
                    <animate attributeName="ry" values="8;1;8" dur="3s" repeatCount="indefinite" />
                  </ellipse>
                  <path d="M 35 60 Q 50 75 65 60" fill="none" stroke="url(#chatHeaderGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#chatHeaderGlow)" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-white text-lg flex items-center gap-2">
                <span className="bg-gradient-to-r from-orange-accent via-violet-soft to-cyan-accent bg-clip-text text-transparent">
                  Shaista's AI
                </span>
                <Sparkles className="w-4 h-4 text-orange-accent animate-pulse" />
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-orange-accent rounded-full animate-pulse shadow-lg shadow-orange-accent/50" />
                <p className="text-xs bg-gradient-to-r from-orange-accent to-cyan-accent bg-clip-text text-transparent font-semibold">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white
                     hover:bg-orange-accent/10 border border-transparent hover:border-orange-accent/40
                     rounded-xl transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 group-hover:text-orange-accent transition-colors" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="relative z-10 flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto flex items-center gap-8 px-4">

          {/* Left Side - Animated Robot Mascot (Desktop Only) */}
          <div className="hidden xl:flex flex-col items-center flex-shrink-0">
            <div className="relative">
              {/* Robot SVG - Same as home page */}
              <div className="robot-glow animate-float-slow">
                <svg
                  viewBox="0 0 200 260"
                  className="w-48 h-60"
                  aria-label="Friendly AI Robot Mascot"
                >
                  {/* Definitions for gradients and filters */}
                  <defs>
                    {/* Main gradient (Violet to Cyan) */}
                    <linearGradient id="chatRobotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C7CFF" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>

                    {/* Body gradient */}
                    <linearGradient id="chatBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2A2E3A" />
                      <stop offset="100%" stopColor="#1A1E28" />
                    </linearGradient>

                    {/* Glow filter */}
                    <filter id="chatGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Eye glow filter */}
                    <filter id="chatEyeGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Robot Head */}
                  <g className="animate-robot-breathe" style={{ transformOrigin: 'center 80px' }}>
                    {/* Head outline */}
                    <rect
                      x="40" y="30"
                      width="120" height="100"
                      rx="20"
                      fill="url(#chatBodyGradient)"
                      stroke="url(#chatRobotGradient)"
                      strokeWidth="2"
                    />

                    {/* Antenna */}
                    <line x1="100" y1="30" x2="100" y2="10" stroke="url(#chatRobotGradient)" strokeWidth="3" />
                    <circle cx="100" cy="8" r="6" fill="url(#chatRobotGradient)" filter="url(#chatGlow)">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Eyes - with animated glow */}
                    <g className="animate-eye-glow">
                      {/* Left eye */}
                      <ellipse cx="70" cy="75" rx="15" ry="18" fill="#0B0F14" />
                      <ellipse cx="70" cy="75" rx="10" ry="12" fill="url(#chatRobotGradient)" filter="url(#chatEyeGlow)">
                        <animate attributeName="ry" values="12;3;12" dur="4s" repeatCount="indefinite" />
                      </ellipse>

                      {/* Right eye */}
                      <ellipse cx="130" cy="75" rx="15" ry="18" fill="#0B0F14" />
                      <ellipse cx="130" cy="75" rx="10" ry="12" fill="url(#chatRobotGradient)" filter="url(#chatEyeGlow)">
                        <animate attributeName="ry" values="12;3;12" dur="4s" repeatCount="indefinite" />
                      </ellipse>
                    </g>

                    {/* Friendly smile */}
                    <path
                      d="M 70 105 Q 100 125 130 105"
                      fill="none"
                      stroke="url(#chatRobotGradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Robot Body */}
                  <g>
                    {/* Neck */}
                    <rect x="85" y="130" width="30" height="15" fill="url(#chatBodyGradient)" />

                    {/* Torso */}
                    <rect
                      x="50" y="145"
                      width="100" height="80"
                      rx="15"
                      fill="url(#chatBodyGradient)"
                      stroke="url(#chatRobotGradient)"
                      strokeWidth="2"
                    />

                    {/* Chest light/core - animated pulse */}
                    <circle
                      cx="100" cy="185" r="15"
                      fill="#0B0F14"
                      stroke="url(#chatRobotGradient)"
                      strokeWidth="2"
                    />
                    <circle
                      cx="100" cy="185" r="10"
                      fill="url(#chatRobotGradient)"
                      className="animate-chest-pulse"
                    >
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Arms */}
                    {/* Left arm */}
                    <rect x="30" y="155" width="20" height="50" rx="10" fill="url(#chatBodyGradient)" stroke="url(#chatRobotGradient)" strokeWidth="1" />

                    {/* Right arm - waving */}
                    <g style={{ transformOrigin: '160px 155px' }} className="animate-wave">
                      <rect x="150" y="155" width="20" height="50" rx="10" fill="url(#chatBodyGradient)" stroke="url(#chatRobotGradient)" strokeWidth="1" />
                    </g>
                  </g>

                  {/* Decorative elements */}
                  <circle cx="60" cy="160" r="4" fill="url(#chatRobotGradient)" opacity="0.6" />
                  <circle cx="140" cy="160" r="4" fill="url(#chatRobotGradient)" opacity="0.6" />
                </svg>
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-orange-accent/40 rounded-full px-4 py-1.5 shadow-lg shadow-orange-accent/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-accent rounded-full animate-pulse shadow-lg shadow-orange-accent/70" />
                  <p className="text-xs bg-gradient-to-r from-orange-accent to-cyan-accent bg-clip-text text-transparent font-semibold">Listening...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Chat Window */}
          <div className="flex-1 h-full">
            <ChatWindow userName={userName} />
          </div>
        </div>
      </main>
    </div>
  )
}
