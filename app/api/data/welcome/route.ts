import { NextResponse } from 'next/server';

// Public welcome message - no auth required
export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    message: 'Welcome to the Next.js Code Test!',
    description: 'This application demonstrates SSR patterns, authentication with HttpOnly cookies, and Next.js 16 caching features.',
    features: [
      'Server-side data fetching',
      'HttpOnly cookie authentication',
      'use cache directive',
      'Suspense boundaries',
      'Server Actions',
    ],
    fetchedAt: new Date().toISOString(),
  });
}
