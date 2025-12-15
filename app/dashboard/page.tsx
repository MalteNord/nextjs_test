import { Suspense } from 'react';
import Dashboard from './Dashboard';
import { DashboardSkeleton } from './DashboardSkeleton';
import { PostsSkeleton } from '@/components/PostsSkeleton';
import { PostsList } from '@/components/PostsList';

/**
 * Dashboard Page - Server Component
 *
 * CORRECT PATTERN:
 * - Server Component for the page
 * - Server-side auth check using getCurrentUser()
 * - Suspense for loading states
 * - Data fetching happens server-side in PostsList
 */
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}