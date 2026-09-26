import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const testingRuleTemplate: RuleTemplate = {
  id: 'rule-testing',
  domain: 'Testing & Verification',
  targetPath: '.agents/rules/04-testing.md',
  description: 'Unit, integration, and E2E testing strategies, query hierarchy, and edge cases',
  getContent: () => prompt,
};
