import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const validationRuleTemplate: RuleTemplate = {
  id: 'rule-validation',
  targetPath: '.agents/rules/02-validation.md',
  description: 'Schema-first validation, form state lifecycle, and edge case handling',
  getContent: () => prompt,
};
