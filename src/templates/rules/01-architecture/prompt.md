# Rule 01: Architecture & Folder Standards

## 1. Feature-First Colocation
Organize the codebase by **business domain / feature**, not by technical type.

```text
src/
├── app/                      # Thin routing layer (pages, route handlers, layouts)
│   ├── (auth)/login/page.tsx # Minimal page file: only composes feature components
│   └── dashboard/page.tsx
├── components/               # Purely generic, shared UI primitives (Button, Modal, Input)
│   └── ui/
├── features/                 # Domain-specific modules (where 90% of code lives)
│   └── auth/
│       ├── components/       # Feature-specific UI (LoginForm.tsx, AuthCard.tsx)
│       ├── hooks/            # Feature-specific logic (useAuth.ts)
│       ├── schemas/          # Feature validation schemas (login.schema.ts)
│       ├── types/            # TypeScript definitions (auth.types.ts)
│       └── tests/            # Feature tests (LoginForm.test.tsx)
└── lib/                      # Cross-cutting utilities (api client, utils, formatters)
```

## 2. File Responsibility Rules
- **Pages (`app/**/page.tsx`):** Must remain thin wrappers (<50 lines). They fetch top-level route data and render feature components. Never put complex state or raw form handlers inside `page.tsx`.
- **UI Components (`components/ui`):** Dumb, stateless (or minimally stateful), reusable primitives without business logic.
- **Feature Components (`features/[name]/components`):** Connect business logic hooks to UI components.
- **Maximum File Length:** Target under 150 lines per file. When a component exceeds 150 lines, split sub-components or extract hooks.
