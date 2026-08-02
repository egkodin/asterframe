import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  filterDetectionFindings,
  readDetectionConfig,
  shouldIgnoreDetectionFile,
} from './asterframe-config.mjs';

test('merges detector config and applies rule and file ignores', () => {
  const root = mkdtempSync(join(tmpdir(), 'asterframe-config-'));
  try {
    const directory = join(root, '.asterframe');
    mkdirSync(directory);
    writeFileSync(join(directory, 'config.json'), JSON.stringify({
      detector: { ignoreRules: ['gradient-text'], ignoreFiles: ['vendor/**'] },
    }));
    writeFileSync(join(directory, 'config.local.json'), JSON.stringify({
      detector: { designSystem: { enabled: false }, ignoreFiles: ['*.generated.tsx'] },
    }));

    const config = readDetectionConfig(root);
    assert.equal(config.designSystem.enabled, false);
    assert.equal(shouldIgnoreDetectionFile(join(root, 'vendor', 'ui.tsx'), root, config), true);
    assert.equal(shouldIgnoreDetectionFile(join(root, 'src', 'card.generated.tsx'), root, config), true);
    assert.deepEqual(
      filterDetectionFindings([
        { antipattern: 'gradient-text' },
        { antipattern: 'nested-card' },
      ], config),
      [{ antipattern: 'nested-card' }],
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
