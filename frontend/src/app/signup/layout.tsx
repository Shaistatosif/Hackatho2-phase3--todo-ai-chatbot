'use client'

/**
 * Signup Layout - Provides a clean background for the SignUpBuddy component
 * This overrides the default layout's background effects
 */
export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="signup-container">
      {/* Override parent background with our custom charcoal background */}
      <style jsx global>{`
        .gradient-bg,
        .rotating-circles,
        .particles,
        .floating-orbs {
          display: none !important;
        }
      `}</style>
      {children}
    </div>
  )
}
