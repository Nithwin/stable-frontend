import { architectureRuleTemplate } from './01-architecture/index.js';
import { validationRuleTemplate } from './02-validation/index.js';
import { dataFetchingRuleTemplate } from './03-data-fetching/index.js';
import { testingRuleTemplate } from './04-testing/index.js';
import { performanceRuleTemplate } from './05-performance/index.js';

export const subRules = [
  architectureRuleTemplate,
  validationRuleTemplate,
  dataFetchingRuleTemplate,
  testingRuleTemplate,
  performanceRuleTemplate,
];
