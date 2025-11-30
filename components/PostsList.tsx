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
'use client';

import { useEffect, useState } from 'react';
import { Post, getPostsClientSide } from '@/lib/data';

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // WRONG: Client-side data fetching
  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPostsClientSide();
        setPosts(data.posts);
        setFetchedAt(data.fetchedAt);
      } catch (err) {
        console.error('Failed to fetch posts:', err); // WRONG: console.error
        setError('Failed to load posts. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <span className="loading-spinner"></span>
        Loading posts...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <div className="post-meta">
              By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <p className="post-content">{post.content}</p>
            <span className="post-category">{post.category}</span>
          </div>
        ))}
      </div>

      <div className="fetch-info">
        Data fetched at: {fetchedAt ? new Date(fetchedAt).toLocaleString() : 'N/A'}
        <br />
        <small>(Client-side fetch - should be server-side!)</small>
      </div>
    </div>
  );
}
