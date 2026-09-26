import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const architectureRuleTemplate: RuleTemplate = {
  id: 'rule-architecture',
  targetPath: '.agents/rules/01-architecture.md',
  description: 'Folder structure, colocation, and file responsibility standards',
  getContent: () => prompt,
};
