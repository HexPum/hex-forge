# Design — UI/UX, web design, anti-slop

Reach for this folder when the task produces visible output: a screen, a component, a page, a review of one.

| Repo | Stars | What it is | Use it when |
|---|---|---|---|
| [bitjaru/styleseed](https://github.com/bitjaru/styleseed) | 904 | Design-method engine: 74 craft rules, 23 slash-command skills (`/ss-build`, `/ss-score`, `/ss-restyle`...), an *enforced* render→score→fix loop, a `STYLESEED.md` lock so decisions persist across sessions. Built on shadcn/Radix. | Building or refining a real UI, want the heaviest/most enforced anti-slop pass |
| [nutlope/hallmark](https://github.com/nutlope/hallmark) | 26k | One skill, 21 themes, 4 verbs (build / `audit` / `redesign` / `study`). `study` extracts a design's DNA from a screenshot or URL without pixel-cloning. Made by Together AI. | Lighter touch than StyleSeed, or specifically want the `study` verb |
| [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) | 180 | Portable skill adapted from Claude.ai's internal Design system prompt | Building a standalone HTML artifact (deck, landing page, poster) |
| [dembrandt/dembrandt](https://github.com/dembrandt/dembrandt) | 2.9k | One-command CLI: extracts any site's design tokens (color/type/spacing) | Reverse-engineering a reference site's token system fast |
| [petergyang/human-review](https://github.com/petergyang/human-review) | 1.1k | Comment on AI-generated HTML/Markdown like a Google Doc; feedback pipes straight back to the agent | Closing the loop after a build — human review that an agent can act on directly |

**Suggested pipeline:** StyleSeed or Hallmark to build → `human-review` for feedback → `dembrandt` if you need to match an external reference first.

See [`../MANUAL.md`](../MANUAL.md) ch. 4–5 & 11 for the underlying anti-slop principles (why LLMs converge on generic output, what to name explicitly: typography/color/motion/background). See [`../app-building/README.md`](../app-building/README.md) for component libraries and design systems this Claude doesn't vendor (wrong category — dependencies, not skills). See [`../EXCLUDED.md`](../EXCLUDED.md) before adding anything new here.
