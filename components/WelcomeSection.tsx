import { getWelcomeData } from '@/lib/data-server';

/**
 * Welcome Section - Server Component
 *
 * CORRECT PATTERN:
 * - Server Component (no 'use client')
 * - Async function that fetches data
 * - Uses 'use cache' in the data fetching function
 * - Wrapped in Suspense by parent
 */
export async function WelcomeSection() {
  const data = await getWelcomeData();

  return (
    <div className="card">
      <h2 className="card-title">{data.message}</h2>
      <p className="card-content">{data.description}</p>

      <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Features covered:</h3>
      <ul className="features-list">
        {data.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <div className="fetch-info">
        Data fetched at: {new Date(data.fetchedAt).toLocaleString()}
        <br />
        <small>(Cached with &apos;use cache&apos; - refresh to see same timestamp)</small>
      </div>
    </div>
  );
}
