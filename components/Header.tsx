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
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // WRONG: Client-side fetching for user data
  // This won't work with HttpOnly cookies in a real scenario!
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.log('Not authenticated'); // WRONG: console.log in production
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="header-title">
          Next.js Code Test
        </Link>

        <nav className="header-nav">
          <Link href="/">Home</Link>

          {loading ? (
            <span>Loading...</span>
          ) : user ? (
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
