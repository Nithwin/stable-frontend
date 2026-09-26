import fs from 'node:fs';
import path from 'node:path';
import { GeneratorOptions, GeneratorResult } from './types.js';
import { templates } from './templates/index.js';

/**
 * Executes the generation process, creating all registered rules and agent files.
 */
export async function generateStableFrontend(
  options: GeneratorOptions = {}
): Promise<GeneratorResult[]> {
  const cwd = options.cwd || process.cwd();
  const overwrite = options.overwrite ?? true;
  const results: GeneratorResult[] = [];

  for (const template of templates) {
    const fullPath = path.resolve(cwd, template.targetPath);
    const parentDir = path.dirname(fullPath);

    try {
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      const fileExists = fs.existsSync(fullPath);

      if (fileExists && !overwrite) {
        results.push({
          filePath: template.targetPath,
          status: 'skipped',
        });
        continue;
      }

      const content = template.getContent().trim() + '\n';
      fs.writeFileSync(fullPath, content, 'utf-8');

      results.push({
        filePath: template.targetPath,
        status: fileExists ? 'updated' : 'created',
      });
    } catch (err: any) {
      results.push({
        filePath: template.targetPath,
        status: 'skipped',
        error: err.message || String(err),
      });
    }
  }

  return results;
}
