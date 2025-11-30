import { Suspense } from 'react';
import { WelcomeSection } from '@/components/WelcomeSection';
import { WelcomeSkeleton } from '@/components/WelcomeSkeleton';
import Link from 'next/link';

/**
 * Home Page - Server Component
 *
 * CORRECT PATTERN: Page is a Server Component
 * - Uses Suspense for loading states
 * - Data fetching happens in child server component
 * - No 'use client' needed at page level
 */
export default function HomePage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Next.js 16 Code Test</h1>
        <p className="page-description">
          Test your knowledge of SSR, authentication, and caching patterns
        </p>
      </div>

      {/* Suspense boundary for async data */}
      <Suspense fallback={<WelcomeSkeleton />}>
        <WelcomeSection />
      </Suspense>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 className="card-title">Test Credentials</h2>
        <div className="card-content">
          <p>
            <strong>Admin:</strong> admin@test.com / admin123
          </p>
          <p>
            <strong>User:</strong> user@test.com / user123
          </p>
          <div style={{ marginTop: '1rem' }}>
            <Link href="/login" className="btn btn-primary">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
