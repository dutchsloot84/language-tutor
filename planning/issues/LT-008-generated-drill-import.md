# LT-008: Generated Drill Import

## Metadata
- Title: Generated Drill Import
- Task ID: LT-008
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

After `/teach-polish` produces a stable app-ready drill format, the app needs a local way to import a generated drill without adding runtime AI or sending learner data anywhere.

## Outcome

The app can import a local generated drill JSON file, validate it safely, persist it in browser-local state, and surface imported drills from Practice.

This slice should close the manual Codex drill loop while preserving old raw JSON backups and local progress.

## Scope
- In scope:
  - define app-side generated drill types aligned with LT-007
  - add defensive parsing/validation for generated drill JSON
  - add a versioned optional generated-drills collection to `AppState`
  - migrate/merge old local state so missing generated-drill fields default safely
  - include generated drills in raw JSON export/import
  - add a local import action from Settings or Practice
  - show imported drills in Practice with a simple drill runner or clear entry point
- Out of scope:
  - generating drills inside the app
  - importing markdown directly unless it is trivial to extract the fenced JSON safely
  - local custom lesson storage
  - lesson import
  - cloud sync, auth, hosting, paid APIs, or backend routes

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `planning/issues/LT-007-generated-drill-format.md`
- `.codex/skills/teach-polish/DRILL-FORMAT.md`
- `.codex/skills/teach-polish/resources/generated-drill-schema.md` if created by LT-007
- `lib/types.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `app/practice/page.tsx`
- `app/settings/page.tsx`
- `app/practice/misses/page.tsx` for drill UX reference

## Acceptance Criteria
- [ ] App accepts a generated drill JSON file matching the LT-007 schema.
- [ ] Malformed JSON, wrong schema, missing required fields, and duplicate IDs fail safely with visible feedback and no state overwrite.
- [ ] Imported drills persist in browser-local state and survive reload.
- [ ] Old raw state JSON without generated drills still loads and imports without crashing.
- [ ] Raw `Export JSON` and `Import JSON` preserve imported generated drills.
- [ ] Imported drill appears in Practice and can be opened or run locally.
- [ ] No runtime AI, backend, cloud, auth, or paid API behavior is added.

## Data And Privacy Check
- Local-only data touched: generated drill metadata/content and practice logs if running an imported drill logs completion.
- Export/import impact: raw state export/import includes generated drills; learner snapshot impact should be explicit if generated drill attempts are logged.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - import the LT-007 sample drill JSON
  - try malformed JSON and verify state is not overwritten
  - export raw JSON, reset or reload, import it back, and verify imported drills remain
  - verify old raw state without generated drills still loads or imports
- Browser smoke check:
  - `/practice`
  - the generated drill import entry point
  - imported drill route/view if added

## Docs To Update
- Update `README.md` Adaptive Tutor Loop if generated drill import becomes a supported workflow.
- Update `.codex/skills/teach-polish/resources/generated-drill-schema.md` only if implementation discovers needed schema corrections.
- Update `docs/project-status.md` after implementation if this becomes recently completed or changes the recommended next wave.

## Open Questions
- None if LT-007 has landed. If LT-007 is not complete, mark this `status:needs-decision` instead of implementing.

## Slash Goal Prompt

```text
/goal Implement LT-008 Generated Drill Import.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, planning/issues/LT-008-generated-drill-import.md, planning/issues/LT-007-generated-drill-format.md, .codex/skills/teach-polish/DRILL-FORMAT.md, the LT-007 generated drill schema/sample, lib/types.ts, lib/storage.ts, lib/snapshot.ts, app/practice/page.tsx, app/settings/page.tsx, and app/practice/misses/page.tsx.

Add local generated drill JSON import, safe validation, browser-local persistence, raw export/import preservation, and a Practice entry point for imported drills. Preserve old local state and old raw JSON imports. Do not add runtime AI, backend routes, cloud, auth, hosting, paid APIs, or local custom lesson storage.

Validate with npm run typecheck and npm run build. Manually test valid sample import, malformed import failure, raw export/import round trip, and old-state compatibility. Browser-smoke /practice and any new import/drill view.
```
