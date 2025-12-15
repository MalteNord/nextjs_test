'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { refreshPostsAction } from '@/lib/actions';

/**
 * RefreshButton - Client Component
 * 
 * - Calls Server Action (refreshPostsAction) to refresh cache
 * - Uses useTransition for pending state
 * - updateTag keeps cache warm while fetching fresh data
 */
export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleRefresh() {
    startTransition(async () => {
      await refreshPostsAction();
      router.refresh();
    });
  }

  return (
    <button onClick={handleRefresh} disabled={isPending} className="btn btn-secondary">
      {isPending ? (
        <>
          <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>⟳</span>
          Refreshing...
        </>
      ) : (
        'Refresh Data'
      )}
    </button>
  );
}
