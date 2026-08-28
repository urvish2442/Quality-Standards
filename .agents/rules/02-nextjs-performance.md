# Next.js 15 & Performance Rules

---

## 1. Next.js App Router & Rendering
- **Server Components First**: Prefer Server Components by default.
- **Client Components**: Use `"use client"` only when necessary (state, event handlers, browser APIs, animations, forms). Never make entire pages or layouts client-side.

---

## 2. Performance Optimization
- **Rendering Optimization**:
  - Use `useMemo` only when expensive calculations exist.
  - Use `useCallback` only when callback stability is required.
  - Use `React.memo` only for expensive component subtrees.
  - Avoid unnecessary re-renders and inline function declarations inside deeply nested list iterators.
- **Lazy Loading**:
  - Lazy load heavy components (Charts, Editors, Maps, Large Modals) using Next.js `dynamic()`:
    ```js
    const Chart = dynamic(() => import("./Chart"));
    ```

---

## 3. Data Fetching & API Layer
- Prefer Server Components for data fetching where possible.
- **Shared Axios Service**:
  - Use `axios` via a shared instance in `services/` (e.g., `services/auth.js`, `services/users.js`).
  - Configure `baseURL` from `process.env`, timeouts, request/response interceptors, auth headers, and error normalization.
  - Never call `axios` directly inside UI components. UI components must only consume services.
- **Route Handlers**: Use App Router Route Handlers for server APIs when required.
- **Effect Rules**: Never fetch data inside `useEffect` if a Server Component or service can handle it.

---

## 4. SEO & Metadata
- Every page must include appropriate metadata (`title`, `description`, `keywords`, canonical URL, Open Graph, Twitter Cards, robots, alternates).
- Use `generateMetadata()` dynamic function when metadata depends on dynamic data.
- **Structured Data & Semantic HTML**:
  - Maintain single `<h1>` per page with proper heading hierarchy.
  - Use standard semantic HTML tags (`<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`).
  - Generate `sitemap.xml` and `robots.txt`. Use JSON-LD structured data where applicable.

---

## 5. Assets (Images, Fonts, Links)
- **Images**: Always use `next/image` (Never raw `<img>`). Specify `width`, `height`, `alt`, and loading strategy. Use `priority` only for above-the-fold hero images.
- **Fonts**: Always use `next/font`. Never load font styles via external Google CDN links.
- **Links**: Always use `next/link` for internal app navigation. Never use raw `<a>` tags for internal pages.

---

## 6. Authentication & Error Handling
- **Auth**: Never expose secrets. Use HTTP-only cookies, Server Actions, Middleware, and Protected Routes.
- **Error States**: Always handle Loading, Error, Empty, and Success states. Utilize `error.js`, `not-found.js`, and `loading.js` files effectively.
