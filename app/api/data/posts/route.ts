import { NextRequest, NextResponse } from 'next/server';

// Mock posts data
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Understanding Server Components in Next.js',
    content: 'Server Components are a new paradigm in React that allows components to render on the server...',
    author: 'Admin User',
    createdAt: '2024-01-15T10:00:00Z',
    category: 'tutorial',
  },
  {
    id: '2',
    title: 'Authentication Best Practices',
    content: 'When implementing authentication, always use HttpOnly cookies to store tokens securely...',
    author: 'Admin User',
    createdAt: '2024-01-20T14:30:00Z',
    category: 'security',
  },
  {
    id: '3',
    title: 'SSR vs CSR: When to Use Each',
    content: 'Server-side rendering (SSR) is great for SEO and initial page load performance...',
    author: 'Regular User',
    createdAt: '2024-02-01T09:15:00Z',
    category: 'tutorial',
  },
  {
    id: '4',
    title: 'Caching Strategies in Next.js 16',
    content: 'Next.js 16 introduces new caching primitives like use cache, cacheLife, and cacheTag...',
    author: 'Admin User',
    createdAt: '2024-02-10T16:45:00Z',
    category: 'tutorial',
  },
];

function verifyToken(token: string): { userId: string; exp: number } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    );
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return posts with timestamp to demonstrate caching
  return NextResponse.json({
    posts: MOCK_POSTS,
    fetchedAt: new Date().toISOString(),
  });
}
