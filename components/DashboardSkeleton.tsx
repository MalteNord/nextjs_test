import { PostsSkeleton } from '@/components/PostsSkeleton';

/**
 * Dashboard Skeleton - Loading State
 * 
 * Fallback UI displayed while authentication is being checked
 * and user data is being loaded.
 */
export function DashboardSkeleton() {
  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-description">Loading...</p>
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="card-title">Your Posts</h2>
        <PostsSkeleton />
      </div>
    </div>
  );
}
