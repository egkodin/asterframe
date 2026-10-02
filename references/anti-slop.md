---
name: kill-ai-slop
description: >-
  Find and remove AI slop — the generic, machine-default visual and copy tics of
  vibe-coded products — from a web project. Use when the user asks to "kill AI
  slop", "de-slop", "remove the AI look", "make this not look AI-generated", or
  clean up a landing page / UI / docs that feels templated. Detects and fixes
  the catalogue of tells: indigo→violet gradients, gradient-clip headlines, the
  default semantic palette, one-hue status boxes, atmospheric gradients,
  serif-italic emphasis, highlighted keywords, AI copywriting voice ("not just
  X — it's Y"), emoji everywhere, glowing status dots, wobbling spinners,
  colored-left-border
  callouts, pastel icon tiles, glassmorphism, over-rounding, oversized shadows,
  borders that die at corners, badge & pill spam, AI-drawn SVG icons, kickers
  over every heading, flat type
  hierarchies, invented stat rows, 01/02/03 section
  markers, cards nested in cards, the default Inter/Space Grotesk look, and
  more. Works on HTML/CSS, React/Vue/Svelte/Astro, Tailwind, PHP, and Markdown
  copy.
---

# Kill AI Slop

AI slop is **ugly** in a specific way: it piles on every possible style and
detail without settling on a focus. A gradient, a glow, a mascot, emoji, a wall
of glowing cards, every default switched on at once, until every product looks
like the same garish template. It reads as "designed" in a thumbnail and falls
apart the moment anyone looks. Your job is to strip it back to something a
person would actually choose.

The principles, held on every fix you make:

1. **Decide before you decorate.** Every visual choice must be explainable.
2. **One accent, one voice.**
3. **Hierarchy from scale and space.** Coloring words or swapping fonts is a shortcut.
4. **Subtract first.** The first move toward not-ugly is removing things.
5. **Specific beats punchy** in copy.
6. **Decoration must mean something** — icons, badges, callouts are signals.

## Workflow

Use the scope and authority from the current Asterframe entrypoint. Read [purpose and completeness](anti-slop/craft.md) for the compatible anti-slop integration. A review stays read-only; an authorized cleanup may triage, fix, and verify directly without requesting the same permission again. Broad or destructive changes beyond that scope require a concrete reviewable proposal.

### 1. Scope
Resolve the requested scope from the brief. Default to the affected app/site source (skip `node_modules`,
`dist`, `build`, `.git`, `vendor`, lockfiles, minified files). Ask only if the target cannot be determined safely when the
project mixes several apps.

### 2. Scan
Run the bundled scanner, which greps the codebase for the code-level signals of
each tell and prints grouped `file:line` hits:

```
node "${ASTERFRAME_SKILL_DIR}/scripts/anti-slop/scan.mjs" <root>          # human-readable report
node "${ASTERFRAME_SKILL_DIR}/scripts/anti-slop/scan.mjs" <root> --json   # machine-readable, for triage
```

It is pure Node (no dependencies) and never edits files. Use its output as a
starting map, not gospel — confirm each hit by reading the code.

To narrow a scan: `--only=01,06` / `--skip=19` filter by tell id, and
`--exclude=legacy` drops paths (substring match on the project-relative path).
`--rules=extra.mjs` loads additional project- or language-specific tells
(`${ASTERFRAME_SKILL_DIR}/scripts/anti-slop/rules.ru.mjs` is a shipped Russian-copy example and the template for
your own). Hits the user has confirmed as intentional can be pinned in source
with `deslop-ignore`, `deslop-ignore-next-line 06`, or `deslop-ignore-file`
comments — prefer the id-scoped forms so new tells still surface.

### 3. Triage
For every hit, open the file and decide **slop vs. intentional**. This is the
step that separates this skill from a lint rule. A gradient, a serif, or an
emoji can be a real, defended choice. Keep anything the user clearly chose
(brand tokens, a logo, a deliberate illustration). Flag only defaults.

Read `references/anti-slop/taxonomy.md` for what each tell is and why it reads as
machine-made, and `references/anti-slop/detection.md` for the exact patterns and their
common false positives.

### 4. Report
For review-only work, give a grouped summary; for authorized fixes, report the confirmed changes and exceptions: each tell, the
`file:line` hits you confirmed, one sentence on why, and the proposed fix.
Mirror the format:

```
slop  src/Hero.tsx:12   indigo→violet gradient        → one solid accent
slop  src/Hero.tsx:31   gradient-clip headline        → solid ink, scale up
slop  src/Note.tsx:8    border-l-4 callout ×3         → 1 aside, rest is body
slop  copy.md:1         "not just X — it's Y"         → say the specific thing
→ 4 groups, 11 hits.
```

Ask which groups to apply only when authority or scope is still missing. Existing authorization for the affected fixes is sufficient.

### 5. Fix
Apply the minimal change that removes the tell while preserving intent and
function. Use `references/anti-slop/fixes.md` for the before→after pattern per tell.

- Prefer editing shared tokens/components over touching every call site.
- Never invent new brand colors; if a palette must change, reuse the project's existing tokens and accent. Request a decision only
  when changing an explicit brand commitment is outside the authorized scope.
- Keep copy meaning; make it specific, don't just delete it.
- Re-run relevant checks after fixing and note intentional remaining hits.
  A lower scanner count is not a quality gate; verify the actual effect.

## Guardrails

- **Respect authorship.** Treat unfamiliar files and deliberate flourishes as
  someone's choice. When evidence is insufficient, preserve it; ask only if that uncertainty blocks the requested change.
- **Small, reviewable diffs.** Never reformat unrelated code. Never run
  `git add -A`; stage explicit files only, and leave others' work-in-progress
  alone.
- **No new dependencies** to do this work.
- **Verify visually when possible.** If a dev server exists, look at the before
  and after; a passing scan is not the same as a better page.

## References

- `references/anti-slop/taxonomy.md` — the 35 tells: what each is, why it's slop, the fix.
- `references/anti-slop/detection.md` — concrete ripgrep/regex patterns + false positives.
- `references/anti-slop/fixes.md` — before→after remediation patterns.
- `${ASTERFRAME_SKILL_DIR}/scripts/anti-slop/scan.mjs` — the dependency-free scanner.
