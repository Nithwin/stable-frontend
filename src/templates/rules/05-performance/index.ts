import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const performanceRuleTemplate: RuleTemplate = {
  id: 'rule-performance',
  domain: 'Performance & A11y',
  targetPath: '.agents/rules/05-performance.md',
  description: 'Core Web Vitals, accessibility standards (ARIA), image & layout stability',
  getContent: () => prompt,
};
