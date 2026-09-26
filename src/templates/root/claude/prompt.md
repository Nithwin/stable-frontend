# Claude Code Guidelines (stable-frontend)

This project strictly adheres to **stable-frontend** production stability standards.

## Project Directives
1. **Always consult `AGENTS.md`** for the rule index.
2. Read the specific rule file under `.agents/rules/` relevant to the feature you are working on before modifying code:
   - Architecture & Layout: `.agents/rules/01-architecture.md`
   - Forms & Input Validation: `.agents/rules/02-validation.md`
   - Data Fetching & Async Handling: `.agents/rules/03-data-fetching.md`
   - Testing & Edge Cases: `.agents/rules/04-testing.md`
   - Performance & Accessibility: `.agents/rules/05-performance.md`

## Build & Test Commands
- **Typecheck:** `npm run typecheck` (or `npx tsc --noEmit`)
- **Test:** `npm test`
- **Build:** `npm run build`

Always run typecheck and test before declaring any task complete.
