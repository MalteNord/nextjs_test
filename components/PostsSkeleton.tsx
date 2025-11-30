/**
 * Posts Skeleton - Server Component
 *
 * Loading skeleton for the PostsList.
 * Used as Suspense fallback.
 */
export function PostsSkeleton() {
  return (
    <div className="posts-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="post-card">
          <div
            style={{
              height: '24px',
              width: '70%',
              backgroundColor: '#eee',
              borderRadius: '4px',
              marginBottom: '0.5rem',
            }}
          />
          <div
            style={{
              height: '14px',
              width: '40%',
              backgroundColor: '#eee',
              borderRadius: '4px',
              marginBottom: '0.75rem',
            }}
          />
          <div
            style={{
              height: '16px',
              width: '100%',
              backgroundColor: '#eee',
              borderRadius: '4px',
              marginBottom: '0.25rem',
            }}
          />
          <div
            style={{
              height: '16px',
              width: '90%',
              backgroundColor: '#eee',
              borderRadius: '4px',
              marginBottom: '0.5rem',
            }}
          />
          <div
            style={{
              height: '20px',
              width: '60px',
              backgroundColor: '#e0f0ff',
              borderRadius: '4px',
            }}
          />
        </div>
      ))}
    </div>
  );
}
