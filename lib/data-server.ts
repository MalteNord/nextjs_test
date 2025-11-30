import { cacheLife, cacheTag } from 'next/cache';
import type { WelcomeData } from './data';

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
