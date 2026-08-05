#!/usr/bin/env bash
# PreToolUse hook for Bash: flags a short list of commands that are almost
# never intended and are expensive or impossible to undo. It does not hard
# block — it downgrades to "ask" so a human/Claude confirms intent instead
# of silently proceeding. Reads the hook event JSON on stdin.
set -euo pipefail

input="$(cat)"
command="$(printf '%s' "$input" | jq -r '.tool_input.command // empty')"

if [ -z "$command" ]; then
  exit 0
fi

reason=""

if printf '%s' "$command" | grep -Eq '\brm\s+(-[a-zA-Z]*\s+)*-[a-zA-Z]*r[a-zA-Z]*f[a-zA-Z]*\s+(/\*?|~)(\s|$)'; then
  reason="rm -rf targeting / or ~ — this deletes the whole filesystem or home directory."
elif printf '%s' "$command" | grep -Eq ':\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:'; then
  reason="Fork bomb pattern — will exhaust process table / hang the machine."
elif printf '%s' "$command" | grep -Eq 'chmod\s+(-[a-zA-Z]*\s+)*-R\s+777\s+/(\s|$)'; then
  reason="chmod -R 777 on / — opens every file on the system to every user."
elif printf '%s' "$command" | grep -Eq '\bdd\b.*of=/dev/(sd|nvme|hd|xvd)[a-z0-9]*'; then
  reason="dd writing directly to a block device — can destroy the disk's contents/partition table."
elif printf '%s' "$command" | grep -Eq '\bmkfs(\.[a-zA-Z0-9]+)?\s+/dev/'; then
  reason="mkfs on a device — reformats it, destroying existing data."
elif printf '%s' "$command" | grep -Eq 'git\s+push\s+.*--force([^-]|$).*\b(origin\s+)?(main|master)\b'; then
  reason="Force-push to main/master — rewrites shared history other people rely on."
fi

if [ -n "$reason" ]; then
  jq -n --arg reason "$reason" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason: ("clcod-essentials guard: " + $reason + " Confirm this is really intended.")
    }
  }'
fi

exit 0
