export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  category: string;
}

export interface WelcomeData {
  message: string;
  description: string;
  features: string[];
  fetchedAt: string;
}

/**
 * WRONG PATTERN - This is an intentional mistake!
 *
 * This function is meant to show what NOT to do:
 * - Fetching data client-side when it should be server-side
 * - Exposed API URL to client bundle
 *
 * TODO for candidates: Remove this and use server-side fetching instead
 */
export async function getPostsClientSide(): Promise<{ posts: Post[]; fetchedAt: string }> {
  // WRONG: This exposes the API URL to the client bundle
  // WRONG: This doesn't have access to HttpOnly cookies
  const response = await fetch('/api/data/posts');

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}
