import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const performanceRuleTemplate: RuleTemplate = {
  id: 'rule-performance',
  targetPath: '.agents/rules/05-performance.md',
  description: 'Performance, accessibility, layout stability, and SEO metadata',
  getContent: () => prompt,
};
