import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Smoke tests for the vendored taste-skill v2 runtime: it must keep working from tools/taste/.
const tools = fileURLToPath(new URL('../tools/taste/scripts/', import.meta.url));

function run(script, args, cwd) {
  return spawnSync(process.execPath, [path.join(tools, script), ...args], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, TASTE_SKILL_HISTORY: path.join(cwd, 'history.json') },
  });
}

function withTempDir(fn) {
  const cwd = mkdtempSync(path.join(os.tmpdir(), 'asterframe-taste-'));
  try { fn(cwd); } finally { rmSync(cwd, { recursive: true, force: true }); }
}

test('draw lists sectors from the bundled library', () => withTempDir(cwd => {
  const result = run('draw.mjs', ['--list', 'sectors'], cwd);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /restaurant/);
}));

test('draw deals a full sheet into the project working folder', () => withTempDir(cwd => {
  const result = run('draw.mjs', ['--sector', 'restaurant', '--brief', 'harbour fish bar', '--sections', 'features,contact', '--direction', 'name-as-monument', '--seed', '7'], cwd);
  assert.equal(result.status, 0, result.stderr);
  const sheet = path.join(cwd, '.taste-skill', 'direction.json');
  assert.ok(existsSync(sheet));
  assert.doesNotThrow(() => JSON.parse(readFileSync(sheet, 'utf8')));
}));

test('lint fails a gradient headline and passes plain markup', () => withTempDir(cwd => {
  writeFileSync(path.join(cwd, 'bad.html'), '<h1 style="background:linear-gradient(red,blue)">Hi</h1>');
  writeFileSync(path.join(cwd, 'good.html'), '<h1>Hi</h1><p>Plain.</p>');
  assert.equal(run('lint.mjs', ['bad.html'], cwd).status, 1);
  const good = run('lint.mjs', ['good.html'], cwd);
  assert.equal(good.status, 0, good.stdout);
  assert.match(good.stdout, /0 FAIL/);
}));
