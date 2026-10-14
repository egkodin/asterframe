# Bundled taste-skill v2 runtime

Unmodified copy of `skills/taste-skill/{scripts,library,assets,references}` from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) at `a60a36dc2bb3bb77ccf17f2f62041f5ca8a458b9` (v2.0.0), MIT ([licence](../../LICENSES/taste-skill-MIT.txt)). The upstream `SKILL.md` is intentionally absent; Asterframe drives this runtime through [`references/direct.md`](../../references/direct.md).

Script output that mentions "SKILL.md step N" refers to step N of `references/direct.md`; `references/<file>.md` in script output means `tools/taste/references/<file>.md`. Working files go to `.taste-skill/` in the project being built, draw history to `~/.taste-skill/history.json` (override with `TASTE_SKILL_HISTORY`).

To refresh: copy the same four folders from a newer upstream revision, keep this file, run `npm run validate`, and record the revision in `SOURCE_MAP.md`.
