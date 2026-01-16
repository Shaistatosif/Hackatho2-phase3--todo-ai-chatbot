'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, Eye, EyeOff, MessageCircle } from 'lucide-react'
import { login, getSession } from '@/lib/auth'

/**
 * SignUpBuddy - A premium AI chatbot registration UI component
 *
 * Features:
 * - Charcoal Black (#0B0F14) background with Violet (#7C7CFF) and Cyan (#22D3EE) accents
 * - 3D-style AI robot mascot with animated lighting
 * - Glassmorphism signup card
 * - Smooth ambient glow effects (Violet → Cyan)
 * - Fully responsive (desktop and mobile)
 */
export default function SignUpBuddy() {
  const router = useRouter()

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if already logged in
  useEffect(() => {
    const session = getSession()
    if (session.isAuthenticated) {
      router.push('/chat')
    } else {
      setIsLoaded(true)
    }
  }, [router])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && password && agreeToTerms) {
      setIsSubmitting(true)
      // Login with the provided name (MVP uses simple session)
      login(name)
      // Redirect to chat
      router.push('/chat')
    }
  }

  // Handle social login
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    console.log(`Login with ${provider}`)
    // Add your social login logic here
  }

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-accent/30 border-t-orange-accent rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-violet-soft rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Galaxy Background with Planets */}
      <div className="galaxy-container">
        {/* Enhanced Stars - 3 layers for depth */}
        <div className="stars stars-layer-1" />
        <div className="stars stars-layer-2" />
        <div className="stars stars-layer-3" />

        {/* Moon in the Sky */}
        <div className="absolute top-[15%] right-[10%] z-5">
          <div className="relative w-32 h-32 animate-float-slow">
            {/* Moon Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-accent/30 via-yellow-300/20 to-transparent blur-2xl animate-pulse" />
            {/* Moon Surface */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 shadow-2xl shadow-orange-accent/50">
              {/* Craters */}
              <div className="absolute top-6 left-8 w-6 h-6 rounded-full bg-gray-400/60 shadow-inner" />
              <div className="absolute top-10 left-16 w-4 h-4 rounded-full bg-gray-400/50 shadow-inner" />
              <div className="absolute top-16 left-10 w-5 h-5 rounded-full bg-gray-400/70 shadow-inner" />
              <div className="absolute top-20 left-20 w-3 h-3 rounded-full bg-gray-400/40 shadow-inner" />
              <div className="absolute top-12 left-4 w-3 h-3 rounded-full bg-gray-400/55 shadow-inner" />
            </div>
          </div>
        </div>

        {/* Nebula Clouds */}
        <div className="nebula nebula-violet" />
        <div className="nebula nebula-orange" />
        <div className="nebula nebula-cyan" />

        {/* Shooting Stars - 6 total with orange trails */}
        <div className="shooting-star shooting-star-1" />
        <div className="shooting-star shooting-star-2" />
        <div className="shooting-star shooting-star-3" />
        <div className="shooting-star shooting-star-4" />
        <div className="shooting-star shooting-star-5" />
        <div className="shooting-star shooting-star-6" />

        {/* Orbital paths with planets */}
        <div className="orbit orbit-1">
          <div className="planet planet-1" />
        </div>
        <div className="orbit orbit-2">
          <div className="planet planet-2" />
        </div>
        <div className="orbit orbit-3">
          <div className="planet planet-3" />
        </div>
        <div className="orbit orbit-4">
          <div className="planet planet-4" />
        </div>
        <div className="orbit orbit-5">
          <div className="planet planet-5" />
        </div>

        {/* Free floating planets */}
        <div className="planet planet-6" />
        <div className="planet planet-7" />
        <div className="planet planet-8" />
        <div className="planet planet-9" />
        <div className="planet planet-10" />
      </div>

      {/* Ambient Background Glow */}
      <div className="signup-ambient-glow" />

      {/* Background gradient overlay - Deep space black */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900/50 to-black opacity-80 z-0" />

      {/* Floating gradient orbs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-soft/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-accent/10 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-orange-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">

        {/* Left Side - Robot Mascot (Hidden on mobile, shown on lg+) */}
        <div className={`hidden lg:flex flex-col items-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          {/* Robot Container */}
          <div className="relative">
            {/* Robot SVG - Friendly 3D-style AI mascot */}
            <div className="robot-glow animate-float-slow">
              <svg
                viewBox="0 0 200 260"
                className="w-64 h-80"
                aria-label="Friendly AI Robot Mascot"
              >
                {/* Definitions for gradients and filters */}
                <defs>
                  {/* Main gradient (Violet to Cyan) */}
                  <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C7CFF" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>

                  {/* Body gradient */}
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2A2E3A" />
                    <stop offset="100%" stopColor="#1A1E28" />
                  </linearGradient>

                  {/* Glow filter */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Eye glow filter */}
                  <filter id="eyeGlow" x="-100%" y="-100%" width="300%" height="300%">
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
                    fill="url(#bodyGradient)"
                    stroke="url(#robotGradient)"
                    strokeWidth="2"
                  />

                  {/* Antenna */}
                  <line x1="100" y1="30" x2="100" y2="10" stroke="url(#robotGradient)" strokeWidth="3" />
                  <circle cx="100" cy="8" r="6" fill="url(#robotGradient)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Eyes - with animated glow */}
                  <g className="animate-eye-glow">
                    {/* Left eye */}
                    <ellipse cx="70" cy="75" rx="15" ry="18" fill="#0B0F14" />
                    <ellipse cx="70" cy="75" rx="10" ry="12" fill="url(#robotGradient)" filter="url(#eyeGlow)">
                      <animate attributeName="ry" values="12;3;12" dur="4s" repeatCount="indefinite" />
                    </ellipse>

                    {/* Right eye */}
                    <ellipse cx="130" cy="75" rx="15" ry="18" fill="#0B0F14" />
                    <ellipse cx="130" cy="75" rx="10" ry="12" fill="url(#robotGradient)" filter="url(#eyeGlow)">
                      <animate attributeName="ry" values="12;3;12" dur="4s" repeatCount="indefinite" />
                    </ellipse>
                  </g>

                  {/* Friendly smile */}
                  <path
                    d="M 70 105 Q 100 125 130 105"
                    fill="none"
                    stroke="url(#robotGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>

                {/* Robot Body */}
                <g>
                  {/* Neck */}
                  <rect x="85" y="130" width="30" height="15" fill="url(#bodyGradient)" />

                  {/* Torso */}
                  <rect
                    x="50" y="145"
                    width="100" height="80"
                    rx="15"
                    fill="url(#bodyGradient)"
                    stroke="url(#robotGradient)"
                    strokeWidth="2"
                  />

                  {/* Chest light/core - animated pulse */}
                  <circle
                    cx="100" cy="185" r="15"
                    fill="#0B0F14"
                    stroke="url(#robotGradient)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="100" cy="185" r="10"
                    fill="url(#robotGradient)"
                    className="animate-chest-pulse"
                  >
                    <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                  </circle>

                  {/* Arms */}
                  {/* Left arm */}
                  <rect x="30" y="155" width="20" height="50" rx="10" fill="url(#bodyGradient)" stroke="url(#robotGradient)" strokeWidth="1" />

                  {/* Right arm - waving */}
                  <g style={{ transformOrigin: '160px 155px' }} className="animate-wave">
                    <rect x="150" y="155" width="20" height="50" rx="10" fill="url(#bodyGradient)" stroke="url(#robotGradient)" strokeWidth="1" />
                  </g>
                </g>

                {/* Decorative elements */}
                <circle cx="60" cy="160" r="4" fill="url(#robotGradient)" opacity="0.6" />
                <circle cx="140" cy="160" r="4" fill="url(#robotGradient)" opacity="0.6" />
              </svg>
            </div>

            {/* Chat Bubble */}
            <div className="chat-bubble absolute -right-8 top-8 bg-charcoal-light/90 backdrop-blur-sm border border-orange-accent/30 rounded-2xl rounded-bl-sm px-4 py-3 max-w-[180px] shadow-lg shadow-orange-accent/10">
              <div className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-orange-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-200 leading-relaxed">
                  Hi! I'm <span className="text-orange-accent">Shaista's</span> AI!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Signup Card */}
        <div className={`w-full max-w-md transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Glassmorphism Card */}
          <div className="glass-signup rounded-3xl p-8 md:p-10 animate-glow-shift">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-violet-soft via-orange-accent to-cyan-accent bg-clip-text text-transparent">
                  Shaista's AI Buddy!
                </span>
              </h1>
              <p className="text-gray-400 text-sm">Create your account to get started</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div className="relative animate-entrance-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-charcoal-light/50 border border-gray-700/50 rounded-xl
                           text-white placeholder-gray-500 input-glow focus:outline-none
                           transition-all duration-300"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative animate-entrance-2">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-charcoal-light/50 border border-gray-700/50 rounded-xl
                           text-white placeholder-gray-500 input-glow focus:outline-none
                           transition-all duration-300"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative animate-entrance-3">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-4 bg-charcoal-light/50 border border-gray-700/50 rounded-xl
                           text-white placeholder-gray-500 input-glow focus:outline-none
                           transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-violet-soft transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 bg-charcoal-light text-violet-soft
                           focus:ring-violet-soft/50 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                  I agree to{' '}
                  <a href="#" className="text-violet-soft hover:text-violet-glow transition-colors">
                    Terms of Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-violet-soft hover:text-violet-glow transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name || !email || !password || !agreeToTerms || isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-violet-soft via-orange-accent to-cyan-accent
                         text-white font-semibold rounded-xl shadow-lg
                         shadow-orange-accent/20 hover:shadow-orange-accent/40
                         hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Starting...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-glow via-orange-glow to-cyan-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <a href="#" className="text-violet-soft hover:text-violet-glow font-medium transition-colors">
                Sign In
              </a>
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <span className="text-gray-500 text-sm">or continue with</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4">
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="flex-1 flex items-center justify-center gap-3 py-3 px-4
                         bg-charcoal-light/50 border border-gray-700/50 rounded-xl
                         text-gray-300 hover:text-white hover:border-gray-600
                         social-btn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium">Google</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex-1 flex items-center justify-center gap-3 py-3 px-4
                         bg-charcoal-light/50 border border-gray-700/50 rounded-xl
                         text-gray-300 hover:text-white hover:border-gray-600
                         social-btn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-medium">Facebook</span>
              </button>
            </div>

            {/* Footer Links */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-800/50">
              <a href="#" className="text-xs text-gray-500 hover:text-orange-accent transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="text-xs text-gray-500 hover:text-orange-accent transition-colors">
                Privacy Policy
              </a>
            </div>
            <p className="text-center text-gray-600 text-xs mt-4">
              Made with love by <span className="text-orange-accent">Shaista</span>
            </p>
          </div>
        </div>

        {/* Mobile Robot - Shown only on mobile */}
        <div className={`lg:hidden flex justify-center transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative scale-75">
            <div className="robot-glow animate-float-slow">
              <svg viewBox="0 0 200 180" className="w-48 h-36">
                <defs>
                  <linearGradient id="robotGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C7CFF" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                  <linearGradient id="bodyGradientMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2A2E3A" />
                    <stop offset="100%" stopColor="#1A1E28" />
                  </linearGradient>
                  <filter id="glowMobile" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Simplified robot head for mobile */}
                <rect x="50" y="30" width="100" height="80" rx="15" fill="url(#bodyGradientMobile)" stroke="url(#robotGradientMobile)" strokeWidth="2" />
                <line x1="100" y1="30" x2="100" y2="15" stroke="url(#robotGradientMobile)" strokeWidth="3" />
                <circle cx="100" cy="12" r="5" fill="url(#robotGradientMobile)" filter="url(#glowMobile)">
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Eyes */}
                <ellipse cx="75" cy="65" rx="12" ry="14" fill="#0B0F14" />
                <ellipse cx="75" cy="65" rx="8" ry="10" fill="url(#robotGradientMobile)" filter="url(#glowMobile)">
                  <animate attributeName="ry" values="10;2;10" dur="4s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="125" cy="65" rx="12" ry="14" fill="#0B0F14" />
                <ellipse cx="125" cy="65" rx="8" ry="10" fill="url(#robotGradientMobile)" filter="url(#glowMobile)">
                  <animate attributeName="ry" values="10;2;10" dur="4s" repeatCount="indefinite" />
                </ellipse>

                {/* Smile */}
                <path d="M 75 90 Q 100 105 125 90" fill="none" stroke="url(#robotGradientMobile)" strokeWidth="3" strokeLinecap="round" />

                {/* Body hint */}
                <rect x="85" y="110" width="30" height="10" fill="url(#bodyGradientMobile)" />
                <rect x="60" y="120" width="80" height="50" rx="10" fill="url(#bodyGradientMobile)" stroke="url(#robotGradientMobile)" strokeWidth="2" />
                <circle cx="100" cy="145" r="10" fill="url(#robotGradientMobile)" className="animate-chest-pulse" />
              </svg>
            </div>

            {/* Mobile chat bubble */}
            <div className="chat-bubble absolute -right-4 -top-2 bg-charcoal-light/90 backdrop-blur-sm border border-orange-accent/30 rounded-xl rounded-bl-sm px-3 py-2 max-w-[140px] shadow-lg shadow-orange-accent/10">
              <p className="text-xs text-gray-200">Hi! I'm <span className="text-orange-accent">Shaista's</span> AI!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
