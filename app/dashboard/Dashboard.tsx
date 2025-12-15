import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { PostsList } from '@/components/PostsList';
import { PostsSkeleton } from '@/components/PostsSkeleton';
import { LogoutButton } from '@/components/LogoutButton';
import { Suspense } from 'react';

export default async function DashboardContent() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <div className="page-header">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
        <h2 className="card-title">Your Posts</h2>
        <p className="card-content" style={{ marginBottom: '1rem' }}>
          Data fetched server-side with authentication and caching.
        </p>

        <Suspense fallback={<PostsSkeleton />}>
          <PostsList />
        </Suspense>
      </div>
    </div>
  );
}