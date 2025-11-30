'use server';

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
 * Server Action for login
 *
 * CORRECT PATTERN: Using Server Actions for mutations
 * - Built-in CSRF protection
 * - Type safety
 * - Direct cookie access
 */
export async function loginAction(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const response = await fetch(`${getBaseUrl()}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: data.error || 'Login failed' };
    }

    // Get the Set-Cookie header from the response
    const setCookieHeader = response.headers.get('set-cookie');

    if (setCookieHeader) {
      // Parse and set the cookie
      const cookieStore = await cookies();
      const tokenMatch = setCookieHeader.match(/auth-token=([^;]+)/);
      if (tokenMatch) {
        cookieStore.set('auth-token', tokenMatch[1], {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24,
          path: '/',
        });
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred' };
  }
}

/**
 * Server Action for logout
 *
 * TODO for candidates: Should this clear any cached data?
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}
