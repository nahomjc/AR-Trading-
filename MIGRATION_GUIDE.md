# Next.js 15 to 16 Migration Guide

## Steps Completed

1. ✅ Updated `package.json` dependencies:
   - `next`: `15.4.1` → `^16.0.0`
   - `eslint-config-next`: `15.4.1` → `^16.0.0`
   - React versions remain at `^19.0.0` (compatible)

2. ✅ Updated `next.config.ts`:
   - Changed `images.domains` to `images.remotePatterns` (recommended in Next.js 16)

## Next Steps

### 1. Install Updated Dependencies

Run the following command to install Next.js 16:

```bash
npm install
```

Or if using pnpm:

```bash
pnpm install
```

### 2. Run Next.js Codemod (Recommended)

Next.js provides an automated migration tool:

```bash
npx @next/codemod@latest upgrade
```

This will automatically update your code for Next.js 16 compatibility.

### 3. Breaking Changes to Be Aware Of

#### Async Request APIs (Server Components Only)
In Next.js 16, these APIs are now async in Server Components:
- `cookies()`
- `headers()`
- `draftMode()`
- `params` (in page/layout props)
- `searchParams` (in page props)

**Note:** Your current code uses `useParams()` in client components, which is unaffected.

#### Example Migration (if you have Server Components):

**Before (Next.js 15):**
```typescript
export default function Page({ params, searchParams }) {
  const id = params.id;
  const query = searchParams.query;
  // ...
}
```

**After (Next.js 16):**
```typescript
export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const { query } = await searchParams;
  // ...
}
```

### 4. Test Your Application

After installation, test your application:

```bash
npm run dev
```

Check for:
- ✅ Application starts without errors
- ✅ All pages load correctly
- ✅ Images load properly
- ✅ Navigation works
- ✅ Forms and interactions work

### 5. Build Test

Test the production build:

```bash
npm run build
```

## Current Code Status

✅ **Client Components**: Your code uses `"use client"` directives, so `useParams()` and other client hooks work as before.

✅ **Image Configuration**: Updated to use `remotePatterns` instead of deprecated `domains`.

✅ **No Server Component Breaking Changes**: Your current codebase doesn't appear to use server-side `params` or `searchParams` directly, so no immediate changes needed.

## Additional Notes

- Next.js 16 maintains backward compatibility for most client-side code
- The main breaking changes affect Server Components and API routes
- Your current setup should work with minimal changes

