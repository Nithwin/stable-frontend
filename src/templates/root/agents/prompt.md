# AI Development Guidelines (stable-frontend)

This project follows **stable-frontend** engineering standards to ensure high reliability, modularity, and zero regression.

## Rule Router (Read Before Coding)

To minimize token usage, detailed guidelines are organized into dedicated sub-rules under `.agents/rules/`. Read the relevant rule file before generating code based on the project scope:

* **Simple Websites (Marketing / Landing Pages / Static):** Prioritize folder and file architecture (`01-architecture.md`) and performance/SEO standards (`05-performance.md`) to guarantee fast page loads and high search visibility. Automated tests are generally optional; confirm with the user before writing tests.
* **Web Applications (Dynamic / SaaS / Fullstack):** Apply all applicable rules. Consult the user regarding architectural decisions and external libraries before adding them, explaining why each dependency or pattern is necessary.

{{RULES_TABLE}}


---

## Core Rules (Always Enforced)

1. **Security & Secrets:** Never hardcode, commit, or expose secret keys, API tokens, or private credentials. Always load sensitive values through environment variables and verify that `.env*` files are listed in `.gitignore`.