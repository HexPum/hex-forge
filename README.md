# hex-forge

This Claude's general-purpose brain — a collection of prompts, skills, plugins, and tools, organized so the right path activates for whatever task is at hand. Not tied to any one project.

## How this is organized

Two kinds of folder:

- **Topic folders** — reusable across every project. Pick the one matching the task's domain.
- **Project folders** (`projects/<name>/`) — notes true only about one specific project. Everything else here is deliberately project-agnostic.

| Folder | Reach for it when... |
|---|---|
| [`claude-code/`](claude-code/) | The task is about running Claude Code itself better — memory, sessions, cost, harness, subagent rosters |
| [`design/`](design/) | The task produces visible output — a UI, a page, a component, a design review |
| [`research/`](research/) | The task is "go find out about X," not "go build X" |
| [`app-building/`](app-building/) | Reference only (not vendored) — app builders, web frameworks, component libraries a *project* might depend on |
| [`projects/keepsake-ui/`](projects/keepsake-ui/) | Anything specific to the Keepsake project |

Plus two root files:

- [`MANUAL.md`](MANUAL.md) — the operating manual: distilled principles on running Claude Code well (CLAUDE.md discipline, hooks/skills/subagents, token & context economics, prompt optimization, model & effort selection, security, plugin vetting). Read this first — it's the "how to think," the topic folders are the "what to reach for."
- [`EXCLUDED.md`](EXCLUDED.md) — the fake/farmed-star ledger. Check before adding anything new to any folder; don't re-surface something already caught here.

## Adding something new

1. Verify it first: `gh api repos/<org>/<repo> --jq '{stargazers_count, created_at, pushed_at}'`, check stars-per-month against [`EXCLUDED.md`](EXCLUDED.md)'s ceiling (~8k/mo is roughly where genuine virality tops out).
2. Decide the folder by task-domain, not by source (a Claude Code plugin about design still goes in `design/`, not `claude-code/`).
3. Shallow-clone (`git clone --depth 1`), then strip the nested `.git` before committing — this repo vendors plain files, not gitlinks.
4. Update that folder's `README.md` with a one-line "use it when."
5. If it's a real, legitimate repo but the wrong *category* (a project dependency, not a skill/prompt/tool) — link it in `app-building/README.md` or a similar reference file instead of vendoring it.
