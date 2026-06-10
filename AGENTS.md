# Language Tutor Repo Front Door

Language Tutor is a local-first language-learning app. Polish is the first module, and the project-local `/teach-polish` skill is the tutor brain. The app should stay generic enough for Japanese or other modules later.

## AI Operating Contract

Use this contract for Codex, other coding agents, and human-agent handoffs.

- Local-first comes first. Do not add Supabase, Vercel, auth, paid APIs, or hosted sync unless the task explicitly says the project is expanding scope.
- Keep the product identity generic as `Language Tutor`. Polish-specific teaching logic belongs in `.codex/skills/teach-polish/` or Polish content modules.
- Work one bounded slice at a time. Make the smallest safe diff that proves the learning loop improves.
- Prefer app-to-Codex handoff through local export/import before runtime AI calls.
- Preserve browser-local progress when storage shapes change. Add migrations or defensive loaders for new state fields.
- Do not invent language-learning records that the app did not export. If using `/teach-polish`, cite snapshot data, skill records, or user-provided corrections.
- Do not claim validation was run unless it was actually run.
- Update docs when behavior or workflow changes.
- Stop and ask before adding cloud services, auth, paid API calls, secret handling, external data uploads, or learner data leaving the device.

## Read First

Start planning or implementation sessions with:

1. `AGENTS.md`
2. `README.md`
3. `docs/project-status.md`
4. `docs/playbooks/agentic-development.md`
5. The task-specific docs, templates, or skill files named by the request

For Polish lesson or drill work, also read:

- `.codex/skills/teach-polish/SKILL.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- the latest relevant skill records under `.codex/skills/teach-polish/`

## Repo Map

- `app/` - Next.js app routes
- `components/` - shared UI components
- `lib/` - local content, storage, SRS, snapshot, and types
- `.codex/skills/teach-polish/` - project-local Polish tutor skill and records
- `docs/` - project status, workflow, decisions, backlog, and templates
- `planning/` - refined issues and verification notes for bounded slices

## Source Of Truth

- App behavior lives in code and `README.md`.
- Current sequencing lives in `docs/project-status.md`.
- Agent workflow lives in `docs/playbooks/agentic-development.md`.
- Polish tutor behavior lives in `.codex/skills/teach-polish/`.
- Architecture decisions live in `docs/decisions/`.
- Refined execution packets live in `planning/issues/`.
- Verification notes live in `planning/verification/`.

If these conflict, prefer the most specific task source, then code, then `README.md`, then status/workflow docs. Report meaningful drift instead of guessing.

## Canonical Commands

- Install: `npm install`
- Worktree bootstrap: `npm run setup:worktree`
- Dev server: `npm run dev`
- LAN dev server: `npm run dev:lan`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Build: `npm run build`

## Planning Packet

Use planning mode when scope is still blurry. Minimum packet:

- raw request or rough idea
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- 1-3 relevant source docs or files
- explicit non-goals and stop conditions

Planning should produce a refined issue, a small backlog item, or `status:needs-decision`.

## Execution Packet

Use execution mode when the slice is ready to implement. Minimum packet:

- refined issue or equivalent bounded brief
- relevant source docs and likely files
- acceptance criteria
- validation commands and any manual checks
- out-of-scope follow-ups

If the issue is not execution-ready, refine it first.

For worktree threads, run `npm run setup:worktree` before validation or a dev server. Git worktrees do not copy ignored dependency folders such as `node_modules`, so this command installs dependencies only when required.

## Slice Boundaries

Keep one slice to one reviewable outcome, such as:

- one local-first learning loop improvement
- one storage or snapshot migration
- one lesson/drill import/export capability
- one UI workflow improvement
- one docs/workflow scaffold update

Split the work when it mixes local-first app behavior, runtime AI, hosting, auth, data sync, or a new language module.

## Validation

Use the smallest truthful validation set:

- Types/storage/content changes: `npm run typecheck`
- Next.js route or UI changes: `npm run typecheck` and `npm run build`
- Docs-only changes: manual cross-read; run app checks only if docs include code or command changes
- User-visible UI changes: browser smoke check when practical
- Storage migrations: test with old state shape or reason explicitly about migration safety

Final handoffs must say what ran, what passed, what failed, and what was not checked.

## Cloud And API Expansion Gate

Do not add these without an explicit owner decision:

- Supabase
- Vercel deployment dependencies
- auth or multi-user profiles
- OpenAI API calls at runtime
- backend routes that hold secrets
- sync that transmits learner data off-device

When the project is ready to expand, create an ADR first with cost, privacy, fallback behavior, and local-first rollback implications.
