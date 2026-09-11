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

## Refresh record

This integration was refreshed on 2026-09-11. The Asterframe upstream itself is
still at `egkodin/asterframe` `2644a30d7920c68f933202994c7e0ca0997bcf3a`; the
source refresh below is therefore an explicit compatibility merge, not a new
upstream Asterframe release.

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
