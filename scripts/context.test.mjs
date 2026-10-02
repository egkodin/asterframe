import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('./context.mjs', import.meta.url));
const cases = [
  { name: 'missing docs do not block scoped work', files: {}, expected: ['NO_PRODUCT_MD', 'Continue the current task'] },
  { name: 'design-only context remains available', files: { 'docs/DESIGN.md': 'Keep the cobalt theme.' }, expected: ['NO_PRODUCT_MD', '# DESIGN.md', 'Keep the cobalt theme.'] },
  { name: 'product and design retain the existing context contract', files: { 'PRODUCT.md': '## Register\nproduct\n', 'DESIGN.md': 'Existing spacing tokens.' }, expected: ['# PRODUCT.md', '# DESIGN.md', 'Existing spacing tokens.', 'references/product.md'] },
];

for (const fixture of cases) {
  test(fixture.name, () => {
    const cwd = mkdtempSync(path.join(os.tmpdir(), 'asterframe-context-'));
    try {
      for (const [relative, content] of Object.entries(fixture.files)) {
        const target = path.join(cwd, relative);
        mkdirSync(path.dirname(target), { recursive: true });
        writeFileSync(target, content);
      }
      const output = execFileSync(process.execPath, [cli], {
        cwd,
        encoding: 'utf8',
        timeout: 5000,
        env: { ...process.env, ASTERFRAME_CONTEXT_DIR: cwd, ASTERFRAME_NO_UPDATE_CHECK: '1' },
      });
      for (const expected of fixture.expected) assert.ok(output.includes(expected), expected);
      assert.ok(!output.includes('Stop the current task'));
      assert.ok(!output.includes('before resuming'));
    } finally {
      rmSync(cwd, { recursive: true, force: true });
    }
  });
}
