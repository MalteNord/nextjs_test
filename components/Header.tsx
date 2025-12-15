/**
 * INTENTIONAL MISTAKE #1: This component is 'use client' but it doesn't need to be!
 *
 * The Header only displays user info and navigation links.
 * It should be a Server Component that reads the user server-side.
 *
 * Current problems:
 * - 'use client' makes it render on client
 * - Uses useEffect to fetch user data (should be server-side)
 * - Can't access HttpOnly cookies directly
 *
 * TODO for candidates: Convert this to a Server Component
 */
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="header-title">
          Next.js Code Test
        </Link>

        <nav className="header-nav">
          <Link href="/">Home</Link>

        {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <div className="user-info">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span>{user.name}</span>
              </div>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
