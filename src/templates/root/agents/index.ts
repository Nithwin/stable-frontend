import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const agentsRouterTemplate: RuleTemplate = {
  id: 'root-agents',
  targetPath: 'AGENTS.md',
  description: 'Primary AI Agent engineering router and project conventions',
  getContent: () => prompt,
};
