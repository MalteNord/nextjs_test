import { cacheLife, cacheTag } from 'next/cache';
import { cookies } from 'next/headers';
import type { WelcomeData, Post } from './data';

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
 * Internal cached function to fetch posts with token
 *
 * - 'use cache' directive with cacheLife and cacheTag
 * - Separates dynamic data (cookies) from cached logic
 * - Token is passed as parameter (read outside cache scope)
 */
async function fetchPostsWithToken(token: string): Promise<{ posts: Post[]; fetchedAt: string }> {
  'use cache';
  cacheLife('minutes'); 
  cacheTag('posts');

  const response = await fetch(`${getBaseUrl()}/api/data/posts`, {
    headers: {
      Cookie: `auth-token=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

/**
 * Fetch posts data (requires authentication)
 *
 * - Separate dynamic data from cached functions
 * - Reads cookies outside the cache scope
 * - Passes token to cached function as parameter
 * - Server-side data fetching with access to HttpOnly cookies
 */
export async function getPosts(): Promise<{ posts: Post[]; fetchedAt: string }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    throw new Error('Not authenticated');
  }

  return fetchPostsWithToken(token);
}
