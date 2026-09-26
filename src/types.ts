export interface RuleTemplate {
  /** Unique identifier for the template */
  id: string;
  /** Relative destination path in the user's project (e.g. "AGENTS.md" or ".agents/rules/01-architecture.md") */
  targetPath: string;
  /** Domain/task category for router table (e.g. "Project Structure & Files") */
  domain?: string;
  /** Human-readable description */
  description: string;
  /** Function returning the markdown content for this file */
  getContent: () => string;
}

export interface GeneratorResult {
  filePath: string;
  status: 'created' | 'skipped' | 'updated';
  error?: string;
}

export interface GeneratorOptions {
  cwd?: string;
  overwrite?: boolean;
}
