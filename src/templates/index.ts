import { RuleTemplate } from '../types.js';
import { agentsRouterTemplate } from './root/agents/index.js';
import { claudeRouterTemplate } from './root/claude/index.js';
import { subRules } from './rules/index.js';

export { subRules };

/**
 * Central Template Registry
 */
export const templates: RuleTemplate[] = [
  agentsRouterTemplate,
  claudeRouterTemplate,
  ...subRules,
];
