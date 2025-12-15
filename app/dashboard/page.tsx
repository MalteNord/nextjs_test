import { Suspense } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';

/**
 * Dashboard Page - Server Component
 *
 * - Server Component for the page
 * - Server-side auth check using getCurrentUser() in DashboardContent
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
