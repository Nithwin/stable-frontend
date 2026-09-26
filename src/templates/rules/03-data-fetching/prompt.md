# Rule 03: Data Fetching & Async Resilience

## 1. Server Components vs. Client Components (Next.js)
- **Default to React Server Components (RSC):** Fetch data directly on the server whenever possible for optimal speed and SEO.
- **Minimize `"use client"`:** Only mark components as client components when they require browser event listeners (`onClick`, `onChange`), browser APIs (`localStorage`), or React state hooks (`useState`, `useEffect`). Push client boundaries to the leaves of the component tree.

## 2. The 4 Mandatory Async States
Never render an async screen without handling all 4 states:
1. **Loading:** Render a skeleton loader or spinner. Avoid blank empty flashes.
2. **Error:** Render a meaningful error card with a **"Retry"** action button.
3. **Empty:** When an array or query returns `[]` or `null`, render a helpful empty state with a call-to-action (not a blank screen).
4. **Success:** Render the expected content safely.

## 3. Prevent Race Conditions (Client Fetching)
Always cancel in-flight requests when a component unmounts or query parameters change:

```typescript
useEffect(() => {
  const controller = new AbortController();

  async function loadData() {
    try {
      const res = await fetch('/api/data', { signal: controller.signal });
      const data = await res.json();
      setData(data);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    }
  }

  loadData();
  return () => controller.abort();
}, [query]);
```
