# Agent team pipeline — plan → code → test → review

A four-agent dev pipeline: one plans, one builds, one breaks it, one guards the gate. Point it at a rough idea, it hands off through one shared folder, ships a finished, tested, reviewed feature — or stops and tells you exactly why it couldn't.

Self-authored 2026-08-19 — built from Claude Code's real subagent/slash-command primitives and the patterns already in [`../../MANUAL.md`](../../MANUAL.md) ch.7 (Pipeline Chain, Self-Healing Pipeline) and ch.9 (least-privilege tool access), not copied from any single source. A search for a polished existing version of this exact shape (fixed 4-stage pipeline, single shared folder, single command) came up empty — closest matches were either architecturally different (AWS's dynamic specialist pools) or stale (a year+ without commits) — see the commit history for what was checked.

## The four agents

| Agent | Model | Tools | Job |
|---|---|---|---|
| `pipeline-planner` | opus | Read, Grep, Glob, Write | Idea → exact spec: files, edge cases, acceptance criteria, explicit non-goals |
| `pipeline-coder` | sonnet | Read, Write, Edit, Bash, Grep, Glob | Spec → implementation. Nothing beyond what the spec says |
| `pipeline-tester` | sonnet | Read, Write, Edit, Bash, Grep, Glob | Writes tests trying to break what got built — edge cases, not just the happy path |
| `pipeline-reviewer` | sonnet | Read, Grep, Glob **only** | Compares everything against the spec, returns `APPROVED` or `REJECTED` |

**The Reviewer's read-only-ness is enforced by its tool list, not just its prompt.** No Write, Edit, or Bash means it's structurally incapable of patching what it finds — the same least-privilege principle as `MANUAL.md` ch.9 ("an agent that can't see a dangerous tool can't be tricked into using it"), applied to keep a reviewer honest rather than to stop an attack.

Planner gets the expensive model because the spec sets the ceiling for every stage after it — a vague or wrong plan means a well-executed wrong thing. Coder and Tester run on Sonnet, not Haiku — writing and testing real code benefits from more judgment than pure lookup/classification work.

## The shared folder

Every run gets `.claude/pipeline/<slug>/` in the target project, containing:

- `spec.md` — Planner's output
- `implementation-log.md` — Coder's output (files touched, or a `Blocked` section if the spec had a real gap)
- `test-report.md` — Tester's output
- `review.md` — written only on a `REJECTED` verdict, the Reviewer's reasons

This folder is the entire interface between agents — none of them talk to each other directly, each only reads what the prior stage wrote. That's what makes the whole thing a single command instead of a conversation you have to babysit.

## The one command

`/ship <feature idea>` — the orchestrating instructions live in [`ship.md`](ship.md). It runs all four stages in order, and on a `REJECTED` verdict loops the Coder back with the Reviewer's exact reasons — up to 3 rounds total before it stops and hands you the folder instead of looping forever.

## Installing this into a project

Copy into the target repo's `.claude/`:

```bash
mkdir -p .claude/agents .claude/commands
cp agents/*.md /path/to/project/.claude/agents/
cp ship.md /path/to/project/.claude/commands/ship.md
```

Then `/ship <idea>` from that project's Claude Code session.

## Honest limits

- **This doesn't replace human review on anything load-bearing.** The Reviewer's judgment is real but bounded — treat an `APPROVED` verdict the way `MANUAL.md` ch.1 frames Claude Code's own auto-mode classifier: "better than nothing, not a replacement for human judgment on anything high-stakes."
- **A 3-round REJECTED loop that never converges is a signal the spec was wrong, not that the Coder needs a 4th try.** Read the pipeline folder before just re-running — see what actually kept failing.
- **Not built for genuinely ambiguous asks.** The Planner will flag real ambiguity under "Open question" rather than guess, which means a sufficiently vague idea stops the pipeline at stage 1 — that's correct behavior, not a bug to work around with a vaguer prompt.
