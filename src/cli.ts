import { generateStableFrontend } from './generator.js';

export async function runCli(): Promise<void> {
  console.log('\n🛡️  \x1b[1m\x1b[36mstable-frontend\x1b[0m — Setting up AI Agent Stability Guidelines...\n');

  try {
    const results = await generateStableFrontend({
      cwd: process.cwd(),
      overwrite: true,
    });

    for (const res of results) {
      if (res.status === 'created') {
        console.log(`  \x1b[32m+\x1b[0m Created \x1b[1m${res.filePath}\x1b[0m`);
      } else if (res.status === 'updated') {
        console.log(`  \x1b[33m~\x1b[0m Updated \x1b[1m${res.filePath}\x1b[0m`);
      } else {
        console.log(`  \x1b[90m-\x1b[0m Skipped \x1b[1m${res.filePath}\x1b[0m ${res.error ? `(${res.error})` : ''}`);
      }
    }

    console.log('\n\x1b[32m✔ Done! AI Agent rules successfully configured.\x1b[0m');
    console.log('\nAI agents (Cursor, Claude, Copilot, Antigravity) will now read:');
    console.log('  • \x1b[1mAGENTS.md\x1b[0m (Rule index / router)');
    console.log('  • \x1b[1mCLAUDE.md\x1b[0m (Claude Code guidelines)');
    console.log('  • \x1b[1m.agents/rules/\x1b[0m (Modular standards for architecture, forms, async, & testing)\n');
  } catch (error: any) {
    console.error('\n\x1b[31m✖ Failed to configure stable-frontend:\x1b[0m', error.message || error);
    process.exit(1);
  }
}
