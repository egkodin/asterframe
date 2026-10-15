import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INTEGRITY_RULE_IDS, judge, validateAllow } from '../tools/taste/scripts/lib/rules.mjs';

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

function pageMetrics() {
  return {
    viewport: { w: 1440 }, headings: [], headingSummary: {}, eyebrows: [], numbered: [],
    hero: { text: 'A clear subject', words: 3, vw: 10 }, heroMedia: [],
    type: { families: [], notLoaded: [], sizes: [], body: { size: 16, contrast: 21 } },
    page: { emoji: [], realPictures: 0, uiPictures: 0, videoCount: 0, brokenImages: [], height: 900 },
    surfaces: { cardRows: [] },
    color: { bodyBg: '#ffffff', sectionBgs: [], textColors: [], lowContrast: [] },
    buttons: { inHero: 1 },
  };
}

test('integrity rules cannot be suppressed by direct callers', () => {
  for (const id of INTEGRITY_RULE_IDS) {
    assert.throws(() => judge(pageMetrics(), { allow: [id] }), /Integrity rules cannot be allowed/);
  }
  const m = pageMetrics();
  m.page.horizontalOverflow = 100;
  m.page.brokenImages = ['missing.png'];
  m.color.lowContrast = [{ text: 'Unreadable', ratio: 1.2, need: 4.5, fg: '#fff', bg: '#fff' }];
  m.type.body.size = 12;
  m.type.smallText = 4;
  const ids = judge(m).filter((f) => f.level === 'FAIL').map((f) => f.id);
  for (const id of ['overflow', 'broken-image', 'contrast', 'body-size', 'small-text']) assert.ok(ids.includes(id), id);
});

test('allow normalizes style exceptions and rejects invalid ids or types', () => {
  assert.deepEqual(validateAllow([' gradient ', 'gradient']), ['gradient']);
  for (const value of ['gradient', null, [42], ['overfow']]) assert.throws(() => validateAllow(value));
  const m = pageMetrics();
  m.surfaces.gradients = 1;
  m.surfaces.gradientSamples = ['linear-gradient(red, blue)'];
  assert.ok(judge(m).some((f) => f.id === 'gradient'));
  assert.ok(!judge(m, { allow: ['gradient'] }).some((f) => f.id === 'gradient'));
});

test('imagery has no count quota and zero pictures is only a review warning', () => {
  for (const count of [0, 1, 2, 3, 4]) {
    const m = pageMetrics();
    m.page.realPictures = count;
    const findings = judge(m);
    assert.ok(!findings.some((f) => f.level === 'FAIL'));
    assert.equal(findings.some((f) => f.id === 'few-pictures'), count === 0);
    assert.ok(!findings.some((f) => ['no-footage', 'no-real-pictures'].includes(f.id)));
  }
});

test('inspect rejects protected CLI and saved allowances before opening a browser', () => withTempDir(cwd => {
  for (const id of INTEGRITY_RULE_IDS) {
    const result = run('inspect.mjs', ['https://example.invalid', '--allow', id], cwd);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /Integrity rules cannot be allowed/);
  }
  const dir = path.join(cwd, '.taste-skill');
  mkdirSync(dir);
  for (const allow of [['overflow'], ['covered-text'], null, 'gradient', ['not-a-rule']]) {
    writeFileSync(path.join(dir, 'direction.json'), JSON.stringify({ allow }));
    const result = run('inspect.mjs', ['https://example.invalid'], cwd);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /Integrity rules|allow must|Unknown allow/);
  }
  writeFileSync(path.join(dir, 'direction.json'), '{');
  assert.equal(run('inspect.mjs', ['https://example.invalid'], cwd).status, 2);
}));

test('inspect validates phase before opening a browser', () => withTempDir(cwd => {
  const result = run('inspect.mjs', ['https://example.invalid', '--phase', 'unexpected'], cwd);
  assert.equal(result.status, 2);
  assert.match(result.stderr, /phase must be still or final/);
}));

// Exercise the inspector's CLI, reporting and frame findings without an installed browser.
// This adapter supplies CDP measurements; it does not claim to test browser rendering.
function inspectWithMetrics(cwd, args, frame = {}) {
  const adapter = path.join(cwd, 'browser-adapter.mjs');
  const cdpUrl = new URL('../tools/taste/scripts/lib/cdp.mjs', import.meta.url).href;
  writeFileSync(adapter, `
    import { Browser } from ${JSON.stringify(cdpUrl)};
    import { writeFileSync } from 'node:fs';
    const metrics = ${JSON.stringify(pageMetrics())};
    const frame = ${JSON.stringify({ covered: [], clipped: [], big: [], filled: 1, ...frame })};
    Browser.launch = async () => ({
      close: async () => {},
      newPage: async (options) => ({
        consoleErrors: [], send: async () => {}, goto: async () => 'load',
        close: async () => {}, wheel: async () => {}, setViewport: async () => {},
        screenshot: async ({ path } = {}) => { if (path) writeFileSync(path, 'fixture'); return 'fixture'; },
        eval: async (fn) => {
          if (typeof fn === 'function' && fn.name === 'probe') return { ...metrics, reducedMotion: options.reducedMotion };
          if (typeof fn === 'function' && fn.name === 'frame') return frame;
          if (typeof fn === 'string' && fn.includes('window.__motion')) return { elements: 0, playingVideos: 0 };
          return true;
        },
      }),
    });
  `);
  return spawnSync(process.execPath, ['--import', adapter, path.join(tools, 'inspect.mjs'), 'https://example.invalid', '--widths', '1440', '--json', ...args], { cwd, encoding: 'utf8' });
}

test('still and final inspection accept a static typographic page and record their phase', () => withTempDir(cwd => {
  const dir = path.join(cwd, '.taste-skill');
  mkdirSync(dir);
  writeFileSync(path.join(dir, 'direction.json'), JSON.stringify({ allow: ['gradient'] }));
  for (const phase of ['still', 'final']) {
    const result = inspectWithMetrics(cwd, ['--phase', phase]);
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.phase, phase);
    assert.deepEqual(report.allow, ['gradient']);
    assert.equal(report.viewports[0].metrics.reducedMotion, phase === 'still');
    assert.equal(report.viewports[0].motion.elements, 0);
    assert.ok(!report.findings.some((f) => f.level === 'FAIL' || f.id === 'still-page'));
  }
  const result = inspectWithMetrics(cwd, []);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).phase, 'final');
}));

test('both phases retain covered and clipped text failures', () => withTempDir(cwd => {
  for (const phase of ['still', 'final']) {
    const result = inspectWithMetrics(cwd, ['--phase', phase], {
      covered: [{ text: 'Hidden headline', share: 0.8 }], clipped: [{ text: 'Clipped headline' }],
    });
    assert.equal(result.status, 1, result.stderr);
    const failures = JSON.parse(result.stdout).findings.filter((f) => f.level === 'FAIL').map((f) => f.id);
    assert.deepEqual(failures, ['covered-text', 'clipped-text']);
  }
}));
