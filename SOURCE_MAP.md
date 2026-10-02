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
