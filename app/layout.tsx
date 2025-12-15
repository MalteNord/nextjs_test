import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { HeaderSkeleton } from '@/components/HeaderSkeleton';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Next.js Code Test',
  description: 'Code test for SSR, authentication, and caching patterns',
};

/**
 * Root Layout - Server Component
 *
 * CORRECT PATTERN: Root layout should be a Server Component
 * - Can perform server-side auth checks
 * - Can fetch user data server-side
 * - Children that need interactivity should be separate client components
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<HeaderSkeleton />} >
          <Header />
        </Suspense>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
