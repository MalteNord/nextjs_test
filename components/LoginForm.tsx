'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { loginAction } from '@/lib/actions';

/**
 * Login Form - Client Component
 *
 * CORRECT PATTERN: This IS a client component because:
 * - It needs form interactivity (useActionState)
 * - It needs client-side navigation after success
 *
 * The actual login logic is a Server Action (loginAction)
 * which provides built-in CSRF protection.
 */
export function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Redirect on successful login
  useEffect(() => {
    if (state?.success) {
      // Clear any cached data and navigate
      router.push('/dashboard');
      router.refresh(); // Refresh to update server components
    }
  }, [state, router]);

  return (
    <form action={formAction}>
      {state?.error && <div className="error">{state.error}</div>}

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-input"
          placeholder="admin@test.com"
          required
          disabled={isPending}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
          placeholder="admin123"
          required
          disabled={isPending}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
}
