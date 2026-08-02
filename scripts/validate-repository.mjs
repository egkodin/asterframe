#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const requiredCommands = [
  'craft', 'shape', 'init', 'document', 'extract', 'critique', 'audit', 'polish',
  'bolder', 'quieter', 'distill', 'harden', 'onboard', 'animate', 'colorize',
  'typeset', 'layout', 'delight', 'overdrive', 'clarify', 'adapt', 'optimize',
  'live', 'redesign', 'anti-slop', 'motion-scout', 'system',
];
const requiredReferences = [
  ...requiredCommands,
  'brand', 'product', 'frontend-direction', 'taste', 'operational-core', 'hooks',
];

function requirePath(path, type = 'file') {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return errors.push(`missing ${type}: ${path}`);
  if (type === 'directory' && !statSync(absolute).isDirectory()) errors.push(`not a directory: ${path}`);
  if (type === 'file' && !statSync(absolute).isFile()) errors.push(`not a file: ${path}`);
}

function filesUnder(directory) {
  const output = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...filesUnder(path));
    else if (entry.isFile()) output.push(path);
  }
  return output;
}

[
  'SKILL.md', 'agents/openai.yaml', 'scripts/context.mjs', 'scripts/detect.mjs',
  'scripts/anti-slop/scan.mjs', 'scripts/anti-slop/scan.test.mjs',
  'tools/uiux/scripts/search.py', 'LICENSES/frontend-design-Apache-2.0.txt',
].forEach(path => requirePath(path));
['references', 'scripts', 'agents', 'tools/uiux/data', 'tools/uiux/scripts'].forEach(path => requirePath(path, 'directory'));
requiredReferences.forEach(name => requirePath(`references/${name}.md`));

const skill = readFileSync(join(root, 'SKILL.md'), 'utf8');
const frontmatter = skill.match(/^---\n([\s\S]*?)\n---\n/);
if (!frontmatter) {
  errors.push('SKILL.md has invalid frontmatter');
} else {
  const keys = [...frontmatter[1].matchAll(/^([a-z][a-z0-9-]*):/gm)].map(match => match[1]);
  if (keys.join(',') !== 'name,description') errors.push(`SKILL.md frontmatter keys must be name,description; got ${keys.join(',')}`);
  if (!/^name: asterframe$/m.test(frontmatter[1])) errors.push('SKILL.md name must be asterframe');
}
if (skill.split('\n').length > 500) errors.push('SKILL.md exceeds 500 lines');

for (const match of skill.matchAll(/`((?:references|scripts|tools)\/[A-Za-z0-9_./-]+)/g)) {
  const bundledPath = match[1].replace(/[.,:]$/, '');
  if (!existsSync(join(root, bundledPath))) errors.push(`SKILL.md points to missing path: ${bundledPath}`);
}

const metadata = JSON.parse(readFileSync(join(root, 'scripts/command-metadata.json'), 'utf8'));
for (const command of requiredCommands) {
  if (!metadata[command]?.description) errors.push(`command metadata missing: ${command}`);
}
const pin = readFileSync(join(root, 'scripts/pin.mjs'), 'utf8');
for (const command of requiredCommands) {
  if (!pin.includes(`'${command}'`)) errors.push(`pin command missing: ${command}`);
}

const openai = readFileSync(join(root, 'agents/openai.yaml'), 'utf8');
if (!/display_name: "Asterframe"/.test(openai)) errors.push('agents/openai.yaml display name is stale');
if (!/default_prompt: ".*\$asterframe/.test(openai)) errors.push('agents/openai.yaml default prompt must mention $asterframe');

const nestedSkills = filesUnder(root).filter(path => relative(root, path) !== 'SKILL.md' && path.endsWith('/SKILL.md'));
if (nestedSkills.length) errors.push(`nested SKILL.md files: ${nestedSkills.map(path => relative(root, path)).join(', ')}`);
if (existsSync(join(root, 'reference'))) errors.push('legacy reference/ directory exists; use references/');

for (const sourcePath of filesUnder(join(root, 'scripts')).filter(path => /\.(?:mjs|js)$/.test(path))) {
  const source = readFileSync(sourcePath, 'utf8');
  for (const match of source.matchAll(/(?:from\s+|import\()\s*['"](\.\.?\/[^'"]+)['"]/g)) {
    const imported = resolve(dirname(sourcePath), match[1]);
    if (!existsSync(imported)) errors.push(`missing local import: ${relative(root, sourcePath)} -> ${match[1]}`);
  }
}

for (const markdownPath of filesUnder(root).filter(path => path.endsWith('.md'))) {
  const markdown = readFileSync(markdownPath, 'utf8');
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].trim().replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^(?:[a-z]+:|#)/i.test(target) || !/^[A-Za-z0-9_./ -]+$/.test(target)) continue;
    if (!existsSync(resolve(dirname(markdownPath), target))) {
      errors.push(`broken Markdown link: ${relative(root, markdownPath)} -> ${target}`);
    }
  }
}

const csvCount = filesUnder(join(root, 'tools/uiux/data')).filter(path => path.endsWith('.csv')).length;
if (csvCount < 20) errors.push(`UI/UX data incomplete: found ${csvCount} CSV files`);

if (errors.length) {
  console.error(errors.map(error => `- ${error}`).join('\n'));
  process.exit(1);
}
console.log(`Asterframe repository is complete: ${requiredCommands.length} commands, ${requiredReferences.length} references, ${csvCount} data files.`);
