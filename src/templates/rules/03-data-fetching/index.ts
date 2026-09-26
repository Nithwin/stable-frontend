import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const dataFetchingRuleTemplate: RuleTemplate = {
  id: 'rule-data-fetching',
  targetPath: '.agents/rules/03-data-fetching.md',
  description: 'Async lifecycle, Server vs Client components, and race condition prevention',
  getContent: () => prompt,
};
