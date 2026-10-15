# Notices and modification record

Asterframe is a materially reorganized integration assembled from the user-provided archive `design-skills.zip`.

## Imported modules

- `frontend-design` — incorporated and modified; the supplied Apache License 2.0 text is preserved in `LICENSES/frontend-design-Apache-2.0.txt`.
- Legacy operational core — retained for command references, detector logic, live mode, hooks, agents, and supporting scripts, then extended by the unified router.
- `find-animation-opportunities` — incorporated as the read-only `motion-scout` workflow.
- `kill-ai-slop` — incorporated as the `anti-slop` workflow with scanner and reference material.
- `redesign-existing-projects` — incorporated as the audit-first `redesign` workflow.
- `taste-skill` — distilled into context inference, design dials, design-system selection, anti-default discipline, and preflight rules.
- `ui-ux-pro-max` — retained as the local searchable data and design-system utility under `tools/uiux/`.
- `miqdadbadjuber/anti-slop` — adapted from the core and five focused skills into purpose-led composition, truthful content, working interactions, copy/comment hygiene, and responsive/accessibility checks. Revision and adaptation boundaries are recorded in `SOURCE_MAP.md`; the upstream MIT notice is preserved in [`LICENSES/antislop-MIT.txt`](LICENSES/antislop-MIT.txt). The optional contrast checker remains an external installed tool; its code is not redistributed here.

- `taste-skill` v2 — runtime (scripts, direction library, base assets, references) adapted under `tools/taste/` with its MIT notice in [`LICENSES/taste-skill-MIT.txt`](LICENSES/taste-skill-MIT.txt); its workflow is adapted as the `direct` command.
- `design-taste` (madebymustafa) — genre identities and motion/GSAP craft condensed and modified in `references/genres.md` and `references/motion-library.md`; MIT notice in [`LICENSES/design-taste-MIT.txt`](LICENSES/design-taste-MIT.txt).
- `better-design` (marvkr) — preset catalog, transition timing values, and review-loop workflow adapted in `references/genres.md` and `references/motion-library.md`; MIT notice in [`LICENSES/better-design-MIT.txt`](LICENSES/better-design-MIT.txt).
- Referenced, not redistributed: motion-primitives (MIT), ui-layouts (MIT), Paper Shaders (Apache-2.0), Canvas UI (MIT + Commons Clause), Cursify (no licence found). `references/effects-catalog.md` points to their official install paths and states each boundary.
- Superdesign (AGPL-3.0) informed the `explore` workflow at the level of ideas only; no material was copied.

The embedded UI/UX catalog and runtime were refreshed from
`nextlevelbuilder/ui-ux-pro-max-skill` at the revision recorded in
`SOURCE_MAP.md`; its MIT notice is preserved at
`LICENSES/ui-ux-pro-max-MIT.txt`.

The redistributed redesign material retains its upstream MIT notice at
`LICENSES/redesign-existing-projects-MIT.txt`.

## Material modifications

The following parts are materially modified or newly assembled for Asterframe:

- top-level routing and priority hierarchy in `SKILL.md`;
- brand/product register selection;
- conflict-resolution and preservation rules;
- unified command metadata and command references;
- `redesign`, `anti-slop`, `motion-scout`, `system`, `direct`, and `explore` workflows;
- genre packs, motion library, and effects catalog references;
- taste runtime: protected integrity allowances, still/final inspection phases, contextual style exceptions, and removal of image/motion quotas;
- runtime, hook, live-mode, command, path, and environment-variable identity;
- repository documentation, validation, and contribution files.

The 2026-09-11 refresh also updates the source-derived frontend-direction,
motion-scout, anti-slop, and UI/UX modules. The Asterframe-specific router,
command names, detector integration, and live runtime remain intentionally
owned by this integration.

No ownership claim is made over third-party source material. Asterframe is not offered under one blanket license. Preserve applicable upstream notices and verify redistribution rights for each source module before redistributing or incorporating this repository into another product.
