import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const validationRuleTemplate: RuleTemplate = {
  id: 'rule-validation',
  domain: 'Forms, Inputs & Validation',
  targetPath: '.agents/rules/02-validation.md',
  description: 'Field specifications, sanitization, form lifecycle, edge case handling',
  getContent: () => prompt,
};
