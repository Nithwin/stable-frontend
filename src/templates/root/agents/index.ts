import { RuleTemplate } from '../../../types.js';
import prompt from './prompt.md';
import { subRules } from '../../rules/index.js';

function buildRulesTable(): string {
  const header = '| Task / Domain | Rule File | What It Covers |\n| :--- | :--- | :--- |';
  const rows = subRules.map((rule) => {
    const domain = rule.domain ? `**${rule.domain}**` : `**${rule.id}**`;
    return `| ${domain} | [\`${rule.targetPath}\`](${rule.targetPath}) | ${rule.description} |`;
  });
  return [header, ...rows].join('\n');
}

export const agentsRouterTemplate: RuleTemplate = {
  id: 'root-agents',
  targetPath: 'AGENTS.md',
  description: 'Primary AI Agent engineering router and project conventions',
  getContent: () => prompt.replace('{{RULES_TABLE}}', buildRulesTable()),
};
