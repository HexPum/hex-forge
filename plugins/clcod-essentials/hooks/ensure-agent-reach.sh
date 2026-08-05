#!/usr/bin/env bash
# SessionStart hook: keep the agent-reach skill + CLI available without
# hand-running the install in every repo.
#
# Design constraints, in case you're tempted to "simplify" this later:
#   - Runs async (see hooks.json) so a slow network never delays a session.
#   - Installs the skill with --global, so it lands in ~/.agents/skills/ and
#     NOT in the repo you happen to be sitting in. agent-reach's own install
#     guide explicitly says not to write into the agent workspace.
#   - Throttled by a stamp file: a network round-trip on every single session
#     start would be wasteful, so a satisfied setup is re-checked at most
#     once per CLCOD_AGENT_REACH_TTL_HOURS (default 24).
#   - Never uses sudo and never writes outside $HOME.
#
# Opt out entirely with CLCOD_SKIP_AGENT_REACH=1.
set -uo pipefail

[ "${CLCOD_SKIP_AGENT_REACH:-0}" = "1" ] && exit 0

STATE_DIR="${HOME}/.agent-reach"
STAMP="${STATE_DIR}/.clcod-last-check"
LOG="${STATE_DIR}/clcod-install.log"
TTL_HOURS="${CLCOD_AGENT_REACH_TTL_HOURS:-24}"
SKILL_DIR="${HOME}/.agents/skills/agent-reach"

mkdir -p "$STATE_DIR" 2>/dev/null || exit 0

log() { printf '%s %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*" >>"$LOG" 2>/dev/null; }

have_skill() { [ -d "$SKILL_DIR" ]; }
have_cli()   { command -v agent-reach >/dev/null 2>&1; }

# Fast path: everything present and checked recently — do nothing.
if have_skill && have_cli && [ -f "$STAMP" ]; then
  now=$(date +%s)
  then_=$(cat "$STAMP" 2>/dev/null || echo 0)
  case "$then_" in ''|*[!0-9]*) then_=0 ;; esac
  if [ $(( (now - then_) / 3600 )) -lt "$TTL_HOURS" ]; then
    exit 0
  fi
fi

# Skill: install/refresh globally. --global keeps it out of the working repo.
if command -v npx >/dev/null 2>&1; then
  if timeout 240 npx -y skills add Panniantong/Agent-Reach@agent-reach \
        --global --yes --agent claude-code >>"$LOG" 2>&1; then
    log "skill ok"
  else
    log "skill install failed (exit $?) — continuing"
  fi
else
  log "npx unavailable; skipped skill install"
fi

# CLI: only if missing. Upgrades are the user's call, not a session-start
# side effect. git+https, not the archive zip — some proxies 403 the zip.
if ! have_cli; then
  if command -v uv >/dev/null 2>&1; then
    timeout 420 uv tool install "git+https://github.com/Panniantong/agent-reach.git" \
      >>"$LOG" 2>&1 && log "cli ok (uv)" || log "cli install failed (uv, exit $?)"
  elif command -v pipx >/dev/null 2>&1; then
    timeout 420 pipx install "git+https://github.com/Panniantong/agent-reach.git" \
      >>"$LOG" 2>&1 && log "cli ok (pipx)" || log "cli install failed (pipx, exit $?)"
  else
    log "neither uv nor pipx available; skipped CLI install"
  fi
fi

date +%s >"$STAMP" 2>/dev/null

# Trim the log so it can't grow without bound.
if [ -f "$LOG" ] && [ "$(wc -l <"$LOG" 2>/dev/null || echo 0)" -gt 500 ]; then
  tail -n 200 "$LOG" >"${LOG}.tmp" 2>/dev/null && mv "${LOG}.tmp" "$LOG" 2>/dev/null
fi

exit 0
