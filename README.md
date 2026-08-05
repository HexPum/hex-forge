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
