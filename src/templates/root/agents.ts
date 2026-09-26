import { RuleTemplate } from '../../types.js';

export const agentsRouterTemplate: RuleTemplate = {
  id: 'root-agents',
  targetPath: 'AGENTS.md',
  description: 'Primary AI Agent engineering router and project conventions',
  getContent: () => `# AI Development Guidelines (stable-frontend)

This project follows **stable-frontend** engineering standards to ensure high reliability, modularity, and zero regression.

## 🧭 Rule Router (Read Before Coding)

To minimize token usage, detailed guidelines are organized into dedicated sub-rules under \`.agents/rules/\`. 
**Identify your current task and read the corresponding rule file before generating code:**

| Task / Domain | Rule File | What It Covers |
| :--- | :--- | :--- |
| **Project Structure & Files** | [\`.agents/rules/01-architecture.md\`](.agents/rules/01-architecture.md) | Feature-based colocation, folder layout, file responsibilities |
| **Forms, Inputs & Validation** | [\`.agents/rules/02-validation.md\`](.agents/rules/02-validation.md) | Schema-first validation (Zod), input trimming, double-submit protection |
| **Data Fetching & Async** | [\`.agents/rules/03-data-fetching.md\`](.agents/rules/03-data-fetching.md) | Server vs Client components, AbortController, Loading/Error/Empty states |
| **Testing & Verification** | [\`.agents/rules/04-testing.md\`](.agents/rules/04-testing.md) | Unit & integration tests, edge cases checklist, testing patterns |
| **Performance & A11y** | [\`.agents/rules/05-performance.md\`](.agents/rules/05-performance.md) | Core Web Vitals, accessibility standards (ARIA), image & layout stability |

---

## ⚡ Core Rules (Always Enforced)

1. **Defensive by Default:** Always handle \`Loading\`, \`Error\`, and \`Empty\` states for every dynamic screen. Never assume API data is non-null.
2. **Colocation First:** Keep components, hooks, schemas, and tests together inside their respective feature directory.
3. **No Monolithic Files:** Break components down once they exceed ~150 lines. Separate UI presentation from business logic hooks.
4. **Verified Code:** When creating or modifying a feature, write corresponding tests covering both happy path and failure/edge cases.
`,
};
