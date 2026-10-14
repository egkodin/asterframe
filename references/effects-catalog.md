# Effects catalog

Where to get a ready-made motion component, shader, cursor, or canvas effect once the design has earned one. This is a sourcing index for `animate`, `delight`, `overdrive`, `direct`, and `explore`; the decision to use an effect comes from the brief, the signature-element budget, and the motion policy, never from availability.

Asterframe redistributes none of these libraries. Install from the official source into the user's project, after verifying the current API, version, and licence, and only when the project's stack fits. If a project already has an equivalent, use it.

## Selection gate

Before installing any effect, answer all five:

1. **Purpose.** Which job does it do: feedback, continuity, explanation, the one signature moment, or ambient texture? "It looks cool" is not a job.
2. **Budget.** Is this the page's single boldness spend? A shader hero plus a fluid cursor plus a text scramble is three signatures, which is none.
3. **Stack.** Does it match the existing framework and styling (React + Tailwind + Motion for most registries below)? Do not add React to a non-React site or Tailwind to a CSS-modules codebase for one effect.
4. **Fallback.** What does a reduced-motion user, a touch user, a keyboard user, a no-WebGL browser, and a no-script render see? The answer must be a complete page.
5. **Cost.** Bundle weight, GPU/battery cost on a mid-range phone, and CLS. Canvas and shader effects pause offscreen or they do not ship.

Most copy-paste component libraries ship **no reduced-motion handling** (motion-primitives and ui-layouts had essentially none when checked). Wrap Motion apps in `<MotionConfig reducedMotion="user">` and guard opacity/color loops and canvas animation yourself (see [motion library](motion-library.md) §7).

## Motion components — motion-primitives

[ibelick/motion-primitives](https://github.com/ibelick/motion-primitives), MIT. React + Tailwind + Motion (`motion`), icons from `lucide-react`.

```bash
npx motion-primitives@latest add <component>
```

| Need | Component | Gate |
|---|---|---|
| Staggered list/grid entrance | `animated-group`, `in-view` | once per section; distance per motion library §5 |
| Number change | `animated-number`, `sliding-number` | tabular figures; announce the final value, not each frame |
| Text arrival / swap | `text-effect`, `text-loop`, `text-morph`, `text-roll`, `text-scramble` | display lines only; preserve accessible text; scramble never on content people must read |
| Shimmer label | `text-shimmer`, `text-shimmer-wave` | loading or AI-progress states only; infinite, so guard reduced motion |
| Shared-element dialog/popover | `morphing-dialog`, `morphing-popover` | check focus trap, restore, Escape, and scroll lock in the installed version |
| Tab/segment highlight | `animated-background`, `transition-panel` | keep real tab semantics |
| Disclosure | `accordion`, `disclosure` | prefer native `<details>` when no animation is needed |
| Pointer flourish | `magnetic`, `tilt`, `spotlight`, `cursor` | fine pointer only (`@media (hover:hover) and (pointer:fine)`); never the only affordance |
| Ambient edge | `border-trail`, `glow-effect` | one per viewport; never on dense UI |
| Logo/marquee strip | `infinite-slider` | pause on hover/focus and under reduced motion |
| Comparison | `image-comparison` | keyboard-operable handle with a label |
| Progressive blur, scroll progress | `progressive-blur`, `scroll-progress` | decorative; `aria-hidden` |
| App-like chrome | `dock`, `toolbar-dynamic`, `toolbar-expandable`, `carousel`, `dialog`, `spinning-text` | match platform conventions; spinning text is decoration |

## Sections and creative layouts — ui-layouts

[ui-layouts/uilayouts](https://github.com/ui-layouts/uilayouts), MIT. 327 registry items; most need `motion`, `clsx`, `tailwind-merge`; some need `three`/`@react-three/fiber`, `cobe`, `swapy`, or `@shadergradient/react`.

```bash
npx shadcn@latest add https://ui-layouts.com/r/<item>
```

| Family | Items (prefixes) | Use when |
|---|---|---|
| Scroll storytelling | `scroll-animation*`, `timeline-animation*`, `sticky-hero-section`, `sticky-gallery`, `stacking-card`, `horizontal-scroll`, `scroll-text*` | the argument is a sequence; respect the two-pin budget and native fallbacks |
| Image and media | `image-reveal*`, `*-clippath`, `*-imagemasking`, `*-videomasking`, `img-ripple-effect`, `image-mousetrail*`, `blur-vignette*` | real imagery exists and the reveal explains or frames it |
| Carousels and galleries | `progressive-carousel`, `framer-*-carousel`, `*-slider`, `gallery-modal-*`, `media-modal` | content is genuinely browsable; keyboard and swipe both work |
| Data and numbers | `motion-number-*`, `number-flow-trading`, `flipcountdown`, `globe`, `card-globe` | the number or geography is the claim |
| Inputs | `file-upload`, `tags-input`, `phone-input`, `datetime-input`, `multi-selector`, `range-slider`, password strength items | a form needs the control and no project equivalent exists; verify labels and errors |
| Overlays | `linear-modal*`, `responsive-modal`, `directional-drawer*`, `motion-drawer*`, `nested-vaul-drawer` | least interruptive surface first |
| Section blocks | `hero-*`, `feature-*`, `about-*`, `team-*`, `stats-*`, `*-testimonial`, pricing items, `faq-*`, `footer-*` | **scaffolding only.** Recompose to the direction; a stock block shipped as-is is the template look Asterframe exists to remove |
| Ornament | `sparkles*`, `liquid-glass*`, `liquid-gradient*`, `mesh-gradient-background*`, `animated-beam*`, `noise-effect`, button hover packs | only when it is the declared signature; otherwise it is slop |

## Cursor and pointer effects — Cursify

[ui-layouts/cursify](https://github.com/ui-layouts/cursify) ([cursify.ui-layouts.com](https://cursify.ui-layouts.com)). The repository carries **no licence file**, so treat its code as all rights reserved: do not copy it into Asterframe or a client project without the author's permission; use it as a visual reference or ask the user to obtain rights. Families: follow/springy/smooth/magnetic/scaling cursors, trails (trail, rainbow, fairydust, snowflake, bubble, character), fluid/canvas/neon/glitch/3D cursors, click effects, and pointer-reactive dot/ribbon/bar patterns.

Rules for any custom cursor, from any source: never on coarse pointers; the native cursor stays available for text and controls; no information conveyed only by the cursor; `pointer-events: none` on the cursor layer; pause the rAF loop when the tab is hidden and under reduced motion; at most one cursor treatment per site. A difference-blended dot that grows over interactive targets is usually the ceiling for product-adjacent brands.

## Canvas and WebGL page effects — Canvas UI

[DavidHDev/canvas-ui](https://github.com/DavidHDev/canvas-ui) ([canvasui.dev](https://canvasui.dev)). Licence: **MIT + Commons Clause**: components may be used inside an application, website, or product, but must not be sold, sublicensed, or redistributed as components. Install into the user's app only; never vendor them into Asterframe or a component library.

```bash
npx shadcn@latest add @canvas-ui/<component>-react          # also -solid, -preact, -vue, -svelte, -vanilla
npx shadcn@latest add @canvas-ui/<component>-react-webgpu   # WebGPU build, same props
```

Families: fluid and motion (Liquid, Ripple, Cloth, Droplets, Bubble, Displacement), fire and energy (Blaze, Flame Wrap, Force Field, Laser), glass and optics (Glass, Frost, Magnify, Bend, Peel, Clouds), retro and glitch (VHS, Glitch, Retro Dither, Asciify, Decrypt Reveal, Glyph Rain), particles and structure (Particle Reveal, Particle Scroll, Shatter, Grid, Hex Float, Canvas), and 3D objects from GLB/SVG/image (ASCII, Glass, Particle, Dithered, Liquid Object).

Most page-wrapping effects depend on Chrome's experimental HTML-in-canvas API (flag or origin trial) and fall back to a GPU overlay elsewhere; the 3D object effects work everywhere. Before shipping: confirm the fallback looks intentional in Safari and Firefox, the wrapped content stays selectable and keyboard-operable, the effect respects reduced motion (the library reads the media query; verify in the installed version), and the frame budget holds on a mid-range phone. One wrapper effect per page, normally scoped to the hero or the signature section rather than the whole document.

## Shader textures — Paper Shaders

[paper-design/shaders](https://github.com/paper-design/shaders), Apache-2.0. Zero-dependency WebGL2 canvas shaders, React (`@paper-design/shaders-react`) or vanilla (`@paper-design/shaders`). Versioning is `0.0.x` with breaking changes: **pin the exact version** you verified.

| Job | Shaders |
|---|---|
| Quiet ground or field | `static-mesh-gradient`, `static-radial-gradient`, `paper-texture`, `grain-gradient` |
| Print and texture identities | `halftone-dots`, `halftone-cmyk`, `dithering`, `image-dithering` |
| Ambient motion (one per page) | `mesh-gradient`, `warp`, `swirl`, `waves`, `smoke-ring`, `gem-smoke`, `neuro-noise`, `perlin-noise`, `simplex-noise`, `voronoi` |
| Material and light | `liquid-metal`, `fluted-glass`, `water`, `god-rays`, `lens-distortion`, `color-panels` |
| Data-ish / UI accents | `dot-grid`, `dot-orbit`, `metaballs`, `spiral`, `heatmap`, `pulsing-border` |

Usage rules:

- Colors come from the design tokens, not the demo presets; a shader must not reintroduce the default violet/indigo atmosphere.
- `speed={0}` (or a static variant) under reduced motion; animation pauses automatically when offscreen or the tab is hidden.
- The mount throws when WebGL2 is unavailable: wrap it in an error boundary or feature check and keep a CSS background of the same tokens underneath, so text contrast never depends on the shader.
- Cap cost with `maxPixelCount`/`minPixelRatio` on large surfaces; size the container explicitly to avoid CLS.
- Text over a shader needs a measured contrast check against its lightest and darkest frames, or a solid scrim.
- When redistributing modified Paper Shaders code (not merely installing the package), preserve its LICENSE and NOTICE.

On brand pages the taste-skill v2 house rules apply: the inspector reports shader fields as gradients, which fail. Use a shader there only when it is an existing brand asset (then allow `gradient` with that reason); otherwise prefer flat colour or a real photograph. Shaders remain available on product surfaces and outside the `direct` gate, subject to the selection gate above.

## Text and UI transitions

Exact values for text effects and the nine UI transitions are in [motion library](motion-library.md) §3–4, with shadcn installs from Better Design for projects that want reference implementations.
