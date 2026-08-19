# Keepsake's dense-theme system vs. StyleSeed (and the rest of `design/`)

Read against `keepsake-ui/design/README.md`, `apps/web/lib/dense/theme.ts`, and `apps/web/app/dashboard/dense-theme.css` on 2026-08-19. Not a generic "here's what StyleSeed does" — this is where Keepsake's actual, already-documented system agrees, diverges, and has real gaps against StyleSeed and the other repos in [`../../design/`](../../design/).

## Already aligned — independently arrived at the same place

- **A single source-of-truth token doc, mirrored into code, never the reverse.** `CLAUDE.md`'s explicit contract ("a token change starts in `design/README.md`, then gets mirrored [to `theme.ts`] — never the reverse") is functionally StyleSeed's `STYLESEED.md` lock, just hand-maintained instead of gate-enforced. Keepsake already has the *structure* StyleSeed's tooling exists to enforce.
- **One accent, everything else neutral.** Keepsake's 4 preset accents (mint/violet/amber/blue) plus greyscale everywhere else matches StyleSeed's "single-accent law" directly — and Keepsake's `topicColorsFor()` deliberately draws list-dot colors from the *same* 4-accent set rather than a second palette, which is more disciplined than StyleSeed requires.
- **Mono face for meta/labels/timestamps, sans for content.** Matches `Dammyjay93/interface-design`'s register-appropriate-density framing for product UI (not marketing pages).
- **Line-height band.** Keepsake's summary line-heights (1.5–1.72 across the three reading-emphasis presets) sit inside `pbakaus/impeccable`'s target band (1.5–1.7×) almost exactly.

## Deliberate divergence — don't "fix" this

- **Zero shadows vs. StyleSeed's ≤8%-opacity layered shadows.** Keepsake's elevation rule is explicit: *"None inside the UI... shadows would break the flat, minimal read."* StyleSeed's default posture allows subtle shadows. This is a real disagreement, not an oversight — it's load-bearing for the "briefing, not gallery" mission. If StyleSeed's `/ss-score` or `impeccable`'s critique pass ever flags the absence of shadows as a problem, that's a false positive for this project specifically — don't take the fix.

## Real gaps — worth a decision, not automatically StyleSeed's answer

1. **Motion is completely unspecified.** `design/README.md` has zero timing/easing anywhere — the only mention is "hover on a row: add a background lift" with no duration. This is an actual gap, not a stylistic choice nobody made. `emilkowalski/skill`'s numbers are a solid starting point for the two motions this UI actually needs:
   - Row hover lift → 100–150ms, ease-out
   - Sidebar collapse/expand (153px ↔ 58px) → this is a size change, not a fade — emilkowalski's guidance is CSS transitions (interruptible) over keyframes for anything re-triggerable, which a sidebar toggle clearly is
   - Row → detail view transition → currently unspecified entirely

2. **Micro-text sizes (8.5–9.5px) sit below `impeccable`'s 11px "functional UI text floor."** The rail version string (8.5px) and status chip (9.5px) are both under the line drawn between "legal smallprint" (10px) and "functional UI text" (11px minimum). This might be a fine, deliberate density tradeoff for a version string nobody reads closely — but right now it's the *default* outcome of a density-first design, not a choice anyone weighed against an accessibility rule. Worth 5 minutes of "is this fine" rather than silent drift.

3. **22×22px icon buttons vs. `ehmo/platform-design-skills`'s 44×44px touch-target minimum (+24px spacing).** Almost certainly a non-issue — this is a desktop-dense list, not a touch surface — but if mobile/touch ever becomes a real target for this screen (not the separate `MobileBrowse` surfaces — see `[[mobile-surfaces]]` in the assistant's own memory), these controls would need a touch-specific size bump, not a shrink-to-fit.

## Suggested next step, ranked

1. **Write the motion section** — the one gap that's not a judgment call, just missing. Two real transitions (row hover, sidebar collapse) need actual numbers in `design/README.md`.
2. **Run one outside critique pass** (StyleSeed's `/ss-score` or Hallmark's `audit`) against a built dense-list screen — not to adopt its opinions on shadows/black-point wholesale, but specifically to catch things like #1 that a self-authored doc won't flag on its own.
3. **Leave the shadow rule and the accent system alone** — both are already more disciplined than what StyleSeed enforces by default.
