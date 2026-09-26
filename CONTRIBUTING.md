# Contributing to stable-frontend

Thank you for your interest in contributing to `stable-frontend`. This document provides instructions for setting up the project locally and submitting changes.

## Development Setup

Requirements:
* Node.js 18 or higher
* npm

Clone the repository and install dependencies:

```bash
git clone https://github.com/Nithwin/stable-frontend.git
cd stable-frontend
npm install
```

## Available Scripts

* `npm run build`: Compiles TypeScript and packages markdown templates using tsup.
* `npm run dev`: Runs tsup in watch mode for development.
* `npm run typecheck`: Validates TypeScript types without emitting output.

## How to Add or Update a Rule

Rules are modular templates stored in `src/templates/`. Each rule resides in its own folder.

### Adding a New Rule

1. Create a new directory under `src/templates/rules/` with a prefix number and kebab-case name:
   ```text
   src/templates/rules/06-your-rule-name/
   ├── prompt.md
   └── index.ts
   ```

2. Write your guidelines in `prompt.md` using standard markdown.

3. Export a `RuleTemplate` in `index.ts`:
   ```typescript
   import { RuleTemplate } from '../../../types.js';
   import prompt from './prompt.md';

   export const yourRuleTemplate: RuleTemplate = {
     id: 'rule-your-rule-name',
     targetPath: '.agents/rules/06-your-rule-name.md',
     description: 'Brief description of what this rule enforces',
     getContent: () => prompt,
   };
   ```

4. Register the new template in `src/templates/index.ts` by adding it to the `templates` array.

5. Update `src/templates/root/agents/prompt.md` to include your new rule in the rule router table.

6. Run the build and type check:
   ```bash
   npm run build
   npm run typecheck
   ```

## Pull Request Guidelines

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Keep rule prompts concise and focused on actionable standards to minimize token consumption for AI agents.
3. Ensure `npm run build` and `npm run typecheck` pass without errors before opening a pull request.
4. Provide a clear summary in your pull request describing what the change introduces or fixes.
