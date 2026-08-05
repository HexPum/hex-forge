---
name: clcod-essentials
description: HexPum's shared repo conventions — branch naming, commits, PRs, and baseline repo hygiene (README, LICENSE, .gitignore, CLAUDE.md). Use when setting up a new repo, asking "what are our conventions", or starting work in any HexPum-owned repo.
---

# ClCod conventions

This is the shared baseline for every repo under HexPum. It exists so future
repos don't each reinvent branch naming, commit style, and starter files —
apply it by default; don't ask unless something here conflicts with
repo-specific instructions (a local `CLAUDE.md` always wins).

## Branching

- Never commit directly to the default branch (`main`).
- Feature/fix branches: `claude/<short-slug>` when Claude Code creates them,
  otherwise `<type>/<short-slug>` (`feat/`, `fix/`, `chore/`, `docs/`).
- Keep branches scoped to one logical change — don't stack unrelated work.

## Commits

- Conventional-commit-style subject line: `type(scope): summary` (types:
  `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`). Scope is
  optional when the whole repo is the scope.
- Body explains *why*, not just *what*, when the change isn't self-evident.
- Never bundle formatting-only churn with behavioral changes in the same
  commit.

## Pull requests

- Don't open a PR unless asked to.
- Check for a PR template (`.github/pull_request_template.md`, etc.) before
  writing a PR body; fill in its sections from the diff rather than
  freehanding structure.
- Keep PRs reviewable: one concern per PR where practical.

## New-repo baseline

Every new HexPum repo should start with:

- `README.md` — one-paragraph purpose, then setup/run instructions once
  there's code to run.
- `LICENSE` — ask which license if not specified; don't assume MIT.
- `.gitignore` — matched to the repo's actual stack, not a generic
  kitchen-sink file.
- `CLAUDE.md` — repo-specific instructions only; don't repeat what's
  already covered by this skill.
- `.claude/settings.json` — reference this marketplace so `clcod-essentials`
  is available in the new repo too:

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

Use the `repo-scaffolder` subagent (bundled in this plugin) to generate this
baseline in one pass instead of doing it file-by-file.

## agent-reach

A `SessionStart` hook in this plugin keeps the
[agent-reach](https://github.com/Panniantong/Agent-Reach) skill and CLI
installed (globally — never into the working repo). Two consequences worth
knowing:

- Don't hand-run `npx skills add Panniantong/Agent-Reach@agent-reach` inside
  a repo; that writes `.agents/`, `.claude/skills/`, and `skills-lock.json`
  into the workspace. The hook already handles it with `--global`.
- Before using an agent-reach channel, run `agent-reach doctor --json` and
  check that channel's `active_backend`. It routes to per-platform CLIs it
  does not install, so most channels are inactive on a fresh machine — say
  which backend you're using, and don't invent a fallback when one is
  missing.

Set `CLCOD_SKIP_AGENT_REACH=1` to disable the hook.

## Efficiency defaults

- Prefer editing existing files over introducing new abstractions/config
  formats — simplicity over cleverness.
- Don't add a dependency, plugin, or tool unless it earns its place; every
  addition to this shared baseline should benefit *most* future repos, not
  just the one being set up right now.
- When something here turns out to be wrong for a given repo, fix it in
  that repo's own `CLAUDE.md` rather than working around it silently — and
  flag it back so `ClCod` itself can be updated.
