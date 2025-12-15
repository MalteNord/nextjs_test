import { cookies } from 'next/headers';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Get the current authenticated user from the server-side.
 * This function should ONLY be called from Server Components or Server Actions.
 *
 * CORRECT PATTERN: Server-side auth verification using HttpOnly cookies
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    // Make request to our auth API to verify token and get user
    // In a real app, you'd verify the JWT directly here
    const response = await fetch(`${getBaseUrl()}/api/auth/me`, {
      headers: {
        Cookie: `auth-token=${token}`,
      },
      cache: 'no-store', // Don't cache auth requests
      next: { tags: ['auth'] }, // Add tag for cache revalidation
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Get the base URL for API requests.
 * Needed because server components can't use relative URLs.
 */
function getBaseUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT || 3000}`;
}

