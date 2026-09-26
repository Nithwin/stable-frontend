import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const architectureRuleTemplate: RuleTemplate = {
  id: 'rule-architecture',
  domain: 'Project Structure & Files',
  targetPath: '.agents/rules/01-architecture.md',
  description: 'Feature-based colocation, folder layout, file responsibilities',
  getContent: () => prompt,
};
