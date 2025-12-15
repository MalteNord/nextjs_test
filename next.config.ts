import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable cacheComponents for 'use cache' directive (Next.js 16 feature)
  cacheComponents: true,
  
  // Define custom cache profiles
  cacheLife: {
    minutes: {
      stale: 60, // Consider data fresh for 60 seconds
      revalidate: 300, // Revalidate after 5 minutes
      expire: 600, // Hard expire after 10 minutes
    },
  },
};

export default nextConfig;
