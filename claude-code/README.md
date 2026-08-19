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

See [`../MANUAL.md`](../MANUAL.md) for the distilled operating principles (CLAUDE.md discipline, hooks vs. skills vs. subagents, context/token economics, model & effort selection, security) these tools implement. See [`../EXCLUDED.md`](../EXCLUDED.md) before adding anything new to this folder.
