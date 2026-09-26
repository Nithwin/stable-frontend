# AI Development Guidelines (stable-frontend)

This project follows **stable-frontend** engineering standards to ensure high reliability, modularity, and zero regression.

## Rule Router (Read Before Coding)

To minimize token usage, detailed guidelines are organized into dedicated sub-rules under `.agents/rules/`. Read the relevant rule file before generating code based on the project scope:

* **Simple Websites (Marketing / Landing Pages / Static):** Prioritize folder and file architecture (`01-architecture.md`) and performance/SEO standards (`05-performance.md`) to guarantee fast page loads and high search visibility. Automated tests are generally optional; confirm with the user before writing tests.
* **Web Applications (Dynamic / SaaS / Fullstack):** Apply all applicable rules. Consult the user regarding architectural decisions and external libraries before adding them, explaining why each dependency or pattern is necessary.

{{RULES_TABLE}}


---

## Core Rules (Always Enforced)

1. **Security & Secrets:** Never hardcode, commit, or expose secret keys, API tokens, or private credentials. Strictly adhere to `06-security.md` for cookie-based authentication, XSS prevention, sanitized links, and Server Action authorization.

2. **Code Craftsmanship & Comments (Self-Documenting Code):**
   * Write self-documenting code with meaningful, pronounceable names.
   * Do NOT write "what" comments narrating obvious syntax (e.g. `// set state to false`, `// component returns JSX`).
   * DO write "why" comments explaining non-obvious rationale, business logic constraints, or workarounds for third-party bugs.
   * Provide concise TSDoc for exported hooks, shared UI primitives, and complex utility interfaces.
   * Never leave commented-out dead code; delete unused code completely.

3. **Dependency & Web Standards Discipline:**
   * Favor native modern Web APIs (`Intl`, native `fetch`, `crypto.randomUUID()`, `URL`, CSS Grid/Flex) over adding third-party npm packages.
   * Consult the user before introducing new external libraries, explaining why native solutions are insufficient.