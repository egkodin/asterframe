import path from 'node:path';

import { filterFindings, matchesAnyGlob, readConfig } from '../hook-lib.mjs';

export function readDetectionConfig(cwd = process.cwd()) {
  const config = readConfig(cwd);
  return {
    ignoreRules: config.ignoreRules,
    ignoreFiles: config.ignoreFiles,
    ignoreValues: config.ignoreValues,
    designSystem: config.designSystem,
  };
}

export function filterDetectionFindings(findings, config) {
  return filterFindings(findings, '', '', config);
}

export function shouldIgnoreDetectionFile(filePath, cwd, config) {
  const absolute = path.resolve(filePath);
  const relative = path.relative(path.resolve(cwd), absolute).split(path.sep).join('/');
  return matchesAnyGlob(relative, config.ignoreFiles) || matchesAnyGlob(absolute, config.ignoreFiles);
}
