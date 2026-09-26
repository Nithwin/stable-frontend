#!/usr/bin/env node

import('../dist/cli.js')
  .then((m) => m.runCli())
  .catch((err) => {
    console.error('Failed to run stable-frontend:', err);
    process.exit(1);
  });
