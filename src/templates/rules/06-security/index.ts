import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const securityRuleTemplate: RuleTemplate = {
  id: 'rule-security',
  domain: 'Security & Auth',
  targetPath: '.agents/rules/06-security.md',
  description: 'Authentication cookies, XSS prevention, Server Action authorization, and data isolation',
  getContent: () => prompt,
};
