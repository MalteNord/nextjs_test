import { cacheLife, cacheTag } from 'next/cache';
import type { WelcomeData } from './data';
import { Post } from './data';
import { cookies } from 'next/headers';

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

/* get cached posts */
async function getPostsCached(authToken: string | null): Promise<{
  posts: Post[];
  fetchedAt: string;
}> {
  'use cache';

  cacheLife('minutes');
  cacheTag('posts');

  const response = await fetch(`${getBaseUrl()}/api/data/posts`, {
    headers: authToken ? { Cookie: `auth-token=${authToken}` } : {},
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const json = await response.json();
  return {
    posts: Array.isArray(json.posts) ? json.posts : json, 
    fetchedAt: new Date().toISOString(),
  };
}

export async function getPosts() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-token')?.value ?? null;

  return getPostsCached(authToken);
}