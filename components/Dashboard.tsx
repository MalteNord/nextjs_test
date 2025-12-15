import { Suspense } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PostsList } from '@/components/PostsList';
import { PostsSkeleton } from '@/components/PostsSkeleton';
import { LogoutButton } from '@/components/LogoutButton';
import { RefreshButton } from '@/components/RefreshButton';

/**
 * Dashboard - Server Component
 * 
 * Separate component for user-specific content wrapped in Suspense.
 * This component accesses runtime data (cookies) and should be wrapped
 * in a Suspense boundary to prevent blocking the entire page render.
 */
export async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-description">
              Welcome back, {user.name}! ({user.role})
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h2 className="card-title">Your Posts</h2>
            <p className="card-content">
              Data fetched server-side with authentication and caching.
            </p>
          </div>
          <RefreshButton />
        </div>

        {/* Suspense boundary for posts data */}
        <Suspense fallback={<PostsSkeleton />}>
          <PostsList />
        </Suspense>
      </div>
    </div>
  );
}
