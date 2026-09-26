# Rule 04: Testing & Quality Standards

## 1. Testing Pyramid for Frontend
1. **Unit Tests (Fast & Isolated):** Test validation schemas (Zod), business logic utilities, and custom hooks.
2. **Component Integration Tests:** Test user interactions using React Testing Library or Vitest:
   - Form submission with valid data.
   - Form submission with invalid inputs (checking error messages).
   - Loading state behavior (buttons disabled).
   - Error recovery (retry button).

## 2. Test File Placement & Naming
Colocate tests directly next to their subject:
- `src/features/auth/schemas/login.schema.ts` -> `login.schema.test.ts`
- `src/features/auth/components/LoginForm.tsx` -> `LoginForm.test.tsx`

## 3. Mandatory Edge Case Test Checklist
When creating or updating any component or feature, ensure tests verify:
- [ ] **Happy path:** Valid user action leads to expected state change.
- [ ] **Boundary values:** 0 items, 1 item, max items.
- [ ] **Network / Server failure:** Component gracefully renders error state without crashing.
- [ ] **Empty response:** Proper empty-state message is displayed.
- [ ] **Double-click:** Verify submit button cannot be triggered multiple times simultaneously.
