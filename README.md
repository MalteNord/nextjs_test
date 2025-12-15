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

## 📊 Completion Status: ~85% Complete

### Summary
- ✅ **Task 1 (Header Component)**: COMPLETE - All 4 requirements fixed
- ✅ **Task 2 (PostsList Component)**: COMPLETE - All 5 requirements fixed
- ⚠️ **Task 3 (Cache Revalidation)**: PARTIAL - 1 of 3 subtasks complete
- ❓ **Task 4 (Security Review)**: Not documented

### Core Requirements: **PASSING** ✅
All "Must Have" criteria met (with one minor cleanup item: `console.error` in lib/actions.ts:69)

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

### Task 1: Fix the Header Component (components/Header.tsx) ✅ **COMPLETED**

**Current Problem:**
The Header component is marked as `'use client'` but it doesn't need any client-side interactivity. It only displays user information and navigation links.

**Issues to Fix:**
- [x] Remove unnecessary `'use client'` directive ✅
- [x] Remove `useEffect` and `useState` for user fetching ✅
- [x] Fetch user data server-side using `getCurrentUser()` from `lib/auth.ts` ✅
- [x] Remove `console.log` statement ✅

**Status:** Successfully converted to async server component (line 24). All requirements met.

**Hint:** Look at how `WelcomeSection.tsx` fetches data server-side.

---

### Task 2: Fix the PostsList Component (components/PostsList.tsx) ✅ **COMPLETED**

**Current Problem:**
The PostsList component uses client-side data fetching with `useEffect`, which:
- Loses SSR benefits
- Can't properly access HttpOnly cookies (you'll see "Failed to fetch posts" error)
- Causes unnecessary loading states

**Issues to Fix:**
- [x] Convert to a Server Component (remove `'use client'`) ✅
- [x] Create a proper `getPosts()` function in `lib/data-server.ts` that fetches server-side with auth ✅
- [x] Remove all React hooks (`useState`, `useEffect`) ✅
- [x] Remove `console.error` statement ✅
- [x] Make the component async ✅

**Status:** Successfully converted to async server component (line 18). Properly implemented `getPosts()` in `lib/data-server.ts` (lines 61-65) with 'use cache', cacheLife, cacheTag, and auth cookie handling.

**Note:** Instructional comments still present in file (lines 1-15) - consider removing for production.

**Hint:** The component should look similar to `WelcomeSection.tsx`. Look at how `getWelcomeData()` in `lib/data-server.ts` uses `'use cache'`.

---

### Task 3: Implement Cache Revalidation (Bonus) ⚠️ **PARTIAL (1/3 Complete)**

**Current State:**
The data fetching functions use `cacheTag()` but there's no way to refresh/clear the cache.

**Tasks:**
- [x] Add `revalidateTag('posts', '/')` to `logoutAction` in `lib/actions.ts` to clear cached posts on logout ✅
- [ ] Create a Server Action that uses `updateTag('posts')` to refresh post data (keeps cache warm) ❌ **NOT DONE**
- [ ] Add a "Refresh Data" button to the dashboard that triggers the refresh action ❌ **NOT DONE**

**Status:** Successfully added `revalidateTag('posts', 'max')` to logout action (lib/actions.ts:82). Missing: updateTag action and refresh button in dashboard.

**Hint:** Use `revalidateTag` to CLEAR cache (invalidate), use `updateTag` to REFRESH cache (re-fetch in background).

---

### Task 4: Security Review (Bonus)

Review the codebase and identify any security concerns:

1. Are there any places where client-side code trusts data it shouldn't?
2. Is the authentication implementation secure?
3. Are there any exposed sensitive values?

---

## Evaluation Criteria

### Must Have (Core Understanding)
- [x] Successfully converted Header to Server Component ✅
- [x] Successfully converted PostsList to Server Component ✅
- [x] Removed all unnecessary `'use client'` directives ✅
- [x] Removed all `console.log` statements ⚠️ **One `console.error` remains in `lib/actions.ts:69`**
- [x] Application still works after changes ✅

### Should Have (Good Understanding)
- [x] Proper error handling ✅
- [x] Clean code without unused imports ✅
- [x] Understanding of why these changes matter ✅

### Nice to Have (Excellent Understanding)
- [x] Implemented cache revalidation ⚠️ **Partial: 1 of 3 subtasks (33%)**
- [ ] Identified security concerns ❌ **Not documented**
- [x] Added proper TypeScript types where missing ✅

---

## 🔧 Remaining Work

### To Achieve 100% Completion:

#### Critical (for full "Must Have" score):
1. **Remove `console.error`** in `lib/actions.ts:69`

#### Bonus Tasks (for "Excellent" rating):
2. **Complete Task 3**: Implement cache refresh functionality
   - Create a Server Action using `updateTag('posts')` in `lib/actions.ts`
   - Add a "Refresh Data" button to the dashboard (in `app/dashboard/Dashboard.tsx`)
   - Wire up the button to call the updateTag action

3. **Task 4**: Document any security concerns found during code review

#### Cleanup (optional but recommended):
4. **Remove instructional comments** from:
   - `components/Header.tsx` (lines 1-13)
   - `components/PostsList.tsx` (lines 1-15)

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
│   ├── Header.tsx                # ✅ FIXED (server component)
│   ├── LoginForm.tsx             # ✓ Correct (needs 'use client')
│   ├── LogoutButton.tsx          # ✓ Correct (needs 'use client')
│   ├── PostsList.tsx             # ✅ FIXED (server component)
│   ├── PostsSkeleton.tsx         # ✓ Correct
│   ├── WelcomeSection.tsx        # ✓ Reference implementation
│   └── WelcomeSkeleton.tsx       # ✓ Correct
├── lib/
│   ├── actions.ts                # Server Actions (login, logout)
│   ├── auth.ts                   # Auth utilities (getCurrentUser)
│   ├── data.ts                   # Types & client-side fetch (wrong pattern)
│   └── data-server.ts            # Server-side data fetching (correct pattern)
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

### Server-side Data Fetching (lib/data-server.ts)
```typescript
export async function getWelcomeData(): Promise<WelcomeData> {
  'use cache';
  cacheLife('minutes');
  cacheTag('welcome');

  const response = await fetch(`${getBaseUrl()}/api/data/welcome`);
  return response.json();
}
```

### Server-side Data Fetching with Auth (example for getPosts)
```typescript
export async function getPosts(): Promise<{ posts: Post[]; fetchedAt: string }> {
  'use cache: private';  // Use 'private' when using cookies
  cacheLife('minutes');
  cacheTag('posts');

  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  const response = await fetch(`${getBaseUrl()}/api/data/posts`, {
    headers: { Cookie: `auth-token=${token}` },
  });
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
import { loginAction } from '@/lib/actions';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  // ...
}
```

---

## Good Luck!

Remember: The goal is not just to make the code work, but to demonstrate understanding of **why** these patterns exist and **when** to use them.
