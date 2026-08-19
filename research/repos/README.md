# Skills, prompts, plugins & tools

This is the working reference set — actual prompt collections, Claude Code skills/plugins, and small standalone tools, vendored as shallow clones (`--depth 1`) so they're browsable without a network round-trip. Not a dependency stash: full application frameworks/builders a *project* might adopt don't belong here (see "Considered, not kept" below).

Gathered 2026-08-19, cross-referenced with [`../running-claude-well.md`](../running-claude-well.md).

**Every repo below was checked against the GitHub API (`stargazers_count` vs `created_at`/`pushed_at`) before inclusion** — see the exclusions section for why that matters.

## Kept

| Dir | Repo | Stars | What it is |
|---|---|---|---|
| `hesreallyhim--awesome-claude-code` | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 53k | Curated index of slash commands, hooks, status lines, skills, MCP servers |
| `x1xhlol--system-prompts-and-models-of-ai-tools` | [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 143k | Leaked/open system prompts — Claude Code, Cursor, v0, Devin, and more |
| `VoltAgent--awesome-claude-code-subagents` | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 24k | 100+ specialized subagent specs, ready to adapt |
| `thedotmack--claude-mem` | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 91k | Persistent-memory plugin — hooks session lifecycle, compresses & re-injects context across sessions |
| `upstash--context7` | [upstash/context7](https://github.com/upstash/context7) | 61k | MCP server: injects current, version-specific library docs into context — kills stale-training-data hallucinations |
| `bitjaru--styleseed` | [bitjaru/styleseed](https://github.com/bitjaru/styleseed) | 904 | Design-method skill: 70+ craft rules, shadcn/Radix components, brand "skins," `/ui-page` `/ux-audit` `/ui-tokens` commands |
| `nutlope--hallmark` | [nutlope/hallmark](https://github.com/nutlope/hallmark) | 26k | Anti-slop design skill for Claude Code/Cursor/Codex — forces a custom palette/type/layout instead of converging on generic output |
| `jiji262--claude-design-skill` | [jiji262/claude-design-skill](https://github.com/jiji262/claude-design-skill) | 180 | Portable skill adapted from Claude.ai's internal Design system prompt |
| `dembrandt--dembrandt` | [dembrandt/dembrandt](https://github.com/dembrandt/dembrandt) | 2.9k | One-command CLI: extracts any site's design tokens (color/type/spacing) |

~253MB total.

## Excluded — fake/farmed stars

Checked and rejected. Pattern: implausible star velocity (well beyond the most viral *legitimate* repo found today, ~8k★/month) and/or stars still climbing on a repo with stale or no recent commits. Don't install code from a repo shaped like this — inflated stars is a known way to launder trust into low-quality or malicious packages.

| Repo | Red flag |
|---|---|
| `obra/superpowers` | 274k★ in 10 months (~27k★/month) — more total stars than the official `anthropics/claude-code` |
| `affaan-m/ECC` | 241k★ in 7 months |
| `multica-ai/andrej-karpathy-skills` | 204k★, zero commits since April 2026 |
| `JuliusBrussee/caveman` | 99k★ in 4 months |

## Considered, not kept — wrong category for this repo

Real, legitimate, verified-organic-growth repos — just not "brain" material. These are application frameworks / component libraries / dev tools a *project* would take a dependency on, not skills, prompts, or plugins Claude invokes directly. Also, several of them are individually 500MB–750MB even at `--depth 1`, which would have made hex-forge unusably large. Linked here instead of cloned.

**Claude Code tooling:** [anthropics/claude-code](https://github.com/anthropics/claude-code) (the CLI itself — you already have it), [farion1231/cc-switch](https://github.com/farion1231/cc-switch) (desktop GUI, not a skill/plugin)

**Design systems / component libraries:** [radix-ui/primitives](https://github.com/radix-ui/primitives), [facebook/astryx](https://github.com/facebook/astryx) (520MB), [themesberg/flowbite](https://github.com/themesberg/flowbite), [franken-ui/ui](https://github.com/franken-ui/ui), [sailboatui/sailboatui](https://github.com/sailboatui/sailboatui)

**App builders:** [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) (678MB), [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) (752MB+), [Budibase/budibase](https://github.com/Budibase/budibase), [plasmicapp/plasmic](https://github.com/plasmicapp/plasmic)

**Web frameworks/builders:** [withastro/astro](https://github.com/withastro/astro), [remix-run/remix](https://github.com/remix-run/remix), [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs), [BuilderIO/builder](https://github.com/BuilderIO/builder)
