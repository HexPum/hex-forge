# Claude Code — workflow, memory, sessions, cost

Reach for this folder when the task is about *running Claude Code itself* better — not about a specific piece of output (that's [`../design/`](../design/) or a future topic folder).

| Repo | Stars | What it is | Use it when |
|---|---|---|---|
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 53k | Curated index of slash commands, hooks, status lines, skills, MCP servers | Looking for an existing plugin before building one |
| [x1xhlol/system-prompts-and-models-of-ai-tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools) | 143k | Leaked/open system prompts — Claude Code, Cursor, v0, Devin, and more | Studying how other tools structure their system prompts |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 24k | 100+ specialized subagent specs | Need a subagent role, don't want to write one from scratch |
| [jnMetaCode/agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh) | 20k | 267 ready-made expert-role subagents (designer, engineer, copywriter, etc.) | Same as above, broader/denser roster |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 91k | Persistent-memory plugin — hooks session lifecycle, compresses & re-injects context across sessions | A project needs cross-session memory beyond this environment's built-in memory tool |
| [upstash/context7](https://github.com/upstash/context7) | 61k | MCP server: injects current, version-specific library docs into context | Working against a library whose API might postdate training data |
| [QoderAI/better-harness](https://github.com/QoderAI/better-harness) | 1.9k | Turns coding-agent session evidence into prioritized harness improvements | Diagnosing why a Claude Code setup underperforms |
| [dob323/session-kit](https://github.com/dob323/session-kit) | 562 | Keyboard-first picker for juggling multiple parallel Claude Code/Codex sessions | Running several sessions at once, losing track of which is which |
| [mikehasa/agentacct](https://github.com/mikehasa/agentacct) | 614 | Local dashboard: what an agent did and what it cost (tools, files, tests, tokens, time) | Need visibility into token/cost spend across sessions |
| [Leutenegger/book-to-skill](https://github.com/Leutenegger/book-to-skill) | 1.2k | CLI: converts a technical-book PDF into a lazy-loaded Claude Code skill | Turning a reference doc/book into on-demand skill material instead of dumping it into context |
| [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts) | 12k | Reverse-engineered *primary source*: Claude Code's actual system prompt, all 27 built-in tool descriptions, and the real Plan/Explore/Task subagent prompts — updated per release | Need to cite what Claude Code actually says to itself, not infer it |
| [FerroxLabs/agents-md](https://github.com/FerroxLabs/agents-md) | 657 | A single drop-in AGENTS.md synthesizing Karpathy + Boris Cherny + Anthropic's own guidance | Want the single-file version of MANUAL.md's ch.1 for a project that isn't this one |
| [wesammustafa/Claude-Code-Everything-You-Need-to-Know](https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know) | 2.7k | Practical guide with a runnable `.claude/` directory as a worked example | Want to see the mechanisms below actually wired up, not just described |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 65k | Community reference manual + working `.claude/` implementation, auto-updated daily against official docs. *(Vendored copy trimmed — dropped `tips/`, `presentation/`, `!/`, ~60MB of screenshots/video thumbnails, kept the text/config content.)* | Checking whether official Claude Code behavior has drifted from what's documented here |

## Self-authored

| | What it is |
|---|---|
| [`agent-team-pipeline/`](agent-team-pipeline/) | A 4-agent plan→code→test→review pipeline (Planner/Coder/Tester/Reviewer), handing off through one shared folder, run via a single `/ship <idea>` command. Read-only Reviewer enforced at the tool-permission level. Built from Claude Code's real primitives + this folder's own patterns below — not vendored from anywhere, no polished existing match was found. |

## Mechanisms & techniques worth stealing

Extracted from actually reading the four repos above (2026-08-19) — not in [`../MANUAL.md`](../MANUAL.md) yet:

- **Lazy-loaded rules.** `.claude/rules/*.md` with a `paths:` frontmatter key only loads into context when Claude touches a matching file — unlike CLAUDE.md, which loads every session regardless. A second context-economy lever beyond what MANUAL.md ch.2 already covers.
- **Append-only "Project Learnings."** When the user corrects the agent, the agent itself appends one concrete line ("Always use X for Y," never "be careful with Y") before the session ends — tighten/move-up if the rule existed but was ignored, add if it was missing. Paired with a periodic prune test: *"would removing this line cause a mistake? If no, delete."* (source: FerroxLabs/agents-md)
- **A named ask-vs-proceed rubric.** Ask when two interpretations materially diverge, or the change is load-bearing/versioned/has a migration path. Proceed when it's trivial, reversible, or already answered once this session. (source: FerroxLabs/agents-md)
- **"Plan with the strong model, execute with the cheap one."** Plan at high/max effort with the model that has the judgment ceiling the task needs; hand the atomic, zero-ambiguity result to a cheaper model at lower effort for execution — reliable specifically *because* a sharp plan removes the ambiguity a cheaper model would otherwise mishandle. Extends MANUAL.md ch.8's model-selection rule with a concrete two-model workflow.
- **Command-precedence shadowing.** Lookup order is project `.claude/` → user `~/.claude/` → plugins → built-in, first match wins — which means a project can deliberately override a built-in command (e.g. `/review`) by placing a same-named file higher in that order. Useful both as a technique and as something to watch for when installing a plugin.
- **Adversarial fan-out verification.** A variant of MANUAL.md ch.7's "Debate & Convergence" pattern: instead of simultaneous competing hypotheses, run a first wave of agents to find issues, then a *second* wave whose only job is to try to refute the first wave's findings before anything gets reported — catches false positives a single review pass would ship.
- **Automated drift-tracking.** A scheduled Claude Code session diffs its own guidance against the *official* Claude Code docs daily and logs dated changelog entries when they've drifted apart — a concrete pattern for keeping a manual from rotting as the underlying tool changes. (source: shanraisshan/claude-code-best-practice)

See [`../MANUAL.md`](../MANUAL.md) for the distilled operating principles (CLAUDE.md discipline, hooks vs. skills vs. subagents, context/token economics, model & effort selection, security) these tools implement. See [`../EXCLUDED.md`](../EXCLUDED.md) before adding anything new to this folder.
