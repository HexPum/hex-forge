# Excluded — fake/farmed stars

Consolidated ledger, checked across every topic folder in this repo. **Check here before adding anything new** — don't re-surface a repo already caught.

**The check:** `gh api repos/<org>/<repo> --jq '{stargazers_count, created_at, pushed_at}'`, then stars ÷ months-since-creation. Genuine organic virality tops out around **~8,000 stars/month** even for very popular repos (calibrated against confirmed-real examples: `x1xhlol/system-prompts-and-models-of-ai-tools` at 8.4k/mo, `hesreallyhim/awesome-claude-code` at 3.3k/mo). Meaningfully above that, or a huge star count with no recent commits, means bought/farmed stars — a way to launder trust into low-quality or malicious packages. Don't install code from a repo shaped like that.

| Repo | Red flag | Found via |
|---|---|---|
| `affaan-m/ECC` | 241k★ in 7 months | keyword search |
| `multica-ai/andrej-karpathy-skills` | 204k★, zero commits since April 2026 | keyword search |
| `JuliusBrussee/caveman` | 99k★ in 4 months — this is the literal "Caveman" from a viral reel; skip it | keyword search + reel |
| `obra/superpowers` | 274k★ in 10 months (~27k/mo) — more total stars than the official `anthropics/claude-code` | keyword search |
| `nextlevelbuilder/ui-ux-pro-max-skill` | 118k★ in 8.6 months. Repackages the `ui-ux-pro-max` skill (67 styles/161 palettes/57 font pairings) already in this Claude's toolkit, with bought stars on top | reel ("UI/UX Pro Max") |
| `msitarzewski/agency-agents` | 146k★ in ~10 months (~14.3k/mo) — the reel's original "Agency Agents" repo. Its fork `jnMetaCode/agency-agents-zh` (kept, see [claude-code/](claude-code/)) is the organic version | reel ("Agency Agents") |
| `nexu-io/open-design` | 89k★ in ~4 months (~23.7k/mo), SEO-stuffed description. Part of a larger "open-source Claude Design alternative" cluster (`opencoworkai/open-codesign`, `open-pencil/open-pencil`, `ZSeven-W/openpencil`) that otherwise measures under the ceiling but predates the relevant trending window | trending scan |
| `cinderline/northcinder` | ~17.9k★/mo, near-zero forks | trending scan |
| `ccch1mneyyy/dsh-TUI` | ~10.3k★/mo, 0 watchers | trending scan |

**Pattern to watch:** fake-star campaigns increasingly park on the `topic:claude-code` GitHub tag specifically, riding its discoverability.

## Flagged, not excluded — needs a manual second look

Moderately over the ceiling (14–24%, vs. 150%+ on the confirmed fakes above) but with real company backing and fresh commits. Not trusted, not written off either.

| Repo | Notes |
|---|---|
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Agentic video-production system ("Open Montage" from the reel), ~10.4k★/mo, covered by explainx.ai |
| [stablyai/orca](https://github.com/stablyai/orca) | Parallel-agent-fleet runner ("Orca" from the reel), ~9.6k★/mo, real company (Stably AI) |
