# Rule 02: Form Validation & Edge Case Standards

## 1. Schema-First Validation
Every form, user input, and external API payload **must** be validated against a strict schema (e.g. Zod).

```typescript
// features/auth/schemas/login.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

## 2. Mandatory Form Lifecycle States
Every form component must explicitly handle and represent the following states:
1. **Idle / Pristine:** Default clean state.
2. **Submitting / Pending:** 
   - All inputs and buttons must have `disabled={isSubmitting}`.
   - Prevent duplicate submits (submit locking).
3. **Field-Level Errors:** Display contextual error messages directly below the corresponding field.
4. **Server / Network Error:** Display an alert banner for non-field errors (e.g., 401 Unauthorized, 500 Server Error).
5. **Success Feedback:** Clear confirmation (toast, redirect, or inline success message).

## 3. Input Sanitization & Accessibility
- Always apply `.trim()` to string inputs to prevent whitespace-only submissions.
- Always link input fields to error labels using `aria-invalid` and `aria-describedby`.
