# App & web building — reference only, not vendored

An "allrounder" topic folder spanning several related sub-areas: app builders, web frameworks, component libraries, design systems. Unlike [`claude-code/`](../claude-code/) and [`design/`](../design/), nothing here is vendored as a skill/plugin — these are real, legitimate, organically-popular repos, just the wrong *category* for this repo: they're dependencies a **project** would adopt, not skills or prompts **this Claude** invokes directly. Several are also individually 500MB–750MB even shallow-cloned, which would make this repo unusably large. Linked for reference instead.

Every repo below was verified against the GitHub API (stars vs. age/commit recency) — see [`../EXCLUDED.md`](../EXCLUDED.md) for the ones that failed that check and aren't listed here at all.

## App builders (low-code / no-code)

- [appsmithorg/appsmith](https://github.com/appsmithorg/appsmith) — internal tools/admin panel builder (678MB)
- [ToolJet/ToolJet](https://github.com/ToolJet/ToolJet) — similar, now AI-agent app generation (750MB+)
- [Budibase/budibase](https://github.com/Budibase/budibase) — AI agents/automations/apps
- [plasmicapp/plasmic](https://github.com/plasmicapp/plasmic) — visual builder that integrates into an existing React codebase

## Web frameworks / builders

- [withastro/astro](https://github.com/withastro/astro) — content-driven web framework
- [remix-run/remix](https://github.com/remix-run/remix) — full-stack web framework
- [GrapesJS/grapesjs](https://github.com/GrapesJS/grapesjs) — open-source drag-and-drop web builder framework
- [BuilderIO/builder](https://github.com/BuilderIO/builder) — visual dev for React/Vue/Svelte

## Component libraries / design systems

- [radix-ui/primitives](https://github.com/radix-ui/primitives) — accessible primitives, the foundation under shadcn/ui
- [facebook/astryx](https://github.com/facebook/astryx) — open, "agent-ready" design system, official Meta org (520MB)
- [themesberg/flowbite](https://github.com/themesberg/flowbite) — Tailwind component library
- [franken-ui/ui](https://github.com/franken-ui/ui) — HTML-first, shadcn-inspired
- [sailboatui/sailboatui](https://github.com/sailboatui/sailboatui) — Tailwind components

## Other

- [anthropics/claude-code](https://github.com/anthropics/claude-code) — the official CLI itself (you already have it)
- [farion1231/cc-switch](https://github.com/farion1231/cc-switch) — desktop GUI for switching Claude Code/Codex/OpenCode configs, not a skill/plugin
