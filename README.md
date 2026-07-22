<div align="center">

# Asterframe

**Design direction for AI coding agents.**  
One skill, 27 commands, 44 deterministic interface rules, live browser iteration, and a local UI/UX intelligence library.

[Quick start](#quick-start) · [Commands](#27-commands) · [Installation](#installation) · [How it works](#how-it-works)

</div>

> **Quick start:** install the repository as an agent skill, then run `/asterframe init` from your project.

## Why Asterframe?

AI coding agents can produce working interfaces quickly, but they often converge on the same visual defaults: generic SaaS layouts, unearned gradients, nested cards, weak hierarchy, excessive pills, decorative motion, and vague copy.

Asterframe gives the agent a complete design operating system instead of a loose style prompt:

- **Context before aesthetics.** It distinguishes brand surfaces from product surfaces and adjusts visual variance, motion, and density accordingly.
- **One routed workflow.** Creation, redesign, critique, audit, anti-slop, motion, hardening, and system work share one source of truth.
- **Preservation-aware redesign.** Existing behavior, architecture, accessibility semantics, analytics hooks, and brand commitments are treated as constraints.
- **Deterministic checks.** Forty-four rules detect recurring AI-generated design patterns and general quality problems without requiring an API key.
- **Local design intelligence.** A searchable UI/UX dataset helps choose palettes, typography, product patterns, charts, motion, and stack-specific implementation guidance.
- **Live browser iteration.** Selected elements can be explored as visual variants in a running application before changes are accepted.

## What's included

### One skill

Asterframe installs as a single skill and exposes one command surface:

```text
/asterframe <command> <target>
```

Start a new project with:

```text
/asterframe init
```

`init` gathers product and design context so later commands understand the audience, surface type, brand commitments, accessibility constraints, visual direction, and implementation environment.

### 27 commands

| Command | Purpose |
|---|---|
| `/asterframe init` | Establish project and design context |
| `/asterframe craft` | Shape, build, and visually iterate on a feature |
| `/asterframe shape` | Resolve UX and UI before implementation |
| `/asterframe redesign` | Upgrade an existing interface while preserving required behavior |
| `/asterframe anti-slop` | Detect and remove generic AI-default patterns |
| `/asterframe motion-scout` | Find high-confidence motion opportunities without editing |
| `/asterframe system` | Search or generate design-system guidance |
| `/asterframe critique` | Review hierarchy, clarity, cognitive load, and resonance |
| `/asterframe audit` | Check accessibility, responsiveness, performance, and quality |
| `/asterframe polish` | Run a final pre-ship quality pass |
| `/asterframe document` | Capture the current visual system in `DESIGN.md` |
| `/asterframe extract` | Consolidate reusable patterns, components, and tokens |
| `/asterframe bolder` | Add justified visual authorship and impact |
| `/asterframe quieter` | Reduce visual aggression and overstimulation |
| `/asterframe distill` | Remove unnecessary complexity |
| `/asterframe typeset` | Improve typography and hierarchy |
| `/asterframe colorize` | Introduce strategic color |
| `/asterframe layout` | Improve composition, spacing, and rhythm |
| `/asterframe animate` | Add purposeful motion and micro-interactions |
| `/asterframe clarify` | Improve UX copy and interface language |
| `/asterframe delight` | Add memorable, appropriate moments |
| `/asterframe overdrive` | Explore technically ambitious visual effects |
| `/asterframe harden` | Handle errors, edge cases, i18n, and overflow |
| `/asterframe adapt` | Improve responsive and cross-device behavior |
| `/asterframe optimize` | Improve rendering and loading performance |
| `/asterframe onboard` | Design first-run, activation, and empty states |
| `/asterframe live` | Explore and accept variants in a running browser |

Commands may also be pinned as standalone shortcuts with the bundled pin script.

### Deterministic design detection

The detector currently includes **44 rules**:

- 26 rules for recurring AI-generated design and copy patterns;
- 18 rules for quality, accessibility, layout, and implementation issues.

Examples include gradient text, generic AI palettes, nested cards, repeated section kickers, buzzword-heavy copy, flat typography, broken images, poor contrast, clipped overflow, and layout-property animation.

Run the focused anti-slop scanner directly:

```bash
node .agents/skills/asterframe/scripts/anti-slop/scan.mjs <project-or-source-directory>
```

Detector output is evidence, not an automatic verdict. The skill applies context and design judgment before recommending changes.

## Usage examples

```text
/asterframe shape a permissions workflow
/asterframe craft the onboarding checklist
/asterframe redesign settings preserve
/asterframe anti-slop src/app
/asterframe critique the pricing page
/asterframe audit checkout
/asterframe motion-scout dashboard
/asterframe system B2B compliance dashboard
/asterframe polish the mobile navigation
```

Asterframe can also route natural-language requests without an explicit subcommand:

```text
/asterframe make this dashboard easier to scan without changing its behavior
```

## Installation

### Codex and agent-compatible harnesses

Clone directly into the project skill directory:

```bash
mkdir -p .agents/skills
git clone https://github.com/egkodin/asterframe.git .agents/skills/asterframe
```

Or install for your user account:

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/egkodin/asterframe.git ~/.agents/skills/asterframe
```

### Claude Code

```bash
mkdir -p .claude/skills
git clone https://github.com/egkodin/asterframe.git .claude/skills/asterframe
```

### Cursor

```bash
mkdir -p .cursor/skills
git clone https://github.com/egkodin/asterframe.git .cursor/skills/asterframe
```

Keep the installation directory named `asterframe`. The bundled hooks, live mode, agents, and pinning scripts use that identity.

After installation, reload the agent harness and run:

```text
/asterframe init
```

## How it works

Asterframe routes each request to the narrowest appropriate workflow instead of applying every design rule at once.

1. **Read the project.** Inspect product context, design tokens, global styles, representative pages, and the relevant implementation stack.
2. **Choose the register.** Brand and editorial surfaces receive different guidance from dashboards, forms, and workflow-heavy product UI.
3. **Set the design dials.** Visual variance, motion intensity, and information density are inferred from the brief and existing product.
4. **Preserve what matters.** Existing behavior, routes, semantics, analytics, public APIs, and brand commitments remain stable unless change is authorized.
5. **Apply the focused workflow.** Build, redesign, audit, de-slop, animate, harden, or document using the corresponding reference module.
6. **Validate the result.** Use deterministic scans, source inspection, browser evidence, responsive checks, and production-quality review.

## Local UI/UX intelligence

Asterframe includes a searchable local knowledge base covering product patterns, interface styles, colors, typography, charts, motion, UX guidance, and framework-specific implementation advice.

```bash
python .agents/skills/asterframe/tools/uiux/scripts/search.py \
  "analytics dashboard" --design-system --variance 4 --motion 2 --density 8

python .agents/skills/asterframe/tools/uiux/scripts/search.py \
  "financial product" --domain color

python .agents/skills/asterframe/tools/uiux/scripts/search.py \
  "accessible data table" --stack nextjs
```

## Repository structure

```text
asterframe/
├── SKILL.md                 # Main router and operating principles
├── reference/               # Command and design guidance
├── scripts/                 # Context, detector, hooks, pinning, and live mode
├── tools/uiux/              # Searchable UI/UX data and Python utilities
├── agents/                  # Supporting agent definitions
├── LICENSES/                # Preserved upstream license texts
├── NOTICE.md                # Attribution and modification record
└── SOURCE_MAP.md            # Capability-to-source mapping
```

There is exactly one discoverable skill definition: `SKILL.md`. Larger source references are loaded only when the active workflow needs them.

## Validation

The repository is tested with Node.js 22 and Python 3.13.

```bash
npm run validate
```

This checks JavaScript syntax, runs the anti-slop scanner tests, compiles the Python utilities, validates the command manifest, and confirms that retired project names are absent.

## Project status

Asterframe is an experimental integration skill. Interfaces and command behavior may evolve as the routing, detector, and live workflow are refined.

## Attribution and licensing

This repository combines modified material from multiple source modules. It is **not offered under one blanket license**. Review [`NOTICE.md`](NOTICE.md), [`SOURCE_MAP.md`](SOURCE_MAP.md), and [`LICENSES/`](LICENSES/) before redistributing or incorporating the repository into another product.

No ownership claim is made over third-party source material. Contributions must not introduce source material without clear redistribution terms.
