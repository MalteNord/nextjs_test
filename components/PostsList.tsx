/**
 * INTENTIONAL MISTAKE #2: This uses client-side fetching!
 *
 * This component fetches posts client-side with useEffect.
 * It should be a Server Component that fetches data server-side.
 *
 * Current problems:
 * - 'use client' forces client-side rendering
 * - useEffect + fetch pattern (should use server-side fetch)
 * - Can't properly access HttpOnly cookies
 * - Loses SSR benefits (SEO, initial load performance)
 *
 * TODO for candidates: Convert this to a Server Component
 * that uses getPosts() from lib/data.ts
 */
import { getPosts } from '@/lib/data-server';

export async function PostsList() {
  const result = await getPosts();
  const { posts, fetchedAt } = result;

  return (
    <div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>

            <div className="post-meta">
              By {post.author} •{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </div>

            <p className="post-content">{post.content}</p>

            <span className="post-category">{post.category}</span>
          </div>
        ))}
      </div>

      <div className="fetch-info">
        Data fetched at:{' '}
        {new Date(fetchedAt).toLocaleString()}
        <br />
        <small>(Server-side fetch)</small>
      </div>
    </div>
  );
}