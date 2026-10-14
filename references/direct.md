# direct — art direction for a public-facing page

Use for landing pages, marketing sites, portfolios, product pages, one-pagers, and heroes in the **brand register** when the page needs an authored direction rather than a refinement. Not for dashboards, app screens, forms-heavy flows, or a component fix: use `craft`, `redesign`, or the narrow command instead.

The runtime is the bundled taste-skill v2 toolkit in `tools/taste/` (MIT, Leonxlnx). It deals researched directions from a library distilled from 247 curated gallery sites, measures the render in a real browser, and drives a look-and-fix loop. Asterframe's priority order still governs: brief, brand, accessibility, and product truth outrank the dealt direction and the house rules.

Script output speaks in the toolkit's own terms. Read "SKILL.md step N" as step N below, and `references/<file>.md` as `tools/taste/references/<file>.md`. Working files land in `.taste-skill/` in the project; draw history in `~/.taste-skill/history.json` (override with `TASTE_SKILL_HISTORY`). Requirements: Node 22+ and an already-installed Chrome, Edge, or Chromium for `inspect.mjs`; nothing is installed. `assets.mjs` needs network access and no keys.

Set `T="${ASTERFRAME_SKILL_DIR}/tools/taste"` and run every command from the project root.

## 1. Read the brief and the project

Establish what is real: subject, audience, the one action the page must earn, stack, existing brand, and **what imagery truly exists** (own photographs, real product UI, an image tool, or none). State the Design Read in one line; ask only when a missing fact blocks the work.

Then write an **inventory** of 8–12 things that belong to this client and no competitor: the name and what it means, the address and what that street looks like, the numbers in the brief, the constraint it lives with, materials, rituals and hours, the printed things of its world (ticket, label, timetable). In blind tests the winning page was built from an item on such a list. Each item is also a picture query for step 6.

## 2. Write the argument

List the page as claims with proof, one line per section (`tools/taste/references/copy.md` §1). Claims decide which sections exist and in what order; delete any section without a claim.

Use the conversion checks as objections to answer, not as a template to fill:

- **8-second read:** the first screen answers *what is this, who is it for, what do I do* in large type, with one primary action.
- **One primary action per viewport.** Secondary actions are quiet links. The final action keeps the hero action's label.
- **Proof beside claims:** a metric with what it measures and its source; quotes with name, role, company. Never invent proof, customers, logos, or statistics.
- **Pricing:** at most three tiers, one visually anchored; the most valuable line first.

## 3. Draw the direction

```bash
node "$T/scripts/draw.mjs" --sector <sector> --brief "<one line>" --sections <roles in argument order> [--tone <tone>] [--have <assets>] [--keep palette,type] --options 3
```

Hold the three directions against the inventory; choose the one whose way of composing can carry something only this client has, and note why. Then deal the full sheet with `--direction <id>` (same arguments, without `--options`).

- `--list sectors` and `--list roles` print the vocabularies. The hero is implied.
- `--have`: only assets that exist (`photography`, `product-photo`, `product-ui`, `illustration`, `video`). Found open-collection pictures are not the project's own.
- `--keep palette,type` when the brand fixes colors or faces; map brand values onto the dealt roles.
- **An existing design system or brand fixes palette and type; a named genre supplies them.** Pass `--keep palette,type` and take only composition from the draw. Genre packs in [genres.md](genres.md) are already translated into the house style and never add allowances.
- Redraw a slot (`--redraw hero|type|palette|photos|section:<role>|direction`) only for a stated reason: it contradicts the brand, or needs an asset that does not exist. `--alternatives <role>` lists replacements when real content cannot fit a dealt section. Record every redraw.
- If the dealt palette fights the subject's own material, keep its proportions and take colors from the subject; say so.
- `node "$T/scripts/draw.mjs" --show` reprints the sheet. Re-read it before each section.

## 4. Find the idea and the one live thing

Fill both blanks from the inventory before building:

> On this page, **[something that belongs to the subject]** becomes **[the device the direction calls for]**.

Look at its output, object, name, place, ritual, artefact, or opposite. **Competitor test:** substitute the nearest real competitor; if the sentence still works, the idea belongs to the category, not the client.

Add **one live thing** made from the idea: something the visitor can do, or that differs per visit (configure the product in its real material, set a loan and read the real monthly figure, see whether the stove is lit right now). It uses real content, works with a thumb, has a no-script fallback, never blocks reading, and is one thing, not a playground.

## 5. Write the words

Write the full copy deck before markup:

- Every headline fits **two lines or fewer at every width** (about 32 characters is safe at a confident size; arithmetic in copy.md §2).
- One supporting sentence; one primary action named for what it does.
- The first screen answers the visitor's first question in large type (an event's date and place belong at headline or second size).
- Every section delivers its information completely. Thin sections are the commonest reason a clean page loses.
- Sample details may fill brief gaps for density; list them for confirmation. Proof is never invented.

## 6. Build it still

Build with motion off in your head; a page that needs animation to look finished is not finished.

1. **Tokens** from the sheet as custom properties; `tools/taste/assets/base.css` is an optional neutral foundation with no look of its own.
2. **The hero exactly as the blueprint describes it**, at desktop and phone width.
3. **Each section from its blueprint** with this project's content. Neighbouring sections never share a layout. Carry the idea into pricing, FAQ, and footer too.
4. **Imagery, in order of preference:** the project's own; generated (if a tool exists and the task authorizes it); real pictures of the subject's world from open collections; drawn in code from the subject; dealt photographs where an honestly generic picture fits; type and color alone.

   ```bash
   node "$T/scripts/assets.mjs" "<inventory query>"          # Openverse, Wikimedia Commons, AIC, the Met; commercial-use licences by default
   node "$T/scripts/assets.mjs" --get <ref>                   # downloads into assets/ and records the credit
   node "$T/scripts/assets.mjs" --credits                     # footer credit line and report list
   node "$T/scripts/assets.mjs" --video "<query>"             # open-licence footage for one muted loop
   ```

   Search the inventory, not the category (its street in old postcards, an old map, its material up close, engravings of its trade). A found picture is never presented as the client's own product, room, dish, person, or team, and every one is credited on the page. Download only after the user's task authorizes adding assets to the project.

   The toolkit's picture floor is four real pictures (usually 6–12); SVG drawings do not count. It applies to every brand page, whatever the genre.
5. **The live thing**, in the section where it proves the claim.
6. **Fullness:** each desktop screen reads as a poster with one dominant thing. At most one deliberate rest per page.
7. **States and semantics:** real links and buttons, visible focus, alt text, a phone layout composed for the phone.

## 7. Gate

```bash
node "$T/scripts/lint.mjs" <source files or folder>
node "$T/scripts/inspect.mjs" <url | path/to/index.html> [--allow rule,rule]
```

`inspect.mjs` serves local files from a throwaway `127.0.0.1` server, opens the page at 1440/768/390, measures it, and saves screenshots to `.taste-skill/inspect/`. Fix every `FAIL`; treat each `WARN` as wrong unless you can defend it to a designer in one sentence. Re-run until no `FAIL` remains. If no local Chromium-family browser exists, run `lint.mjs`, take screenshots with the available browser tool, and state that the inspector did not run.

**Two classes of finding.** Integrity findings are never allowed: `overflow`, `contrast`, `broken-image`, `covered-text`, `clipped-text`, `small-text`, `body-size`. House-style findings (`eyebrow`, `mono`, `numbering`, `hairline`, `outlined-box`, `shadow`, `gradient`, `palette-*`, `micro-label`, `few-pictures`, `still-page`, and the rest) follow taste-skill v2 exactly: the only valid allowance is a brand asset or an existing design system that requires the device. A genre pack, an aesthetic preference, or a calm audience is not a reason. Put the reason in the report and the rule ids in `--allow` or in the `allow` array of `.taste-skill/direction.json`, which the inspector reads. Never allow a rule to make a weak page pass; if the user asks for a banned device that is not a brand asset, raise the conflict before building.

`lint.mjs` honours `taste-skill-ignore` line comments and `data-ui` on real interface fragments; real code in `pre`/`code` and real tables and form fields keep their own conventions.

## 8. Look

Passing the gate is the floor, not the grade. Open every inspector screenshot and critique it with `tools/taste/references/critique.md`: the passes, the Awwwards-weighted score, the caps. Fix the top three problems, inspect again, look again. Three rounds at most. A problem visible in a screenshot is real whatever the code says.

## 9. Move

Build the motion layer after the still page passes; Asterframe's motion policy and frequency gate still apply.

1. **The signature move** named on the sheet: one, done well.
2. **An entrance for the parts of every section:** heading, then text, then picture, 60–90ms apart, rising 16–32px with opacity, once per section. Never one identical fade on every block; never content that stays hidden if script fails.
3. **Feedback on every control:** hover, press, focus.
4. **One moving picture:** a muted loop with poster, a slow drift on a photograph, or a scroll-linked hero move.

Transform and opacity only; every move has a reduced-motion fallback that keeps the content and drops the travel. Recipes: `tools/taste/references/motion.md` and [motion library](motion-library.md); components and shaders: [effects catalog](effects-catalog.md). The toolkit's motion floor (`still-page` fails under 8 moving elements, warns under 16) applies to every brand page; a genre changes the flavour of the motion, not its amount. Re-run the inspector and check every screenshot for content that failed to appear.

## 10. Report

Direction name and seed, redraws and reasons, the idea sentence and live thing, final critique scores and remaining shortfalls, every found picture and clip with title, creator, licence, source page, and on-page credit location, which drawings or dealt photographs stand in for real photography, every allowed rule with its reason, and sample content to confirm before launch. Report only checks that ran.

## Special cases

- **Existing brand or design system:** `--keep palette,type`; brand assets that require a banned device stay, with a scoped `--allow`.
- **Redesign or review of an existing page:** run `lint.mjs` and `inspect.mjs` first and report findings, then critique the screenshots. For a redesign, draw and continue from step 2, preserving real content and working behaviour (see `references/redesign.md`).
- **A component or single section:** skip the draw; match the surrounding design, apply the craft laws, and still inspect.
- **No checkout or form backend:** the primary action goes to the real destination, or a `mailto:` with the visitor's choices filled in; never fake a payment form.
- **No network:** draw the pictures and say the open collections could not be searched.

## Laws of the craft (short form)

- **Type:** two or three sizes do the visible work: one very large, one small. Display tracking −0.02 to −0.05em, leading 0.85–1.05; text 16–20px, leading 1.45–1.6, 45–75 characters. Five sizes is the ceiling; one family is normal, two the limit. Left-aligned by default.
- **Space:** one grid, one pair of tight margins (16–32px). Gaps between sections (120–220px desktop) clearly exceed gaps inside one. Every section composes differently from its neighbours.
- **Color:** one ground, one ink, one accent on the action and perhaps one other thing. Running text in full ink. Surfaces separate by tone steps; a section may change the whole field color.
- **Imagery:** one dominant image beats six small ones; same crops and treatment; nothing lies on top of a headline.
- **Components:** buttons flat, one fill, square or fully round, decided once; navigation is a wordmark, three to five links, one action; the footer is a designed close.

Numbers come from `tools/taste/references/research.md`; cite it rather than guessing. `tools/taste/references/tells.md` keeps the dated registry of generated-page tells.
