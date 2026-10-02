# Purpose, content, and working interactions

Adapted from [miqdadbadjuber/anti-slop, v3.2.20](https://github.com/miqdadbadjuber/anti-slop/tree/91f12ec67e9de6043cfd93b846404986ba73c3f4). Its core, UI, copywriting, human, mobile-layout, and code-comment guidance inform this reference. The upstream MIT notice is retained in `LICENSES/antislop-MIT.txt`.

Read this for `anti-slop`, `craft`, `redesign`, or `polish` when deciding whether an interface is purposeful and complete. Consult only the affected concerns. Asterframe remains the workflow owner; this adaptation does not activate the upstream install wizard, mode questionnaire, entry-file changes, or its mandatory delivery template.

## Diagnose the kind of problem

| Kind | Examples | Response |
|---|---|---|
| Functional or factual defect | Dead action, nonexistent route, invented metric, clipped input, inaccessible interaction | Fix the affected path or remove the false affordance/claim; a style rationale cannot excuse it |
| Technique without a job | Decorative glow, glass, badge, gradient, illustration, generic glyph, stacked reveals | Identify its role in hierarchy, feedback, legibility, or identity; simplify/remove it when no useful role exists |
| Weak composition or consistency | Template sections, irrelevant columns, equal emphasis for unequal tasks, incoherent tokens | Reorganize around real content and decisions, preserving the established design system |

A pattern match is a lead, not proof of authorship or a verdict. Record findings as **location → observed problem → user impact → smallest useful fix**. Briefly note deliberate exceptions where they affect the review. Authorized fixes can proceed directly; review-only tasks remain read-only.

## Keep an authored result after subtraction

Removing decoration can leave another generic interface. Keep the product's actual visual material: its vocabulary, objects, workflows, imagery, and meaningful data. For a new or broad brand redesign, test whether replacing the logo and name would make it interchangeable with an unrelated product. Improve a concrete motif or composition when needed; do not restart a working app or force expressive branding onto a standard form.

Describe hierarchy and rhythm in observable terms: which element leads, how related content groups, where a narrative changes pace, and what stays intentionally repetitive. Vary section composition only when the content calls for it. Consistent rows and repeated controls help expert workflows; artificial asymmetry does not. Use the existing variance/motion/density dials as shorthand, then judge the actual implementation rather than the numeric score. Do not add a second dial system.

Keep major choices explainable from the brief. Capture only consequential rationale or disputed exceptions; no compulsory per-element essay or new DESIGN.md file.

## Compose from the user's work

- Marketing: choose sections from actual product information and audience questions. Pricing, FAQ, customer logos, and testimonials need real content; a template slot is not a reason to create them.
- Dashboards: make the decision or task visible first. Choose metrics and columns for what the user must act on. A chart needs a named question, meaningful labels, units, and real data; a comparison needs a real, named period. Do not fill space with invented activity or random deltas.
- States: distinguish first use, filters returning nothing, unavailable data, and insufficient permission. Say what the condition means and provide an action the product actually supports; do not route every state to a generic spinner or empty illustration.
- Controls: every visible action has a real destination or supported behavior. A deliberate disabled state explains its condition. A future feature is visibly unavailable; it must not resemble a working link. Keep unavailable backend behavior honest rather than simulating production success.

## Copy and comments

Write action labels for the operation and its object where useful. Prefer concrete capabilities and evidence to vague superlatives or anonymous authority. Keep domain terms stable instead of cycling synonyms. Do not introduce a fact while making a sentence sound more specific.

Look for clusters of stock phrases, theatrical fragments, repeated sentence shapes, and generic conclusions. Preserve supplied voice, deliberate punctuation, quotations, names, and accurate technical language. An isolated em dash, polished grammar, or a common word is not evidence of AI authorship and is not a reason to rewrite.

Comments should explain a constraint, reason, edge case, or contract the code does not make clear. Remove trivial narration and empty decorative headings in touched code when useful. Preserve security/concurrency details, workarounds, meaningful TODOs, API contracts, provenance, and legal notices. Comment-only work must not change executable code; do not enforce a maximum line count that erases necessary context.

## Responsive and accessibility checks

Choose layout changes where the content stops fitting, using existing breakpoints when they work. Check the interval between sample widths, especially the middle range; do not require exactly two or three layouts. Resolve overflowing children or tracks instead of masking lost text/controls with overflow clipping. Necessary wide tables/code regions may remain deliberately scrollable. Account for fixed bars, safe areas, zoom, and the on-screen keyboard.

Check contrast using the actual foreground/background in each relevant shipped theme and state, including muted/helper/placeholder text. For photos, gradients, transparency, and overlays, inspect the worst background under the text after compositing; a solid-color calculation alone cannot verify these cases.

For WCAG text contrast, normal text needs 4.5:1; the large-text threshold is 3:1 at 18pt regular (24 CSS px) or 14pt bold (about 18.67 CSS px), with applicable exceptions. **18px regular is not large text. Compare the unrounded ratio**, then format it for reporting. Verify required non-text indicators separately against applicable criteria. See [W3C contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

For opaque sRGB hex pairs, reuse the installed `antislop-human/contrast-check.py` when available. Resolve `ANTISLOP_HUMAN_DIR` from that installed skill's entrypoint, not a Claude-specific variable:

```bash
python3 "${ANTISLOP_HUMAN_DIR}/contrast-check.py" "#FFFFFF" "#777777"
```

The checker prints separate normal/large verdicts; exit 0 means both pass, 1 means at least one fails, and 2 means invalid input. Read the relevant verdict rather than treating all exit-1 cases as tool failures. It does not determine font size, composite transparency, or inspect a browser. If unavailable, use an existing trusted contrast tool; do not invent a passing ratio or install a new dependency merely to run this example.

Native controls keep their native keyboard behavior: buttons use Space/Enter, links use Enter, tabs/menus use their expected navigation keys. Verify focus visibility, reading/tab order, modal close/restore behavior, and announced states. Do not apply Space activation or a focus trap indiscriminately to every element.

## Verification follows the affected user path

For new UI, exercise the visible actions it adds. For a scoped edit, exercise the changed path and plausible regressions; a button fix does not require a site-wide interaction audit. A claim of working interaction needs an observed effect, not an event-handler name. Useful evidence includes a link reaching its real target, a form returning validation/supported success, and a mobile menu opening, closing, and restoring focus.

Cover the relevant shipped themes, states, widths, keyboard/touch behavior, image loading, and console errors. Report important action results concisely with remaining gaps. Source review, a static mockup, screenshots, and a runnable critical-flow check are different evidence levels. Never describe a mockup as an integrated backend, or an inspected handler as a clicked action.

Fix demonstrated defects and repeat affected checks. Stop when the brief and applicable acceptance criteria pass. Scanner hit counts and absence of fashionable visual patterns do not prove quality; preserve a justified effect when the actual result works.
