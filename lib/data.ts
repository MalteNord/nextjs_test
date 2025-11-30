import { cookies } from 'next/headers';
import { cacheLife, cacheTag } from 'next/cache';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  category: string;
}

export interface WelcomeData {
  message: string;
  description: string;
  features: string[];
  fetchedAt: string;
}

/**
 * Get the base URL for API requests.
 */
function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
}

/**
 * Fetch welcome data (public, no auth required)
 *
 * DEMONSTRATES: 'use cache' directive with cacheLife and cacheTag
 * This function is cached and can be revalidated using revalidateTag('welcome')
 */
export async function getWelcomeData(): Promise<WelcomeData> {
  'use cache';
  cacheLife('minutes'); // Cache for a few minutes
  cacheTag('welcome'); // Tag for targeted revalidation

  const response = await fetch(`${getBaseUrl()}/api/data/welcome`);

  if (!response.ok) {
    throw new Error('Failed to fetch welcome data');
  }

  return response.json();
}

/**
 * Fetch posts data (requires authentication)
 *
 * CORRECT PATTERN: Server-side data fetching with auth
 * - Reads HttpOnly cookie server-side
 * - Forwards cookie to API
 * - Uses caching with proper tags
 */
export async function getPosts(): Promise<{ posts: Post[]; fetchedAt: string }> {
  'use cache';
  cacheLife('minutes');
  cacheTag('posts');

  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${getBaseUrl()}/api/data/posts`, {
    headers: {
      Cookie: `auth-token=${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication required');
    }
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

/**
 * WRONG PATTERN - This is an intentional mistake!
 *
 * This function is meant to show what NOT to do:
 * - Fetching data client-side when it should be server-side
 * - Exposed API URL to client bundle
 *
 * TODO for candidates: Remove this and use server-side fetching instead
 */
export async function getPostsClientSide(): Promise<{ posts: Post[]; fetchedAt: string }> {
  // WRONG: This exposes the API URL to the client bundle
  // WRONG: This doesn't have access to HttpOnly cookies
  const response = await fetch('/api/data/posts');

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}
