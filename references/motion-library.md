# Motion library

Exact values for motion that has already passed the motion policy in `SKILL.md` (purpose, frequency gate, reduced motion). This file supplies numbers and architecture; it never decides that something should move. Use it from `animate`, `delight`, `overdrive`, `direct`, `explore`, and `motion-scout` reports.

Sources: duration/easing discipline and GSAP architecture adapted from [madebymustafa/design-taste](https://github.com/madebymustafa/design-taste) (MIT); UI transition values from the [transitions.dev](https://github.com/Jakubantalik/transitions.dev) ports in [marvkr/better-design](https://github.com/marvkr/better-design) (MIT); text-effect values from the animate-text catalog bundled there (origin `pixel-point/animate-text`), restated as parameters. Brand-page recipes live in `tools/taste/references/motion.md`.

## 1. Tokens

| Token | Duration | Use |
|---|---|---|
| `--dur-instant` | 0ms | 100+ uses/day, keyboard-driven core actions |
| `--dur-fast` | 100–160ms | hover, press, focus ring, toggle |
| `--dur-base` | 200–300ms | small enter/exit, dropdown, tooltip, tab panel |
| `--dur-slow` | 400–600ms | section reveal, dialog, page transition |
| `--dur-hero` | 600–900ms | the one hero entrance sequence |

Under 100ms reads as a blink unless a snap is the identity; over 900ms (outside loaders and scrubbed scroll) reads as a slow site. Exits run faster than entrances, typically 55–70% of the enter duration.

| Easing | Curve | Use |
|---|---|---|
| standard | `cubic-bezier(0.4, 0, 0.2, 1)` | state changes, hovers |
| emphasized / out-expo-like | `cubic-bezier(0.22, 1, 0.36, 1)` | entrances, reveals, overlays |
| material emphasized | `cubic-bezier(0.2, 0, 0, 1)` | shared-axis and fade-through transitions |
| exit | `cubic-bezier(0.4, 0, 1, 1)` | leaving elements |
| spring overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` | playful identities only, once per element |
| soft overshoot | `cubic-bezier(0.34, 1.36–1.45, 0.64, 1)` | badges, digits |

Do not use `ease-in-out` as the global curve; reserve `linear` for progress, marquees, and scrubbed timelines.

## 2. Writing a motion spec

Before implementing more than two moves, write them in one compact line each so reviewers can check purpose and values together:

```text
target: duration easing [property from→to, …] trigger (+delay | stagger)
dialog: 250ms emphasized [scale .96→1, α 0→1] open; 150ms [scale 1→.96, α 1→0] close
menu-item: 200ms standard [y 6→0, α 0→1] open stagger 30ms
send-button: 120ms standard [scale 1→.97→1] press
```

Every line names one trigger; anything without a trigger and purpose is cut.

## 3. UI transition recipes

All transform/opacity (blur only where noted, on small elements), scoped CSS custom properties, reduced motion disables the travel.

| Transition | Open | Close | Values |
|---|---|---|---|
| Modal | 250ms emphasized | 150ms | scale 0.96→1 + opacity; `transform-origin: center`; focus trap/restore and Escape remain the dialog's job |
| Dropdown / menu | 250ms emphasized | 150ms | pre-scale 0.97, closing scale 0.99, origin at the trigger edge |
| Panel reveal (sheet) | 400ms emphasized | 350ms | translateY 80px + 2px blur |
| Card resize | 300ms emphasized | — | animate with FLIP transforms, never width/height |
| Icon swap | 200ms ease-in-out | — | start scale 0.25 + 2px blur, cross-fade both icons in one box |
| Text swap | 200ms ease-out | — | translateY 8px + 2px blur, outgoing and incoming overlap |
| Page / tab slide | 200ms emphasized | 200ms | 8px directional slide + 3px blur; direction follows navigation order |
| Number pop-in | 500ms soft overshoot (1.45) | — | per digit 8px travel, 70ms stagger, 2px blur; use tabular figures |
| Notification badge | slide 260ms emphasized, pop 500ms soft overshoot (1.36) | 180ms standard | 2px blur, small offset from the anchor |

Install the reference implementations only when the project uses shadcn/ui and lacks its own: `npx shadcn@latest add https://www.better-design.com/registry/<preset>/transitions.json` (all nine, themed by CSS variables, with focus handling in the modal).

## 4. Text effects catalog

Choose by job: first-load reveal, state swap, or emphasis. Preserve the existing copy; split per unit with real text kept accessible (`aria-label` on the wrapper or visually hidden full string; split spans `aria-hidden`).

| Effect | Unit | Enter (ms) | Stagger | Easing | From | Fits |
|---|---|---:|---:|---|---|---|
| soft-blur-in | char | 900 | 25 | emphasized | y16, blur12, α0 | premium hero title |
| per-character-rise | char | 700 | 24 | `(.2,.8,.2,1)` | y32 | crisp kinetic title |
| bottom-up-letters / top-down-letters | char | 400 | 88 | `(.18,1,.32,1)` | y±46 | pronounced staircase, short words |
| typewriter | char | 240 | 46 | `steps(1,end)` | α0 | terminal, editorial typing |
| stagger-from-center / -edges | char | 620 | 22 | emphasized | y12, blur3 | keyword emphasis |
| per-word-crossfade | word | 700 | 70 | `(.16,1,.3,1)` | y8 | calm keynote rhythm |
| spring-scale-in | word | 360 | 95 | spring overshoot | scale .7 | playful identities |
| blur-out-up | word | 560 | 28 | emphasized | y10, blur6 (exit y−14, blur8) | airy swaps |
| depth-parallax-words | word | 700 | 70 | emphasized | y18, scale .92, blur3 | layered statements |
| shared-axis-y | word | 180 | 78 | `steps(1,end)` | hard cut | sharp editorial swaps |
| kinetic-center-build | word | 360 | layout | `(.2,.8,.2,1)` | y6, blur3.5 | words push in and lock centred |
| short-slide-right / -down | word | 520 | 92 / layout | `(.2,.8,.2,1)` | x−24 / y−24 | phrase glide, stacked build |
| mask-reveal-up | line | 760 | 90 | emphasized | y30, blur6 in overflow mask | editorial headline |
| line-by-line-slide | line | 900 | 120 | emphasized | x−48 | paragraph reveal |
| micro-scale-fade | whole | 600 | — | `(.32,.72,0,1)` | scale .96 | labels, quiet polish |
| fade-through | whole | 420 (exit 260) | — | material emphasized | y6, scale .99, blur2 | content replacement |
| shared-axis-x / -z | whole | 500 / 520 | — | material emphasized | x24 / scale .9 | sibling navigation / depth change |
| scale-down-fade | whole | 520 | — | emphasized | y8, scale 1.04 | settle-in |
| focus-blur-resolve | whole | 760 | — | emphasized | y14, blur14 | one dramatic focus pull |
| shimmer-sweep | whole | 850 | — | emphasized | x−22, blur8 | brief glint on arrival |

Rules: per-character effects only on short display lines and inside a desktop/no-reduced-motion gate; never on body copy or anything read repeatedly. Layout-aware builds (kinetic-center, short-slide-down) must keep their layout logic rather than be flattened into a generic stagger. A requested library (WAAPI, Motion, GSAP, CSS) is binding: convert ms→s for Motion/GSAP and use `CustomEase` for cubic-bezier curves in GSAP.

## 5. Choreography

- **Stagger is hierarchy:** heading → body → media/action, 60–120ms apart, same duration and easing.
- **Distance:** product UI 4–12px; brand sections 16–32px. Scale entrances 0.96→1 only on overlays, never on whole sections.
- **One trigger per element:** reveal once as it enters (`IntersectionObserver` or CSS scroll-driven animation with a fallback); no re-animation on every pass.
- **Loops:** at most one class per page, ambient status only (live dot, loader). Everything else that loops needs an explicit brief.
- **Hover:** one property change, 100–150ms; press is its inverse, 80–120ms. Disabled controls do not react.
- **Layout change:** FLIP or shared-element transitions (View Transitions API where supported) for list → detail; 300–500ms; disabled under reduced motion.

## 6. GSAP architecture

Use only when GSAP is already installed or the brief's motion intensity justifies adding it (verify the current version and licence terms first).

- One `gsap.context(() => {…}, root)` per page or component; `ctx.revert()` on unmount.
- Gate through `gsap.matchMedia()`: all animation inside `(prefers-reduced-motion: no-preference)`; pins, scrubs, and per-character splits also inside `(min-width: 768px)`.
- **Safety contract:** elements are visible in CSS; `gsap.from()` hides them only when script and motion are active. If GSAP never loads, the page is complete.
- One named timeline per section. Standard reveal: `y: 40, opacity: 0, duration: .9, ease: "power3.out"`, trigger `top 82%`, `once: true`. Hero intro: 80–120ms stagger, `expo.out`, total under 1.4s.
- **Pins:** at most two per page, `start: "top top"`, `end: "+=200%"`–`"+=300%"`, never nested, desktop only. Horizontal galleries pin the section and translate the track `x`, with `end: () => "+=" + (track.scrollWidth - innerWidth)`, `scrub: 0.6–1`, `invalidateOnRefresh: true`; native `overflow-x` + scroll-snap remains the fallback.
- **Draggable carousels:** `bounds` as a function so it recalculates on resize, `edgeResistance` ≈0.9, keyboard-reachable items, native scroll-snap fallback.
- `ScrollTrigger.refresh()` after `document.fonts.ready` and `window` load.
- **Smooth scroll** only when the brief asks for it: Lenis (`duration` ≈1.1, `anchors: true`), wired with `lenis.on("scroll", ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`; never under reduced motion.
- Count-ups tween a proxy object and write `textContent` in `onUpdate`, once.
- `will-change` only during the animation.

## 7. Motion (Framer Motion) projects

Wrap the app once in `<MotionConfig reducedMotion="user">` so library components drop transform and layout animation for users who ask for reduced motion; most copy-paste component libraries do not handle it themselves. Opacity and color animations still run under that setting, so infinite opacity or color loops (shimmers, pulses, glows) need their own guard. Use `useReducedMotion()` for anything driven manually (intervals, canvas, springs on pointer). Prefer `layout`/`layoutId` for shared-element transitions over measuring and animating size.

## 8. Fails

- An animation that cannot be explained in one sentence.
- Animated `width`, `height`, `top`, `left`, `margin`, or large `filter`/`box-shadow`.
- Every element animating on load, or one identical fade on every block.
- Content that stays hidden when script fails or motion is reduced.
- More than one looping element per viewport, or a marquee/autoplay with no reduced-motion stop.
- A pin under 768px, more than two pins, or scroll-jacking without a tested fallback.
- A still frame (no script, reduced motion) that is not a complete page.
