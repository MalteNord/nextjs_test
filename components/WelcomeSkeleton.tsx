/**
 * Welcome Skeleton - Server Component
 *
 * Loading skeleton for the WelcomeSection.
 * Used as Suspense fallback.
 */
export function WelcomeSkeleton() {
  return (
    <div className="card">
      <div
        style={{
          height: '24px',
          width: '60%',
          backgroundColor: '#eee',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}
      />
      <div
        style={{
          height: '16px',
          width: '100%',
          backgroundColor: '#eee',
          borderRadius: '4px',
          marginBottom: '0.5rem',
        }}
      />
      <div
        style={{
          height: '16px',
          width: '80%',
          backgroundColor: '#eee',
          borderRadius: '4px',
          marginBottom: '1rem',
        }}
      />

      <div
        style={{
          height: '20px',
          width: '40%',
          backgroundColor: '#eee',
          borderRadius: '4px',
          marginBottom: '0.5rem',
        }}
      />

      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            height: '16px',
            width: `${60 + i * 5}%`,
            backgroundColor: '#eee',
            borderRadius: '4px',
            marginBottom: '0.5rem',
          }}
        />
      ))}
    </div>
  );
}
