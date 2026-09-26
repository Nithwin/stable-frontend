# Claude Code Guidelines (stable-frontend)

Always read and adhere to `AGENTS.md` for project architecture, validation, and engineering standards.

## Project Directives
1. Read `AGENTS.md` before generating or modifying code.
2. Consult the relevant sub-rule under `.agents/rules/` specified in the `AGENTS.md` router for your active task.

## Build & Test Commands
- Typecheck: `npm run typecheck` (or `npx tsc --noEmit`)
- Test: `npm test`
- Build: `npm run build`

Always verify typecheck and tests pass before declaring any task complete.
