# Bundled taste-skill v2 runtime

Adapted copy of `skills/taste-skill/{scripts,library,assets,references}` from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) at `a60a36dc2bb3bb77ccf17f2f62041f5ca8a458b9` (v2.0.0), MIT ([licence](../../LICENSES/taste-skill-MIT.txt)). The upstream `SKILL.md` is intentionally absent; Asterframe drives this runtime through [`references/direct.md`](../../references/direct.md).

Script output that mentions "SKILL.md step N" refers to step N of `references/direct.md`; `references/<file>.md` in script output means `tools/taste/references/<file>.md`. Working files go to `.taste-skill/` in the project being built, draw history to `~/.taste-skill/history.json` (override with `TASTE_SKILL_HISTORY`).

Asterframe modifications: protected integrity allowances, explicit `--phase still|final` inspection (still emulates reduced motion), contextual style exceptions, no image or motion quotas, and matching draw/critique guidance. Final is the default phase. Still mode does not disable scripts or automatically freeze all animation.

To refresh: review a newer upstream revision, preserve these local modifications and their regression tests, run `npm run validate`, and record the revision in `SOURCE_MAP.md`. Do not overwrite this tree blindly.
