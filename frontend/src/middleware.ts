/**
 * Auth middleware for protected routes (T069)
 * Note: Client-side auth check is done in page components
 * This middleware handles server-side concerns
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For MVP, we rely on client-side auth checks
  // Server-side middleware can be enhanced for production

  // Add security headers
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
