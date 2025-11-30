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
  'use server';

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
 */
export async function logoutAction(): Promise<void> {
  'use server';

  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}
