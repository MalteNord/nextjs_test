'use client';

import { useRouter } from 'next/navigation';
import { logoutAction } from '@/lib/auth';

/**
 * Logout Button - Client Component
 *
 * CORRECT PATTERN: This IS a client component because:
 * - It needs click interactivity
 * - It needs client-side navigation after logout
 *
 * The actual logout is a Server Action.
 */
export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction();
    router.push('/login');
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Logout
    </button>
  );
}
