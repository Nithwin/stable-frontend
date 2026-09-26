# Rule 03: Data Fetching and Async Resilience

## 1. Server-Side Data Fetching (Next.js Server Components)

Default to fetching data directly on the server to optimize performance and search engine indexing.

* **Async Server Components:** Fetch data directly inside components using `async/await` without `useEffect` or client state.
* **Eliminate Waterfalls:** Execute independent requests in parallel using `Promise.all` rather than sequential `await` calls.
* **Progressive Streaming:** Wrap slow async components in `<Suspense fallback={<Skeleton />}>` or use route-level `loading.tsx` to stream UI chunks without blocking page navigation.
* **Explicit Caching (Next.js 15+):** `fetch` defaults to `no-store`. Explicitly define caching policies when data is cacheable: `{ cache: 'force-cache' }` or `{ next: { revalidate: 3600 } }`.
* **Server Action Authorization & Validation:** Treat all Server Actions as public API endpoints. Always verify session authentication and user permissions inside the action before performing mutations. Validate all input arguments against a schema (e.g. Zod).
* **Safe Prop & Data Projection:** Never pass full database record rows or sensitive fields to Client Components. Project only minimal, necessary public properties (e.g. `{ id, name }` instead of `{ ...userRecord, passwordHash, internalEmail }`).

---

## 2. Client-Side Fetching and Request Management

Use client-side fetching only when requests depend on interactive browser state, live user inputs, or polling.

* **Race Condition Prevention:** When fetching in `useEffect`, bind an `AbortController` to cancel in-flight requests on dependency change or unmount:
  ```typescript
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
  ```
* **HTTP Status Verification:** `fetch()` does not reject on HTTP 4xx or 5xx responses. Always verify `res.ok` before parsing the response body:
  ```typescript
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  const data = await res.json();
  ```
* **Ignore Abort Errors:** Gracefully catch and ignore `AbortError` instances when unmounting to avoid setting state or triggering false error banners.

---

## 3. The 4 Mandatory Async UI States

Every view that depends on asynchronous data must explicitly handle and display all four states:

### 1. Loading State
* Render skeleton loaders matching the exact shape and dimensions of the expected content.
* Avoid generic full-screen spinners or layout-collapsing empty space to eliminate Cumulative Layout Shift (CLS).

### 2. Error State
* Display a contextual error message explaining what failed.
* Provide an actionable **"Try Again"** button allowing the user to re-trigger the request without refreshing the entire page.
* In Next.js, place route-level `error.tsx` (marked `'use client'`) to isolate failures to the active segment while keeping parent navigation intact.

### 3. Empty State
* Differentiate between "no items created yet" (first-time user onboarding) and "no results matching current search/filter".
* Always provide a clear call-to-action (CTA), such as "Create new item" or "Clear search filters".

### 4. Success State
* Handle optional and nullable fields defensively with fallback defaults (e.g. `data.items ?? []`).
* Never assume deeply nested objects exist without null checks or optional chaining (`?.`).

---

## 4. Async Resilience Checklist

Before completing any data-fetching component, verify:

- [ ] `res.ok` is checked before parsing JSON.
- [ ] Stale in-flight requests are cancelled when query parameters or search terms change.
- [ ] Skeletons match final content dimensions to eliminate visual layout shift.
- [ ] No browser-only APIs (`window`, `localStorage`) or dynamic timestamps are rendered during SSR without safe guards.
- [ ] Unmounted components never attempt to update state after promise resolution.
