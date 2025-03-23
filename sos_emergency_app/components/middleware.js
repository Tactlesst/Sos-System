// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const userId = request.cookies.get('userId');

  // If no token or userId, redirect to /auth
  if (!token || !userId) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // Allow access to the requested route
  return NextResponse.next();
}

// Apply middleware to the /profile route
export const config = {
  matcher: ['/profile'], // Protect the /profile route
};