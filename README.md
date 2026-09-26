# stable-frontend

Frontend architecture and stability rules for code generation in React and Next.js projects.

## Overview

When coding agents generate frontend code, they frequently skip input validation, error states, accessibility tags, and testing. `stable-frontend` sets up structured engineering guidelines and folder conventions in your repository to keep generated code consistent and production ready.

Rules are organized as a modular index to minimize context window usage. Instead of loading an entire ruleset on every prompt, the main index directs tools to read only the guidelines relevant to the active task.

## Usage

Run the setup command in the root of your project:

```bash
npx stable-frontend
```

Generated structure:

```text
├── AGENTS.md                  # Main rule index and router
├── CLAUDE.md                  # Claude Code instructions
└── .agents/
    └── rules/
        ├── 01-architecture.md # Feature-based structure and colocation
        ├── 02-validation.md   # Schema validation and form lifecycles
        ├── 03-data-fetching.md# Async states and component boundaries
        ├── 04-testing.md      # Testing pyramid and edge case checklists
        └── 05-performance.md  # Accessibility and layout stability
```

## Adding Rules

To add a new rule:

1. Create a template file in `src/templates/rules/`.
2. Register the template in `src/templates/index.ts`.
3. Run `npm run build`.
