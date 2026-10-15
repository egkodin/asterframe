# Asterframe source map

| Unified capability | Primary source material | Location |
|---|---|---|
| Core commands, detector, live mode, hooks | legacy operational core | `references/*.md`, `scripts/`, `agents/` |
| Distinctive brand direction | frontend-design + legacy brand guidance | `references/frontend-direction.md`, `references/brand.md` |
| Product UI quality floor | ui-ux-pro-max + legacy product guidance | `references/system.md`, `references/product.md`, `tools/uiux/` |
| Redesign workflow | redesign-existing-projects + legacy audit/polish guidance | `references/redesign.md` |
| Anti-slop | kill-ai-slop + legacy anti-pattern guidance | `references/anti-slop.md`, `references/anti-slop/`, scanner |
| Motion opportunity search | find-animation-opportunities | `references/motion-scout.md` |
| Context inference and dials | taste-skill + ui-ux design-system generator | top-level `SKILL.md`, `references/taste.md`, `references/system.md` |
| Legacy command specification | impeccable | `references/operational-core.md`, command references, `scripts/`, `agents/` |

## Installed frontend integration — 2026-10-02

The current `SKILL.md` and `references/frontend-skills.md` integrate the available frontend specialists by concern, including the 39 focused UI specialists, explicit design alternatives, Icons8/Ouch, platform branches, creative assets, and implementation/verification support. Resolve their current installed entrypoints from the session catalog; do not pin runtime routing to plugin cache versions or assume all optional tools are available.

Changes in this compatibility merge:

- one explicit Asterframe workflow; Impeccable remains the default outside explicit invocation;
- current specialist guidance by affected concern, with native controls and existing systems first;
- contextual resolution of conflicting aesthetic recipes; functional and accessibility requirements retain priority;
- non-blocking missing PRODUCT.md, including DESIGN.md-only context; scoped work does not trigger init;
- current Icons8/Ouch shared `icons8.json` version 2 lock, asset truth, dimensions, attribution, and entitlement boundaries;
- state, focus, navigation, recovery, responsive input, and measured-performance verification;
- repeated affected checks after fixes, stopping when applicable acceptance criteria pass.

This is a local skill improvement based on installed sources, not a claim that every source is the newest upstream release. Existing embedded source/license files remain historical fallbacks, not nested standalone skills. The operational-core snapshot is subordinate to the current entrypoint's routing, scope, authority, and completion rules.

## Anti-slop compatibility merge — 2026-10-02

Source: [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop/tree/91f12ec67e9de6043cfd93b846404986ba73c3f4), revision `91f12ec67e9de6043cfd93b846404986ba73c3f4`, release marker `3.2.20`. All six upstream skill entrypoints matched the installed antislop entrypoints when checked. MIT attribution is preserved in `LICENSES/antislop-MIT.txt`.

Adapted in `references/anti-slop/craft.md` and the main entrypoint: purpose versus technique, content-led identity and rhythm, dashboard decisions and honest states, concrete copy with preserved author voice, meaningful comments, content-driven intermediate-width reflow, and verified action effects. The existing scanner, commands, runtime, and explicit-only invocation policy are retained. The frontend map now includes the six antislop concerns, with the adaptation as the Asterframe authority.

Deliberately excluded: another install/mode wizard, automatic entry-file changes, compulsory DESIGN.md, forced dual themes, hard punctuation/palette/font/layout bans, script-edit bans, arbitrary comment length caps, and mandatory full-site audits or extra dial systems. These conflict with user authorization, preservation, or contextual frontend judgment. No source instructions are installed verbatim as a second router.

Contrast guidance corrects the source's `18px+` large-text shorthand and rounded comparison instruction using [W3C SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 18pt regular or 14pt bold, with unrounded threshold comparison. The existing installed antislop-human checker is an optional tool for opaque hex pairs; no checker code or new dependency is copied into Asterframe.

## Historical refresh record — 2026-09-11

The 2026-09-11 refresh recorded Asterframe upstream
`egkodin/asterframe` `2644a30d7920c68f933202994c7e0ca0997bcf3a`; the
source refresh below was an explicit compatibility merge, not a new
upstream Asterframe release. These revisions are historical evidence, not a
2026-10-02 upstream-version check.

| Integrated source | Path used | Resolved `main` revision | Refresh result |
|---|---|---|---|
| [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | `skills/frontend-design` | `34040c9c568585f6929bedeaad110ad08f079624` | Updated `references/frontend-direction.md` |
| [find-animation-opportunities](https://github.com/emilkowalski/skills/tree/main/skills/find-animation-opportunities) | `skills/find-animation-opportunities` | `d23d7f88a2e21c9e4b1418c7abe420f5c1052ba7` | Updated `references/motion-scout.md` and Asterframe handoff |
| [kill-ai-slop](https://github.com/yetone/kill-ai-slop/tree/main/skill) | `skill` | `96d1ca568a1db7e1ef9a381644c744440f816ee4` | Updated anti-slop references and scanner |
| [redesign-existing-projects](https://github.com/yasikvlad/redesign-existing-projects) | repository root | `99a47f27659d16c2b7af6636c2bcb4624ff96d83` | No content delta; already current |
| [taste-skill](https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill) | `skills/taste-skill` | `ccbc15639c97057cbfcf32ecebc38ef716e4bb37` | No content delta; already current |
| [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/src/ui-ux-pro-max) | `src/ui-ux-pro-max` | `7f69fed6a2717900085f1bc3b263721f8ba025e2` | Updated embedded catalog and Python runtime under `tools/uiux/` |
| [impeccable](https://github.com/pbakaus/impeccable) | `.agents/skills/impeccable` | `cb56ed6c19a07329a9fa0cd4e657bee040156593` | Merged compatible mode, preservation, bounded-verification, audit, and polish guidance; kept Asterframe commands/runtime |

The constituent skills are intentionally not copied as standalone nested skills:
Asterframe changes their routing, paths, command names, and runtime identity.

## Design-source merge — 2026-10-14

Nine sources were reviewed at the revisions below. What each contributes, how, and what was deliberately left out:

| Source | Revision | Licence | Integrated as | Boundary |
|---|---|---|---|---|
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) `skills/taste-skill` (v2.0.0) | `a60a36dc2bb3bb77ccf17f2f62041f5ca8a458b9` | MIT | Runtime vendored in `tools/taste/` with Asterframe adaptations (scripts, library, assets, references); workflow adapted as `direct` in `references/direct.md` | Upstream `SKILL.md`, `README.md`, and evals not copied (no nested skills). Integrity allowances are rejected at runtime; still/final phases separate composition from motion review. Image/motion quotas are removed. House-style defaults permit documented brief-, brand-, system- or subject-led exceptions |
| [madebymustafa/design-taste](https://github.com/madebymustafa/design-taste) | `c4a6bff0871eb4b15371b0e7d2751628b0ed4608` | MIT | Ten genre packs condensed in `references/genres.md`; motion tokens, choreography, GSAP architecture in `references/motion-library.md`; landing objections in `references/direct.md` | Packs are opt-in identities with conservative defaults and documented style exceptions: mono labels, index numbers, hairlines, outlined boxes, hard shadows, cream/terracotta grounds, misregistration and accent words replaced; palettes re-checked against the inspector. Selling sequence is a checklist of objections, not a page template |
| [marvkr/better-design](https://github.com/marvkr/better-design) | `e146625f3041ef8089a2013587435fc763dc3b15` | MIT | 31 product presets and registry install pattern in `references/genres.md`; transitions.dev timing values and the bundled text-effect catalog restated as parameters in `references/motion-library.md`; optional MCP review loop | No component code or tokens copied; MCP used only when connected; installer never run by the skill |
| [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | `120f64f6ca60348e251f929e9c81f11ccbe45eda` | MIT | Component index and install command in `references/effects-catalog.md` | No code redistributed; reduced-motion gap documented |
| [ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts) | `88d827d7ec342917ca06f6894e5add65fabbe5d8` | MIT | Registry families and install URL in `references/effects-catalog.md` | Section blocks treated as scaffolding to recompose, not finished design |
| [ui-layouts/cursify](https://github.com/ui-layouts/cursify) | `b3a173c33f12e74550389c9555f9ce85c30c46f6` | none found | Effect families and cursor rules in `references/effects-catalog.md` | No licence: reference only, no code copied or recommended for copying |
| [DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) | `a04a99b235299ee79a123a16ccb2e6cf9da74b6b` | MIT + Commons Clause | Component families, install pattern, browser-support caveats in `references/effects-catalog.md` | Commons Clause forbids redistributing components: install into the user's app only, never vendored |
| [paper-design/shaders](https://github.com/paper-design/shaders) | `43cd68db79fa0b1759f72ffc941b3238e2a3954c` | Apache-2.0 | Shader index by job, pinning, WebGL2 fallback, and reduced-motion rules in `references/effects-catalog.md` | Package installed by users; no shader code redistributed |
| [superdesigndev/superdesign](https://github.com/superdesigndev/superdesign) | `49e2b9dd9615c6dae936b326b1ddb85d4f1d6f19` | AGPL-3.0 (+ enterprise files) | Ideas only, independently written: staged structure → theme → motion → mockup exploration, numbered variant files, compact motion-spec notation (`references/explore.md`, `references/motion-library.md` §2) | No text, prompt, or code copied, keeping Asterframe free of AGPL obligations |

New commands: `direct`, `explore`. New references: `direct`, `explore`, `genres`, `motion-library`, `effects-catalog`. `references/taste.md` is kept as the archived v2-experimental reference.
