# keepsake-ui

Project-specific notes and findings for [Keepsake](https://github.com/HexPum/keepsake-ui) — a UI fork of Karakeep. Distinct from the topic folders ([`../../claude-code/`](../../claude-code/), [`../../design/`](../../design/), [`../../research/`](../../research/)): those hold reusable tools, this holds things true only about this one project.

Architecture notes, decisions that don't belong in `keepsake-ui/CLAUDE.md` (too long-lived or too exploratory for a file that has to stay under ~200 lines), design-token derivations, things tried and abandoned.

- [`styleseed-vs-dense-theme.md`](styleseed-vs-dense-theme.md) — where Keepsake's dense-theme system already matches [`design/`](../../design/)'s findings, where it deliberately diverges (zero shadows, on purpose), and where there's a real undecided gap (motion is completely unspecified).
