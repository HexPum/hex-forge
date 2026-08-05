# ClCod

HexPum's baseline Claude Code setup — a shared marketplace other repos point
to so they all start from the same conventions, safety hooks, and
scaffolding instead of reinventing them per repo.

## What's here

- **`.claude-plugin/marketplace.json`** — makes this repo a Claude Code
  plugin marketplace.
- **`plugins/clcod-essentials/`** — the one plugin currently in it:
  - a `PreToolUse` hook that flags catastrophic shell commands
    (`rm -rf /`, force-push to `main`, fork bombs, `mkfs`/`dd` on a device,
    `chmod -R 777 /`) and asks for confirmation instead of running them
    silently;
  - a `SessionStart` hook that keeps `agent-reach` installed (see below);
  - a `clcod-essentials` skill documenting branch/commit/PR conventions and
    the new-repo baseline;
  - a `repo-scaffolder` subagent that applies that baseline to a repo
    (README, LICENSE, `.gitignore`, `CLAUDE.md`, `.claude/settings.json`).
- **`.claude/settings.json`** — this repo dogfoods its own marketplace
  (see below).

## Using this in another repo

Add to that repo's `.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "ClCod": {
      "source": { "source": "github", "repo": "HexPum/ClCod" }
    }
  },
  "enabledPlugins": {
    "clcod-essentials@ClCod": true
  }
}
```

Or from the CLI:

```
claude plugin marketplace add HexPum/ClCod
claude plugin install clcod-essentials@ClCod
```

Everyone who opens that repo with Claude Code then gets the hook, skill,
and subagent automatically — no per-person setup.

## Also installed: agent-reach

`.agents/skills/agent-reach/` (symlinked into `.claude/skills/agent-reach`)
is a separate, universal agent skill from
[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) —
routes research/lookup requests ("research X", "search for X", or any
mention of Twitter, Reddit, GitHub, YouTube, LinkedIn, etc.) to the right
platform CLI/API. Installed via the [skills.sh](https://skills.sh) CLI, not
Claude Code's own plugin system, so it's tracked separately from
`.claude-plugin/`; `skills-lock.json` pins the installed version.

It runs with full agent permissions and can reach live external platforms
(some need your cookies/login). To add it somewhere by hand:

```
npx skills add Panniantong/Agent-Reach@agent-reach
```

### Automatic install

`plugins/clcod-essentials/hooks/ensure-agent-reach.sh` runs on `SessionStart`
and keeps both halves in place, so you don't re-run the install per repo:

- the **skill**, via `npx skills add ... --global` — `--global` matters: it
  installs to `~/.agents/skills/` instead of writing `.agents/`,
  `.claude/skills/`, and `skills-lock.json` into whatever repo you're sitting
  in. (agent-reach's own install guide says not to write into the agent
  workspace.)
- the **CLI**, via `uv tool install git+https://github.com/Panniantong/agent-reach.git`
  (falls back to `pipx`), only when `agent-reach` isn't already on `PATH`.

It's `async`, so it never delays session start; throttled by a stamp file at
`~/.agent-reach/.clcod-last-check` so a satisfied setup is re-checked at most
once every 24h (~12ms fast path); logs to `~/.agent-reach/clcod-install.log`;
and never uses `sudo` or writes outside `$HOME`.

| Env var | Effect |
|---|---|
| `CLCOD_SKIP_AGENT_REACH=1` | Skip the hook entirely |
| `CLCOD_AGENT_REACH_TTL_HOURS` | Re-check interval (default `24`) |

Because this repo *also* has agent-reach committed at project level (from the
original non-global install), it's available here regardless of the hook.

### What actually works depends on the machine

The skill is only a router — it shells out to per-platform CLIs it does not
install. `agent-reach doctor --json` reports which backends are live. On a
bare container with no extra tooling and restricted egress, that's **2 of 15**:

| Status | Channels |
|---|---|
| ok | `rss` (feedparser), `web` (Jina Reader) |
| warn | `github`, `twitter`, `v2ex`, `xueqiu` |
| off | `youtube`, `reddit`, `bilibili`, `xiaohongshu`, `facebook`, `instagram`, `linkedin`, `xiaoyuzhou`, `exa_search` |

Most gaps are just missing CLIs (`gh`, `yt-dlp`, `mcporter`, `opencli`, …);
the logged-in platforms additionally need your cookies. Run
`agent-reach doctor --json` on the box you actually care about before
assuming a channel works.
