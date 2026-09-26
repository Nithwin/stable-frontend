# Rule 05: Performance, A11y & SEO Standards

## 1. Accessibility (A11y) First
- **Semantic HTML:** Always use semantic elements (`<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) instead of generic `<div>` containers.
- **Buttons vs Links:** Use `<button>` for state changes or actions. Use `<a>` / `<Link>` for navigation. Never place click listeners on raw `<div>` elements without proper `role` and keyboard listeners (`onKeyDown`).
- **Form Controls:** Every input must have an associated `<label htmlFor="...">` or `aria-label`.

## 2. Layout Shift & Image Optimization
- Always use Next.js `<Image />` or explicit `width` and `height` attributes to eliminate Cumulative Layout Shift (CLS).
- Provide meaningful `alt` text on all content images; use `alt=""` only for purely decorative graphics.

## 3. SEO & Metadata
- Every page segment in `app/**/page.tsx` must export a descriptive `metadata` object with proper title and description:

```typescript
export const metadata = {
  title: 'Dashboard | MyApp',
  description: 'Manage your workspace analytics and team members.',
};
```
