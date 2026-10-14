# explore — divergent variations before commitment

Use when the user wants options to compare ("show me a few directions", "try three versions of this screen", "iterate on version 2") or when the direction is genuinely open and a wrong commitment would be expensive. Not for settled work, a bug fix, or a polish pass: exploration never replaces the narrow command the task needs.

Exploration produces disposable, self-contained mockups. It does not change the product's source until the user picks a variant and asks for it to be built (then hand off to `craft`, `direct`, or `redesign`).

## Output location and naming

- Write mockups to `.asterframe/explorations/` in the project root, creating it on first use. Suggest adding it to `.gitignore` unless the user wants explorations committed.
- New screen: `<slug>_<n>.html` (`pricing_1.html`, `pricing_2.html`, `pricing_3.html`).
- Iterating on a variant: `<parent>_<n>.html` (`pricing_2_1.html`, `pricing_2_2.html`). Never overwrite a variant the user has seen.
- Each file is one screen, standalone, opening straight from the file system: inline CSS and tokens, no build step. A CDN stylesheet or font is acceptable only if the environment allows remote assets; otherwise system fonts. Optionally a shared `<slug>.tokens.css` per variant family when several screens share one theme.
- Images: real project assets referenced by relative path, or drawn/typographic stand-ins clearly marked. Never hotlink placeholder services or fabricate product shots.

## Stages

Move through stages in order. When the user is present and asked to steer, pause for a decision after stage 1 and stage 2; when they asked for finished options, run all stages and present the results together.

1. **Structure.** For each variant, an ASCII wireframe of the screen at desktop and phone width: regions, hierarchy, primary action, and what is deliberately absent. Variants must differ in composition and hierarchy, not only in color. Name each variant's thesis in one line.
2. **Theme.** Tokens per variant: ground, ink, accent, surfaces, type roles and scale, spacing unit (4 or 8 multiples), radius, elevation. Pull from the existing system when there is one; otherwise from a [genre pack](genres.md), a `direct` draw (`node "$T/scripts/draw.mjs" … --options 3` deals three researched directions), or a palette derived from brand colors. Contrast-check text pairs now.
3. **Motion.** A compact spec per variant in the notation from [motion library](motion-library.md) §2. Usually three to eight lines; zero is a valid answer for operate-mode screens.
4. **Mockup.** Build each variant as its HTML file with real or realistic content, including the states that matter for the screen (empty, error, loading, long content). Respect accessibility basics even in a mockup: semantic elements, visible focus, readable sizes.

## How many and how different

- Default three variants; one when the user asks for one; never more than five without being asked.
- Spread them deliberately across one axis that matters for the decision (conservative ↔ expressive, dense ↔ spacious, editorial ↔ product-like) and say where each sits.
- At least one variant respects every existing constraint; at most one may break a stated preference, and it must say so.
- Run the first- and second-order reflex checks from `SKILL.md` on every variant; discard a variant that could be predicted from the category.

When the session supports subagents and the user has accepted the cost, variants may be built in parallel, one agent per variant, each given the same brief, constraints, and output name. Otherwise build them sequentially.

## Review and handoff

- Screenshot each variant at desktop and phone width when a browser tool is available; otherwise say they were not rendered.
- Present a comparison: thesis, where it sits on the axis, strongest point, main risk, and what it would cost to build in the real stack.
- Recommend one variant with a reason from the brief, then wait for the user's choice. Do not merge variants unless asked; a blend usually loses what made each one work.
- On selection, record the chosen file, its tokens, and its motion spec, and hand off to the build command. The mockup is a reference, not code to paste into production.
