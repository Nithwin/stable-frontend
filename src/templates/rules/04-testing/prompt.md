# Rule 04: Testing and Quality Standards

## 1. The Testing Pyramid: When to Use What and Why

Adopt a layered testing strategy balancing execution speed, maintenance cost, and production confidence:

### 1. Unit Tests (Vitest)
* **What to Test:** Pure utility functions, formatters, sanitizers, validation schemas (Zod or vanilla), and isolated calculation logic.
* **Why:** Executes in milliseconds, runs on every save, and provides instant feedback without DOM overhead.
* **When:** Any file containing non-trivial data transformation or business logic must have a unit test.

### 2. Component Integration Tests (React Testing Library + Vitest)
* **What to Test:** User interactions, form submissions, accessibility announcements, dynamic state changes, and error rendering.
* **Why:** Tests components the way real users interact with them, ensuring UI reliability without testing implementation details.
* **When:** Every feature-level component containing user inputs, state transitions, or conditional rendering.

### 3. End-to-End (E2E) Tests (Playwright)
* **What to Test:** Critical business journeys (e.g. signup, login, onboarding, checkout, core CRUD workflows) and async Next.js Server Components.
* **Why:** Runs against a real production build in headless browsers, validating routing, server integration, and database operations.
* **When:** Reserve for the top 3–5 high-value user paths. Avoid writing hundreds of fragile E2E tests for minor visual details.

### 4. Automated Accessibility Tests (vitest-axe)
* **What to Test:** WCAG compliance on shared UI primitives and forms.
* **Why:** Catches missing labels, invalid ARIA roles, and color contrast defects automatically.

---

## 2. Best Practices for Writing Reliable Tests

### Test Behavior, Never Implementation Details
* Assert on what the user sees and interacts with, not on internal component state, private functions, or hook variables.
* If a refactor changes the component's internal code but preserves user behavior, tests must still pass without modification.

### Query Priority (Follow User Accessibility Hierarchy)
Always prefer accessible, user-facing queries over brittle selectors:
1. `getByRole` (e.g. `getByRole('button', { name: /submit/i })`, `getByRole('textbox', { name: /email/i })`)
2. `getByLabelText` (form inputs with associated labels)
3. `getByPlaceholderText` / `getByText`
4. `getByTestId` (use only as an absolute last resort when no accessible role or label exists)
* **Strictly Avoid:** CSS class selectors (`.my-btn`) or DOM tag traversals (`container.querySelector('div > span')`).

### User Interaction Realism
* Use `@testing-library/user-event` instead of `fireEvent` to accurately simulate real browser sequences (focus, keydown, keypress, keyup).
* Always `await` user-event calls: `await user.type(input, 'hello@example.com')`.

### Deterministic Mocking
* Mock at the network layer (using Mock Service Worker / MSW or `vi.fn()` on top-level API clients), never on internal React hooks.
* Reset all mocks between tests (`afterEach(() => vi.clearAllMocks())`) to prevent test pollution.

---

## 3. Test Colocation and File Conventions

* **Unit & Component Tests:** Colocate directly next to the file under test:
  * `src/features/auth/schemas/login.schema.ts` → `login.schema.test.ts`
  * `src/features/auth/components/login-form.tsx` → `login-form.test.tsx`
  * `src/lib/utils.ts` → `utils.test.ts`
* **E2E Tests:** Centralize in the root `e2e/` directory:
  * `e2e/auth-flow.spec.ts`
  * `e2e/dashboard-navigation.spec.ts`

---

## 4. Mandatory Edge Case Test Checklist

When creating tests for any feature or form, verify that test suites cover:

- [ ] **Happy Path:** Valid input completes submission and triggers expected success state or redirect.
- [ ] **Validation Rejection:** Empty or invalid fields trigger accessible error messages without submitting.
- [ ] **Submit Button Locking:** Submit button becomes disabled during in-flight submission; multiple rapid clicks fire only one network call.
- [ ] **Server Failure Recovery:** API returning 500 displays an error banner and presents an actionable retry button that successfully re-triggers the action.
- [ ] **Empty States:** When API returns an empty array `[]` or null, appropriate empty state messaging and CTAs are rendered.
- [ ] **Boundary Values:** Input edge cases (min length - 1, max length + 1, 0 items, 1 item).
