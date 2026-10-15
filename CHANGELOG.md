# Changelog

All notable changes to Asterframe will be documented in this file.

## Unreleased — contextual design gates

- Added `inspect.mjs --phase still|final`: reduced-motion composition review before the final page check; final remains the default.
- Reject integrity rule allowances from CLI, saved direction files and direct rule-engine calls; reject malformed or unknown allowance ids before browser startup.
- Removed mandatory picture/video and moving-element quotas. Missing raster imagery is advisory; deliberate static and typographic pages can pass.
- Let the brief, brand, design system and concrete subject-specific rationale justify scoped style exceptions; aligned draw output and critique guidance.
- Added regression coverage for allowances, imagery, phases, and covered/clipped text through a browser adapter. Updated the vendored-source modification record.

## Unreleased — design-source merge 2026-10-14

- Added `direct`: art direction for public-facing pages backed by the bundled taste-skill v2 runtime (`tools/taste/`): subject inventory, dealt directions from 247 studied sites, idea and live-thing gates, open-collection imagery with credits, a real-browser inspector at 1440/768/390, screenshot critique, and a required motion layer.
- Added `explore`: two to five divergent, standalone HTML variations staged as structure → theme → motion spec → mockup.
- Added `references/genres.md` (ten genre identities, 31 product presets), `references/motion-library.md` (tokens, spec notation, transition recipes, 24 text effects, GSAP architecture), and `references/effects-catalog.md` (licence-aware index of motion components, sections, cursors, canvas effects, and shaders).
- SKILL.md: still-frame test, `MotionConfig reducedMotion="user"`, measured brand-page gate with scoped allowances, open-licence imagery preference.
- Conflict policy: on brand-register surfaces the taste-skill v2 house rules override genre packs; packs were translated (no mono labels, index numbers, hairlines, outlined boxes, resting shadows, cream/terracotta/violet palettes, styled accent words) and carry no inspector allowances.
- Smoke tests for the vendored runtime; `check:js` now covers `tools/taste/`.

## Unreleased — source refresh 2026-09-11

- Refreshed the embedded UI/UX Pro Max catalog, search engine, design-system generator, dark-mode resolution, diagnostics, and data-contract metadata.
- Updated frontend direction, motion scouting, and anti-slop guidance from their current upstream sources.
- Added 35 anti-slop tells, off-centre spinner detection, PHP/Twig scanning, scoped ignores, scan narrowing, and custom rule modules.
- Merged compatible Impeccable guidance for Persuade/Operate/Read/Experience modes, preservation-aware refinement, and bounded verification while retaining Asterframe paths and commands.
- Recorded exact source revisions and attribution in `SOURCE_MAP.md` and `NOTICE.md`.

## 0.1.0 — Initial repository release

- Unified interface creation, redesign, critique, audit, polish, hardening, and adaptation workflows.
- Added dedicated `anti-slop`, `motion-scout`, `redesign`, and `system` routes.
- Added 27-command metadata and routing.
- Added 44 deterministic design and quality rules.
- Included local UI/UX search and design-system generation tools.
- Included live browser iteration, hooks, supporting agents, and command pinning.
- Renamed the complete package and runtime identity to Asterframe.
