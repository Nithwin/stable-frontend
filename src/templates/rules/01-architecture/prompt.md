# Rule 01: Architecture and Directory Standards

## 1. Project Directory Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── input.tsx
│   └── feedback/
│       ├── empty-state.tsx
│       └── error-boundary.tsx
├── features/
│   └── auth/
│       ├── components/
│       │   ├── auth-card.tsx
│       │   └── login-form.tsx
│       ├── hooks/
│       │   └── use-auth.ts
│       ├── schemas/
│       │   └── auth.schema.ts
│       ├── types/
│       │   └── auth.types.ts
│       └── tests/
│           └── login-form.test.tsx
├── hooks/
│   ├── use-debounce.ts
│   └── use-media-query.ts
├── lib/
│   ├── api-client.ts
│   ├── db.ts
│   └── utils.ts
├── providers/
│   ├── query-provider.tsx
│   └── theme-provider.tsx
├── config/
│   ├── constants.ts
│   └── site.ts
└── types/
    └── index.ts
```

## 2. Directory Responsibilities and Usage

### `app/`
* **Contents:** Route segments (`page.tsx`), layouts (`layout.tsx`), route handlers (`route.ts`), and route-level error boundaries (`error.tsx`, `not-found.tsx`).
* **Purpose:** Serves exclusively as the routing and top-level composition layer.
* **Rules:** Keep route pages thin (under 50 lines). Pages should only fetch high-level data and assemble feature components. Avoid placing complex state management, raw forms, or extensive JSX styling directly inside page files.

### `components/`
* **Contents:** Universal, domain-agnostic UI elements (buttons, modals, form inputs, tooltips, cards).
* **Purpose:** Houses design system primitives shared across multiple features.
* **Rules:** Components in this directory must remain stateless or handle only localized presentation state. They must never import from `features/` to prevent circular dependencies. Subdivide by role when the directory grows (such as `ui/`, `feedback/`, `layout/`).

### `features/`
* **Contents:** Business domain modules containing dedicated subdirectories for `components/`, `hooks/`, `schemas/`, `types/`, and `tests/`.
* **Purpose:** Encapsulates domain logic into self-contained modules (such as `auth`, `billing`, `projects`, `users`).
* **Rules:** If a component, hook, or schema is used solely within one business domain, it must reside inside that feature folder. Cross-feature imports should be minimized; shared utilities belong in `lib/` or `components/`.

### `hooks/`
* **Contents:** Reusable, domain-agnostic custom React hooks (such as `useDebounce`, `useMediaQuery`, `useLocalStorage`).
* **Purpose:** Encapsulates stateful browser interactions or utility logic shared across multiple features.
* **Rules:** Feature-specific hooks (such as `useInvoiceDetails`) must stay inside `features/[name]/hooks/`.

### `lib/`
* **Contents:** Third-party client instances (Prisma, Supabase, Axios), shared helper functions, formatters, and sanitizers.
* **Purpose:** Acts as the integration layer between the application and external libraries or utilities.
* **Rules:** Functions in `lib/` must be pure and deterministic where possible, making them straightforward to unit test.

### `providers/`
* **Contents:** React Context providers and client wrappers (such as TanStack Query provider, Theme provider, Auth provider).
* **Purpose:** Manages global application context at the root layout level.
* **Rules:** Always mark provider files with `'use client'` when they wrap client-side state.

### `config/`
* **Contents:** Environment variable maps, static site metadata, navigation links, and application constants.
* **Purpose:** Centralizes static configuration values to eliminate magic strings across the codebase.
* **Rules:** Validate environment variables at boot using schemas (such as Zod) to catch missing keys early.

### `types/`
* **Contents:** Shared global TypeScript interfaces, utility types, and ambient declarations.
* **Purpose:** Provides unified type definitions that span across multiple domains.
* **Rules:** Feature-specific types must remain inside their respective `features/[name]/types/` folder.

## 3. Server-Client Boundary Standards (Next.js App Router)

* **Leaf Component Rule:** Keep `'use client'` strictly at the lowest interactive leaf components in the DOM tree (e.g. `<ThemeToggle />`, `<SearchInput />`). Never mark top-level layouts or page roots with `'use client'`.
* **JSON-Serializable Props:** All props passing across the Server-to-Client boundary must be serializable JSON values. Never pass functions, class instances, or raw `Date` objects (convert `Date` objects to ISO strings).
* **Server Data Isolation:** Any data-access or database client module in `lib/` must include `import 'server-only'` to guarantee private credentials cannot be bundled into client builds.

---

## 4. General Architecture Guidelines

* **Colocation:** Place tests, schemas, and subcomponents as close as possible to the code that uses them.
* **Maximum File Length:** Target under 150 lines per file. Once a file exceeds this threshold, extract subcomponents or separate logic into hooks.
* **Strict Import Hierarchy:** The import direction must always flow inward:
  `app/` -> `features/` -> `components/` -> `lib/` / `hooks/` / `types/`. Shared components must never depend on features.
