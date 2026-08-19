# Design — UI/UX, web design, anti-slop

Reach for this folder when the task produces visible output: a screen, a component, a page, a review of one.

| Repo | Stars | What it is | Use it when |
|---|---|---|---|
| [bitjaru/styleseed](https://github.com/bitjaru/styleseed) | 904 | Design-method engine: 74 craft rules, 23 slash-command skills (`/ss-build`, `/ss-score`, `/ss-restyle`...), an *enforced* render→score→fix loop, a `STYLESEED.md` lock so decisions persist across sessions. Built on shadcn/Radix. | Building or refining a real UI, want the heaviest/most enforced anti-slop pass |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) | 26k | One skill, 21 themes, 4 verbs (build / `audit` / `redesign` / `study`). `study` extracts a design's DNA from a screenshot or URL without pixel-cloning. Made by Together AI. | Lighter touch than StyleSeed, or specifically want the `study` verb |
| [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) | 180 | Portable skill adapted from Claude.ai's internal Design system prompt | Building a standalone HTML artifact (deck, landing page, poster) |
| [dembrandt/dembrandt](https://github.com/dembrandt/dembrandt) | 2.9k | One-command CLI: extracts any site's design tokens (color/type/spacing) | Reverse-engineering a reference site's token system fast |
| [petergyang/human-review](https://github.com/petergyang/human-review) | 1.1k | Comment on AI-generated HTML/Markdown like a Google Doc; feedback pipes straight back to the agent | Closing the loop after a build — human review that an agent can act on directly |
| [emilkowalski/skill](https://github.com/emilkowalski/skill) | 30k | Emil Kowalski's (creator of Sonner, Vaul) animation/motion-engineering knowledge, packaged as a skill | Anything with motion — the numbers and vocabulary below beat MANUAL.md ch.5's timing table for precision |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 61k | Paul Bakaus's (ex-Google) full design-critique engine — dual-agent review protocol + ~59-rule deterministic anti-slop detector. *(Vendored copy trimmed — dropped 15 near-identical per-AI-tool config dirs, kept the canonical `skill/`.)* | Want the heaviest, most structurally rigorous critique pass — heavier than StyleSeed's gate |
| [Dammyjay93/interface-design](https://github.com/Dammyjay93/interface-design) | 5.5k | Craft-focused skill scoped specifically to product UI (dashboards/tools) — explicitly not marketing pages | Building dense product UI specifically, not a landing page |
| [ehmo/platform-design-skills](https://github.com/ehmo/platform-design-skills) | 493 | 450+ rules distilling Apple HIG, Material Design 3, and WCAG 2.2 into per-platform files (iOS/Android/Web/watchOS/visionOS), tagged CRITICAL/HIGH | Need a citable platform-guideline or accessibility rule, not a general aesthetic opinion |

**Suggested pipeline:** StyleSeed or Hallmark to build → `human-review` for feedback → `impeccable` for a deeper structural critique pass → `dembrandt` if you need to match an external reference first.

## Findings worth stealing

Extracted from actually reading the four repos above (2026-08-19) — not in [`../MANUAL.md`](../MANUAL.md) or the existing skills yet:

**Motion (emilkowalski/skill):**
- A "should this even animate" frequency table: 100+×/day (keyboard shortcuts) → never animate; tens/day (hover) → remove or reduce; occasional (modals/toasts) → standard; rare (onboarding) → delight is fine.
- Specific curves that beat CSS defaults: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`, iOS drawer curve `cubic-bezier(0.32,0.72,0,1)`.
- Momentum-based dismissal over a distance threshold: `velocity = distance/elapsedMs`, dismiss if `> ~0.11`.
- Never `scale(0)` — start at 0.9–0.97 + opacity 0. Stagger 30–80ms between list items. Blur-mask bad crossfades, kept under 20px. CSS transitions (interruptible) beat keyframes (restart from zero) for rapidly-retriggered UI.
- An animation-vocabulary glossary mapping felt descriptions ("the iOS pull-and-snap thing") to precise terms (rubber-banding, origin-aware animation, spring bounce).

**Critique structure (pbakaus/impeccable):**
- Dual-agent protocol: an isolated design-judgment pass and an isolated deterministic-detector pass run *separately* so the detector's findings don't anchor the LLM's holistic read. A degraded single-context run must print a visible `⚠️ DEGRADED` banner.
- Nielsen's 10 heuristics scored 0–4 each (max 40): 36–40 excellent … 0–11 critical, with a renormalization rule when a heuristic is marked n/a.
- Cowan's 2001 revision of Miller's Law applied concretely: **≤4 items in working memory** → nav ≤5 top-level items, ≤4 visible options per decision point.
- 5 named test personas (power user, first-timer, accessibility-dependent, stress-tester, mobile), each with a specific red-flag checklist.
- New numeric specifics beyond MANUAL.md's existing anti-slop list: functional UI text floor **11px** (not 12px — 10px is legal-smallprint-only), line-height <1.3× fails / 1.5–1.7× is target, padding ≥8px (ideally 12–16px) inside bordered containers, tracking >0.05em on body text flagged, em-dash-overuse only fires at ≥1 per 500 characters.
- New slop-tells not already listed: `icon-tile-stack`, `kicker-above-heading`/`hero-eyebrow-chip`, `italic-serif-display` hero headline, `aphoristic-cadence` copy ("X. No Y." 3+ times), `side-tab` accent border.

**Product UI craft (Dammyjay93/interface-design):**
- Type-scale ratio tied to register: ~1.2 (minor third) for dense/calm UI, ~1.25 for most product UI, ~1.333 for expressive.
- "Weight and color do more hierarchy work than size" — three hierarchy tiers achievable at one 14px size via weight/opacity alone.
- Dark-mode elevation as concrete lightness steps: base → +7% → +9% → +12%; border alpha `rgba(255,255,255,0.06–0.12)`.
- 60/30/10 color distribution (dominant neutral / secondary tone / ~10% accent). Inputs should be *darker* than surroundings, not lighter. Sidebars share the canvas background, not a different color.

**Platform/accessibility specifics (ehmo/platform-design-skills):**
- WCAG SC 2.5.3: an accessible name must contain the visible label text as a substring — blocks `aria-label` silently replacing visible text, which breaks voice-control users.
- Touch targets 44×44px minimum *with 24px spacing* between adjacent targets (more specific than "44px" alone).
- Breakpoints set at content, not device: common starting points 30rem/48rem/64rem/80rem.
- Line-height ≥1.5 for body text (WCAG SC 1.4.12), paragraph spacing ≥2× font size, line length ~75ch.

See [`../MANUAL.md`](../MANUAL.md) ch. 4–5 & 11 for the underlying anti-slop principles (why LLMs converge on generic output, what to name explicitly: typography/color/motion/background). See [`../app-building/README.md`](../app-building/README.md) for component libraries and design systems this Claude doesn't vendor (wrong category — dependencies, not skills). See [`../EXCLUDED.md`](../EXCLUDED.md) before adding anything new here.
