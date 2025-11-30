# Next.js 16 Code Test

A practical code test to evaluate understanding of Next.js 16 best practices including:
- Server-side rendering (SSR) and data fetching
- Client vs Server Components
- Authentication with HttpOnly cookies
- Next.js 16 caching (`use cache`, `cacheLife`, `cacheTag`)
- Suspense boundaries

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Credentials

- **Admin**: admin@test.com / admin123
- **User**: user@test.com / user123

---

# Code Test Instructions

## Overview

This application has **intentional mistakes** that violate Next.js 16 best practices. Your task is to identify and fix these issues while demonstrating your understanding of modern React and Next.js patterns.

## What We're Testing

1. **SSR Data Fetching** - Understanding when and how to fetch data server-side
2. **Client vs Server Components** - Knowing which directive to use and why
3. **Authentication** - Proper handling of HttpOnly cookies and server-side auth
4. **Caching** - Using `use cache`, `cacheLife`, `cacheTag`, and `revalidateTag`
5. **Suspense** - Proper usage of Suspense boundaries

---

## Tasks

### Task 1: Fix the Header Component (components/Header.tsx)

**Current Problem:**
The Header component is marked as `'use client'` but it doesn't need any client-side interactivity. It only displays user information and navigation links.

**Issues to Fix:**
- [ ] Remove unnecessary `'use client'` directive
- [ ] Remove `useEffect` and `useState` for user fetching
- [ ] Fetch user data server-side using `getCurrentUser()` from `lib/auth.ts`
- [ ] Remove `console.log` statement

**Hint:** Look at how `WelcomeSection.tsx` fetches data server-side.

---

### Task 2: Fix the PostsList Component (components/PostsList.tsx)

**Current Problem:**
The PostsList component uses client-side data fetching with `useEffect`, which:
- Loses SSR benefits
- Can't properly access HttpOnly cookies
- Causes unnecessary loading states

**Issues to Fix:**
- [ ] Convert to a Server Component (remove `'use client'`)
- [ ] Use `getPosts()` from `lib/data.ts` instead of `getPostsClientSide()`
- [ ] Remove all React hooks (`useState`, `useEffect`)
- [ ] Remove `console.error` statement
- [ ] Make the component async

**Hint:** The component should look similar to `WelcomeSection.tsx`.

---

### Task 3: Implement Cache Revalidation (Bonus)

**Current State:**
The data fetching functions in `lib/data.ts` use `cacheTag()` but there's no way to revalidate the cache.

**Task:**
- [ ] Create a Server Action that uses `updateTag('posts')` to refresh post data
- [ ] Add a "Refresh Data" button to the dashboard that triggers this action

**Hint:** Look at `updateTag` from `next/cache`.

---

### Task 4: Security Review (Bonus)

Review the codebase and identify any security concerns:

1. Are there any places where client-side code trusts data it shouldn't?
2. Is the authentication implementation secure?
3. Are there any exposed sensitive values?

---

## Evaluation Criteria

### Must Have (Core Understanding)
- [ ] Successfully converted Header to Server Component
- [ ] Successfully converted PostsList to Server Component
- [ ] Removed all unnecessary `'use client'` directives
- [ ] Removed all `console.log` statements
- [ ] Application still works after changes

### Should Have (Good Understanding)
- [ ] Proper error handling
- [ ] Clean code without unused imports
- [ ] Understanding of why these changes matter

### Nice to Have (Excellent Understanding)
- [ ] Implemented cache revalidation
- [ ] Identified security concerns
- [ ] Added proper TypeScript types where missing

---

## File Structure

```
nextjs_test/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts    # Login endpoint
│   │   │   ├── logout/route.ts   # Logout endpoint
│   │   │   └── me/route.ts       # Get current user
│   │   └── data/
│   │       ├── posts/route.ts    # Posts data (auth required)
│   │       └── welcome/route.ts  # Welcome data (public)
│   ├── dashboard/
│   │   └── page.tsx              # Protected dashboard page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── globals.css
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── Header.tsx                # ⚠️ NEEDS FIXING
│   ├── LoginForm.tsx             # ✓ Correct (needs 'use client')
│   ├── LogoutButton.tsx          # ✓ Correct (needs 'use client')
│   ├── PostsList.tsx             # ⚠️ NEEDS FIXING
│   ├── PostsSkeleton.tsx         # ✓ Correct
│   ├── WelcomeSection.tsx        # ✓ Reference implementation
│   └── WelcomeSkeleton.tsx       # ✓ Correct
├── lib/
│   ├── auth.ts                   # Auth utilities & Server Actions
│   └── data.ts                   # Data fetching functions
├── proxy.ts                      # Route protection (Next.js 16)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Key Concepts

### Server Components (Default)
- Can be `async` and fetch data directly
- Have access to server-only resources (cookies, database, etc.)
- Cannot use hooks like `useState`, `useEffect`
- Cannot have event handlers like `onClick`

### Client Components ('use client')
- Needed for interactivity (forms, buttons, etc.)
- Can use React hooks
- Cannot directly access server resources
- Should be used sparingly, only when necessary

### When to Use Which?

| Use Server Component | Use Client Component |
|---------------------|---------------------|
| Fetching data | Forms with validation |
| Accessing cookies/headers | Interactive buttons |
| Reading from database | State management |
| Static content display | Event handlers |
| SEO-critical content | Browser APIs |

---

## Correct Patterns (Reference)

### Server-side Data Fetching (lib/data.ts)
```typescript
export async function getWelcomeData(): Promise<WelcomeData> {
  'use cache';
  cacheLife('minutes');
  cacheTag('welcome');

  const response = await fetch(`${getBaseUrl()}/api/data/welcome`);
  return response.json();
}
```

### Server Component with Data (components/WelcomeSection.tsx)
```typescript
export async function WelcomeSection() {
  const data = await getWelcomeData();

  return (
    <div className="card">
      <h2>{data.message}</h2>
      {/* ... */}
    </div>
  );
}
```

### Client Component for Interactivity (components/LoginForm.tsx)
```typescript
'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/auth';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  // ...
}
```

---

## Good Luck!

Remember: The goal is not just to make the code work, but to demonstrate understanding of **why** these patterns exist and **when** to use them.
