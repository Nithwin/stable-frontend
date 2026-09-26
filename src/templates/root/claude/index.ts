import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const claudeRouterTemplate: RuleTemplate = {
  id: 'root-claude',
  targetPath: 'CLAUDE.md',
  description: 'Claude Code instructions pointing to the project rules and standards',
  getContent: () => prompt,
};
