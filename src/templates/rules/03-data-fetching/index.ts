import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';

export const dataFetchingRuleTemplate: RuleTemplate = {
  id: 'rule-data-fetching',
  domain: 'Data Fetching & Async',
  targetPath: '.agents/rules/03-data-fetching.md',
  description: 'Server vs Client components, AbortController, Loading/Error/Empty states',
  getContent: () => prompt,
};
