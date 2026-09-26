import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const validationRuleTemplate: RuleTemplate = {
  id: 'rule-validation',
  domain: 'Forms, Inputs & Validation',
  targetPath: '.agents/rules/02-validation.md',
  description: 'Schema-first validation (Zod), input trimming, double-submit protection',
  getContent: () => prompt,
};
