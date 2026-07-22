# Contributing to Asterframe

Thank you for helping improve Asterframe.

## Principles

Contributions should preserve the project's core behavior:

- route requests to the narrowest useful workflow;
- prioritize usability, accessibility, and existing product constraints over visual novelty;
- distinguish brand surfaces from product surfaces;
- treat detector findings as evidence rather than automatic verdicts;
- avoid adding generic design prescriptions without a contextual gate.

## Before opening a pull request

1. Keep changes focused and explain the user-facing reason.
2. Add or update tests for detector and script changes.
3. Run `npm run validate`.
4. Update `README.md`, command references, or `SOURCE_MAP.md` when behavior changes.
5. Confirm that new source material has explicit redistribution terms. Do not import unlicensed prompts, datasets, code, or documentation.

## Command changes

When adding or changing a command:

- update `scripts/command-metadata.json`;
- add or update the matching file in `reference/`;
- update routing in `SKILL.md`;
- update the command table in `README.md`;
- adjust the manifest validation count when intentionally adding or removing commands.

## Pull request format

Describe:

- what changed;
- why it changed;
- which workflows are affected;
- how it was validated;
- any source or licensing implications.
