import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const testingRuleTemplate: RuleTemplate = {
  id: 'rule-testing',
  targetPath: '.agents/rules/04-testing.md',
  description: 'Testing pyramid, test colocation, and edge case test checklist',
  getContent: () => prompt,
};
