# Rule 06: Security, Authentication & Vulnerability Prevention

## 1. Authentication and Token Storage

* **Cookie-Based Storage:** Store JWTs, session tokens, and refresh tokens strictly in server-managed cookies with `httpOnly`, `Secure`, and `SameSite=Lax` (or `SameSite=Strict`) attributes.
* **Prohibit Web Storage for Secrets:** Never store authentication tokens, API keys, or private user credentials in `localStorage` or `sessionStorage`. Any script injected via an XSS attack can instantly read Web Storage.
* **CSRF Mitigation:** For state-mutating requests, rely on `SameSite` cookies and verify request origin/headers or Anti-CSRF tokens.
* **Client Logout Invalidation:** Ensure logout actions invalidate the session on the server and clear authentication cookies, not merely remove local client state.

---

## 2. Cross-Site Scripting (XSS) and Content Sanitization

* **Prohibit Raw HTML Injection:** Do not use `dangerouslySetInnerHTML` unless the content is explicitly sanitized using a battle-tested library (such as `DOMPurify` or `isomorphic-dompurify`).
* **URL Scheme Validation:** Validate all dynamic URLs before binding them to `<a href="...">`, `<iframe src="...">`, or router redirects. Strictly reject `javascript:`, `data:`, or `vbscript:` schemes; allow only `https://` or `http://`.
* **Tabnabbing Defense:** Any link using `target="_blank"` must include `rel="noopener noreferrer"` to prevent the opened page from tampering with `window.opener`.
* **SVG Security:** Never render untrusted, user-uploaded SVGs directly inline in the DOM. SVGs can execute embedded `<script>` tags. Use an image tag (`<img src="...">`) or sanitize SVGs through DOMPurify with SVG profiles.

---

## 3. Server Actions and API Route Protection (Next.js)

* **Zero-Trust Server Actions:** Treat every Server Action as a public HTTP POST endpoint. Client-side hiding of a button does not protect the action from direct network invocations.
* **In-Action Authentication:** Re-verify caller authentication and check specific permissions inside the Server Action before executing any database mutation.
* **Input Schema Validation:** Parse and validate all incoming action arguments against a strict schema (such as Zod) before utilizing them in queries or mutations.
* **Safe Data Projection:** Never return full database records or entity models to Client Components. Project only the minimal public fields needed for presentation (e.g. `{ id, displayName }` instead of `{ ...userRecord, passwordHash, internalEmail }`).

---

## 4. Environment Variables and Data Isolation

* **Isolate Server Modules:** Place `import 'server-only'` at the top of data-access modules, database clients (Prisma, Drizzle, Supabase), and secret-handling utilities to ensure they cannot be imported into Client Components.
* **Client Env Var Discipline:** Never prefix secrets with `NEXT_PUBLIC_`. Reserve `NEXT_PUBLIC_` exclusively for truly public constants (e.g. public analytics keys, domain URLs).
* **Boot-Time Env Validation:** Validate required environment variables at build or boot time using a schema to fail fast if required configuration is missing.

---

## 5. Security Checklist

Before finalizing any frontend feature or data mutation, verify:

- [ ] Authentication tokens reside in `httpOnly` secure cookies, never in `localStorage`.
- [ ] No `dangerouslySetInnerHTML` exists without explicit `DOMPurify` sanitization.
- [ ] All `target="_blank"` links include `rel="noopener noreferrer"`.
- [ ] Dynamic URLs bound to `href` or redirects reject `javascript:` schemes.
- [ ] Server Actions verify user authentication and validate input arguments with a schema.
- [ ] Database record projections strip private fields before passing to Client Components.
- [ ] Server-only utilities and database clients include `import 'server-only'`.
