# Rule 05: Performance, Accessibility & SEO Standards

## 1. Core Web Vitals (CWV) Compliance

Applications must be built to meet Google's three Core Web Vitals thresholds:

### Largest Contentful Paint (LCP ≤ 2.5s)
* **Hero Content Optimization:** Always add `priority` (or `fetchPriority="high"`) to above-the-fold hero images in Next.js `<Image />`.
* **Server-First Rendering:** Keep hero sections inside Server Components without client-side loading wrappers.
* **Font Optimization:** Use `next/font` (Google or local) with `display: 'swap'` to eliminate render-blocking external font requests.

### Interaction to Next Paint (INP ≤ 200ms)
* **Non-Blocking State Updates:** Wrap expensive or non-urgent state transitions in React's `useTransition` to prevent main-thread freezing.
* **Lightweight Handlers:** Keep event handlers (`onClick`, `onKeyDown`) minimal. Offload heavy computations to web workers or background transitions.
* **Third-Party Script Deferral:** Load external analytics and widgets asynchronously using `next/script` with `strategy="lazyOnload"`.

### Cumulative Layout Shift (CLS ≤ 0.1)
* **Explicit Dimensions:** Always supply explicit `width` and `height` (or aspect-ratio CSS) on all images, videos, and embedded media.
* **Reserved Layout Space:** Use skeleton loaders that match the exact height and width of incoming content to prevent layout jumps.
* **No Injected Banners:** Never inject banners or notification bars above existing content after page load; reserve container space or render as overlays.

---

## 2. Bundle Optimization and Code Splitting

* **Minimize Client Boundaries:** Push `'use client'` to the leaf nodes of your component tree. Keeping components on the server reduces the client JavaScript payload.
* **Dynamic Code Splitting:** Lazy-load heavy, non-critical components (rich text editors, data visualization charts, modal dialogs) using `next/dynamic` or `React.lazy`.
* **Tree-Shaking Discipline:** Import individual named exports rather than entire library namespaces:
  ```typescript
  import { Check, X } from 'lucide-react'; // Correct
  ```

---

## 3. Accessibility (A11y) Standards (WCAG 2.2 AA)

* **Semantic HTML Hierarchy:**
  * Use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) instead of nested `<div>` wrappers.
  * Exactly one `<h1>` per page. Maintain a strict logical hierarchy (`<h1>` → `<h2>` → `<h3>`) without skipping levels.
* **Buttons vs. Links:**
  * Use `<button>` for actions, dialog triggers, and form submissions.
  * Use `<Link>` or `<a>` exclusively for route changes and URL navigation.
  * Never attach click listeners to raw `<div>` or `<span>` elements.
* **Keyboard Navigation & Focus:**
  * All interactive elements must be focusable via `Tab` and triggerable with `Enter` and `Space`.
  * Ensure visible focus indicators are never removed (`outline: none` without replacement is forbidden; use `focus-visible:ring-2`).
* **Modal Focus Trapping:** Dialogs and modals must trap keyboard focus while active, close when the `Escape` key is pressed, and return focus to the trigger button upon dismissal.
* **Touch Target Sizing:** Maintain a minimum interactive touch target size of 44x44px for buttons and links on touch devices (WCAG 2.2).
* **Form & Label Associations:** Every input must be linked to a `<label htmlFor="id">` or have an explicit `aria-label`.
* **Link Security:** External links (`target="_blank"`) must always include `rel="noopener noreferrer"`.
* **Decorative Icons:** Add `aria-hidden="true"` to visual icons and SVGs so screen readers do not announce raw SVG paths.
* **Color Contrast:** Maintain at least a 4.5:1 contrast ratio for normal body text and 3:1 for large text.

---

## 4. SEO & Metadata Architecture

* **Static Metadata:** Every route segment in `app/**/page.tsx` must export descriptive metadata:
  ```typescript
  export const metadata: Metadata = {
    title: 'Dashboard | MyApp',
    description: 'Manage your workspace analytics and team members.',
    openGraph: {
      title: 'Dashboard | MyApp',
      description: 'Manage your workspace analytics and team members.',
      images: ['/og-image.png'],
    },
  };
  ```
* **Dynamic Metadata:** For dynamic routes (e.g. `app/posts/[slug]/page.tsx`), export an async `generateMetadata` function fetching title and description for the active entity.
* **Search Engine Discovery:** Ensure `robots.ts` and `sitemap.ts` exist in the root of `src/app/` to facilitate proper search engine crawling.
* **Meaningful Alt Text:** Provide descriptive `alt` attributes on informational images; use empty `alt=""` only for purely decorative graphics.
