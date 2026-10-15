# Genre packs and system presets

Two kinds of ready-made identity. Use one only when the brief names it, a reference clearly matches it, or the user picks it from a short list you offered. Never stack two packs on one surface, and never apply a pack over an existing brand or design system without authority to replace it.

- **Genre packs** are brand-register identities (palette, type, composition, motion). Adapted from [madebymustafa/design-taste](https://github.com/madebymustafa/design-taste) (MIT) and **translated into the taste-skill v2 house style**.
- **System presets** are product-register token sets with themed shadcn/ui components. Catalogued from [marvkr/better-design](https://github.com/marvkr/better-design) (MIT).

## Use the brief and preserve integrity

Treat the taste toolkit's house style as the default against unearned decoration, subordinate to the brief, existing brand, and accessibility. A pack supplies palette, typefaces, proportions, composition, and motion options. The conservative translations below replace common defaults as follows; retain a deliberately requested device when it has a concrete rationale and passes integrity checks:

| Upstream device | Replacement |
|---|---|
| Mono or tiny tracked-caps labels, eyebrows | Sentence case in the text face at 13px or more; tabular figures where numbers align |
| 01 / 02 / 03 section indexes | Order shown by position, scale, or words; a real `<ol>` when order matters |
| Hairlines, rules, outlined boxes, grid lines | Space, a step in background tone, a change of scale, or a filled field |
| Hard offset or soft resting shadows | A tone step or a solid colour field; shadows only on what floats (menu, dialog) |
| Cream / yellow paper grounds | Low-chroma stone or bone that the inspector does not classify as cream |
| Terracotta, rust, violet, indigo accents | A pure red, blue, green, or the pack's other ink |
| Italic, coloured, or underlined accent word | One face, one colour; the words carry the emphasis |
| Gradients, halftone patterns, text shadows | Flat colour, real photographs, or real printed matter found with `assets.mjs` |

There is no minimum image or animation count. Choose them for the content and audience; static, typographic and single-image pages may be complete. A deliberate brief, brand, design system or subject-specific rationale may justify a scoped style `--allow`, recorded in the report. A pack name alone does not justify every device. Integrity rules can never be allowed; the runtime rejects attempts to suppress them.

All values below were checked against the inspector's palette rules. Hex values are starting points: recompute contrast for every text/ground pair actually used.

## How to apply a pack

1. Name it in the Design Read: "Reading this as: … in the editorial-minimal identity."
2. Run `direct` with `--keep palette,type` and map the pack's colours and faces onto the dealt roles; take composition from the draw.
3. Keep the pack's one signature and spend no other boldness budget.
4. Follow `references/direct.md` step 9 to decide whether motion earns its place; no animation is valid.
5. Gate with `lint.mjs` and `inspect.mjs --phase still`, then `--phase final`; record any justified style allowances.

## Genre packs

### editorial-minimal — a broadsheet that happens to be a website

- **Palette:** stone ground `#F1F1EE`, tone panel `#E6E6E1`, ink `#1A1A18`, secondary ink `#5C5A55`, one red `#D7261E` for the action and one other moment.
- **Type:** a characterful serif display (Fraunces, Newsreader, Charter) very large, leading 0.95–1.05, normal weight; body in the same serif or one sans at 17–19px, max 36em. Two faces at most.
- **Composition:** asymmetric 7/12 + 5/12; section changes marked by a step in ground tone and by scale, not by rules or numbers; long editorial columns beside one dominant photograph per section.
- **Signature:** an oversized pull quote set as a `<blockquote>` statement (≤36px, ≤25 words) against a full-tone field.
- **Motion flavour:** calm masked line rises on headings, slow drift on the dominant photograph, underline growth on links.

### brutalist-industrial — a declassified blueprint

- **Palette:** concrete `#E8E8E3`, dark variant `#1B1B18`, ink `#141414`, one signal: safety orange `#E8540B`, industrial yellow `#E3B23C`, or technical blue `#2B5FA8`.
- **Type:** heavy grotesk (Archivo, Archivo Black) 700–900, uppercase display at huge scale; body same family 16–17px in sentence case.
- **Composition:** structure through solid blocks of ink and signal colour, abrupt scale changes, and edge-to-edge photographs of machines, plans, or materials (archival engineering drawings via `assets.mjs`); specifications as a real `<table>`, which keeps its own lines.
- **Signature:** one full-bleed signal-colour field holding the headline.
- **Motion flavour:** fast 80–150ms snaps, clip reveals, instant inverted hover fields. No soft easing.

### quiet-luxury — a private bank's annual report

- **Palette:** bone `#F3F3F1`, alternate `#E6E6E1`, espresso ink `#17130F`, secondary `#5E564C`; one accent: brass `#9A7B4F`, oxblood `#742D2C`, or forest `#2E4436`.
- **Type:** a high-contrast serif (Cormorant, Playfair Display, Garamond) at display size, 400–500, no italic accent words; one quiet sans for body at 17px, leading 1.6, full ink.
- **Composition:** generous space as the luxury (hero ≥18vh, section gaps ≥140px) filled by large, carefully cropped photographs of material and place; pricing as a quiet list separated by tone, not rules.
- **Signature:** one photograph of the material at full bleed with the name set small in a corner.
- **Motion flavour:** 500–700ms rises on `cubic-bezier(.22,1,.36,1)`, a very slow scale on photographs, restrained tint on hover.

### dark-tech — a precise, quiet, fast machine

- **Palette:** ground `#08090A`, panels `#0E0F11` / `#131417`, hover `#181A1D`; text `#F7F7F8` / `#B4BAC2`; one accent: signal blue `#2F5BEA`, emerald `#34D399`, or amber `#F5A524`. No violet or indigo.
- **Type:** a neutral grotesk with character, one family; metadata in the same face with tabular figures. Code and terminal output in `pre`/`code`, where mono is correct.
- **Composition:** the product's real interface fragments are the imagery (marked `data-ui`, so their own borders survive the inspector); panels separate by tone steps; data tables are real tables.
- **Signature:** one live interface fragment that responds to the visitor (the live thing).
- **Motion flavour:** 120–240ms standard easing, tone shifts on hover, one ambient status pulse.

### playful-color — a poster you cannot walk past

- **Palette:** white `#FFFFFF` or stone `#F3F3F1`, ink `#101014`, two saturated inks from cobalt `#2E4BFF`, tomato `#FF4D2E`, banana `#FFD100`, mint `#2BD99B`, fuchsia `#FF3ED2`.
- **Type:** ultra-heavy display (Archivo Black, Bricolage Grotesque 800) huge, leading 0.95; body same family.
- **Composition:** full-bleed flat colour fields alternating section by section; slight 2–4° rotation on at most three photographs or fields; chunky flat square or fully round buttons.
- **Signature:** one section where a single ink fills the whole screen behind the headline.
- **Motion flavour:** overshoot `cubic-bezier(.34,1.56,.64,1)` 350–500ms once per element, energetic but never looping. Never white text on banana.

### retro-print — a risograph poster fresh off the drum

- **Palette:** stock `#EDEDEA`, pulled panel `#E6E6E1`, print black `#21201C`, riso fluorescent pink `#FF48B0` and riso blue `#355E8C`. Two inks, never a third.
- **Type:** a condensed poster display (Anton, Archivo Narrow 800) uppercase; a quiet serif body (Newsreader, Georgia).
- **Composition:** flat overprinted colour fields, scanned or archival printed matter as the imagery (posters, tickets, engravings via `assets.mjs`), elements running to the edges like print bleed.
- **Signature:** one archival print enlarged across a full screen in the two-ink palette.
- **Motion flavour:** 200ms snap-up, like paper landing; a slow pan across the enlarged print.

### japanese-minimal — a room with one vase

- **Palette:** stone `#F1F1EE`, alternate `#E6E6E1`, sumi `#33302B`, stone ash `#6B655C`, one hanko red `#A8231C` used as a mark, never a surface.
- **Type:** a mincho serif display (Shippori Mincho) 400–600, leading 1.15–1.3 (as a statement, it still holds to two lines); a clean gothic body 16px, leading 1.8; one `writing-mode: vertical-rl` element.
- **Composition:** negative space with one large photograph per screen so no screen reads as empty; tone panels without borders; the seal mark twice.
- **Signature:** the vertical line beside a single photograph of an object.
- **Motion flavour:** slow 600–800ms rises, a very slow drift on photographs, hover to seal red.

### neo-brutalism — loud, honest, square

- **Palette:** white `#FFFFFF`, field `#F3F3F1`, ink `#0A0A0A`, hot `#FF3878` plus cool `#7CC6FE`.
- **Type:** geometric grotesk 700 (Space Grotesk, Archivo 800) at large size; body same family.
- **Composition:** the upstream identity was built on ink borders and hard offset shadows, both banned here. Its translation carries the loudness through square, flat, saturated colour fields, oversized square buttons (≥56px), and abrupt scale; hot and cool fields never touch.
- **Signature:** a hot field with the headline and a single cool-field action beside it.
- **Motion flavour:** 120–250ms snaps with slight overshoot; press shifts the button by its own size, no shadow.

### corporate-trust — the safe choice, on purpose

- **Palette:** white `#FFFFFF`, panels `#F8FAFC`, inset `#F1F5F9`; ink `#0F1722` / `#3B4657`; one deep blue `#1F4FE0`; status only: success `#0E7F4B`, danger `#C0362C`.
- **Type:** one system or neutral sans, display 500–600 (keep the scale modest but clearly above body); body 16px.
- **Composition:** conventional reading order; evidence is the imagery (real people, real places of the company, its actual interface); comparison and pricing as real tables; surfaces by tone, no outlined cards or eyebrows.
- **Signature:** one sourced metric set very large beside the photograph that proves it.
- **Motion flavour:** sequential section entrances 200–300ms, tonal hovers, nothing theatrical.

### cinematic-motion — opening credits on studio print

- **Palette:** stone `#F1F1EE`, ink `#121212`, one electric blue `#0F4BFD`; scenes alternate stone / ink (max two) / one full-blue scene.
- **Type:** a tight grotesk 500–700, very large headlines, leading 0.94, tracking −0.04em, one colour per headline; scene labels in the same face, sentence case.
- **Composition:** the page as a film: hero with the real product screen built in HTML (`data-ui`), pinned story section, drag carousel with a native scroll-snap fallback, native `<details>` accordion, evidence, close.
- **Signature:** a pinned scene in which the content changes on every screen of the pin.
- **Motion flavour:** the richest pack; follows the GSAP architecture in [motion library](motion-library.md): two pins maximum, desktop only, `matchMedia` gating, cursor effects hidden on coarse pointers. Complete with script off and with reduced motion.

## System presets (product register)

Thirty-one token sets with themed shadcn/ui components, chosen by product and audience rather than by taste:

| Preset | Character | Fits |
|---|---|---|
| `linear`, `linear-quality` | dark, minimal, layered precision shadows | developer and productivity tools |
| `vercel`, `supabase`, `monochrome-industrial`, `neutral-monochrome` | dark, technical, one or no accent | deployment, backends, CLIs, data-heavy tools |
| `stripe`, `corporate-fintech`, `precision-light` | light, data-dense, premium shadows | payments, banking, B2B SaaS |
| `notion`, `minimal-light`, `tactile-minimal` | light, flat or border-only | productivity, utilities, focus tools |
| `airbnb`, `light-marketplace`, `pillow-light` | warm, friendly, soft | marketplaces, consumer, lifestyle |
| `apple`, `figma` | premium consumer / creative tooling | consumer apps, design tools |
| `editorial-dark`, `cinematic-dark`, `tv-style` | content-first dark | publishing, streaming, media |
| `dark-orange`, `vibrant-dark`, `lumen-dark`, `inset-dark`, `midnight-glass`, `glassmorphic-dark` | dark SaaS variants (accent, bloom, glow, recessed, glass) | dashboards, analytics, consumer social |
| `metal-fx-gold`, `metal-fx-silver`, `metal-fx-chromatic`, `beam-custom`, `beam-lib` | metallic or custom effects | luxury, hardware, bold brands |

Install a preset component into a shadcn/ui project only when the project has no design system or the user asked to change it:

```bash
npx shadcn@latest add https://www.better-design.com/registry/<preset>/<component>.json
npx shadcn@latest add https://www.better-design.com/registry/<preset>/transitions.json   # nine transition primitives
```

Each preset ships `globals.css` semantic tokens (OKLCH, `--background` … `--ring`, `--radius`) plus component overrides; the nuance lives in the components (shadow layers, focus rings, border weights), so prefer the component over copying colors alone. Verify the registry responds before relying on it; network access and the shadcn CLI are prerequisites.

Product-name presets describe a public visual vocabulary for orientation; they are not an endorsement or a license to imitate a company's brand on a page that could be taken for theirs.

**Better Design MCP (optional).** If its tools are connected in the session (`find-design-system`, `get-design-system-kit`, `get-ui-principle`, `get-ux-principle`, `get-review-rules`, `check-comprehension`, `review-ui-code`, `inspect-spacing`), use principles before building and review rules after, and fix critical and serious findings. Its hosted endpoint needs an account API key; do not run its installer or claim its review ran when the tools are absent.
