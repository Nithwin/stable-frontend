import { RuleTemplate } from '../types.js';
import { agentsRouterTemplate } from './root/agents/index.js';
import { claudeRouterTemplate } from './root/claude/index.js';
import { architectureRuleTemplate } from './rules/01-architecture/index.js';
import { validationRuleTemplate } from './rules/02-validation/index.js';
import { dataFetchingRuleTemplate } from './rules/03-data-fetching/index.js';
import { testingRuleTemplate } from './rules/04-testing/index.js';
import { performanceRuleTemplate } from './rules/05-performance/index.js';

/**
 * The Central Template Registry
 * To add a new rule file to stable-frontend, simply import it and add it to this array!
 */
export const templates: RuleTemplate[] = [
  // Root Router files
  agentsRouterTemplate,
  claudeRouterTemplate,

  // Modular Sub-Rules (.agents/rules/)
  architectureRuleTemplate,
  validationRuleTemplate,
  dataFetchingRuleTemplate,
  testingRuleTemplate,
  performanceRuleTemplate,
];
