# LT-010B: Custom Lesson Schema And Migration

## Metadata
- Title: Custom Lesson Schema And Migration
- Task ID: LT-010B
- Trust label: `trust:agent-executable`
- Priority: P1 after LT-010A approval
- Owner: Shayne
- Status: blocked by `LT-010A`

## Problem

Before the app can import or render local custom lessons, the browser-local state shape needs a safe versioned place for them. The current `AppState.version: 1` has no custom lesson field, and `lib/storage.ts` defensively merges old state into `createInitialState()`.

The first implementation slice should establish the smallest durable storage contract without adding UI or lesson behavior.

## Outcome

Add a browser-local custom lesson collection to app state with defensive migration defaults, duplicate-ID protection helpers, and raw JSON compatibility expectations. Existing localStorage records and old raw exports without custom lessons continue to load and import safely.

This slice should keep `AppState.version: 1` and use additive parser defaults unless implementation discovers a breaking storage change. If a breaking change is required, stop and refine a storage-key/version migration packet instead of silently changing the storage contract.

Coordinate with LT-008 if it is in flight, because both slices may add `AppState` fields and raw JSON parser defaults.

## Scope
- In scope:
  - add local custom lesson record types that wrap the existing `Lesson` shape with lightweight provenance/review metadata
  - add an optional/versioned custom lesson collection to `AppState`
  - keep `AppState.version: 1` for the additive field, with defensive defaults for missing custom lessons
  - update `createInitialState()` and migration/loading so missing custom lesson fields default safely
  - sanitize malformed custom lesson fields in localStorage or raw imports, including `null`, wrong type, malformed records, mismatched IDs, and unsupported future custom lesson record versions
  - add helper logic for seeded/custom lesson ID collision detection
  - require enough provenance to show the lesson was reviewed before storage, such as source type, evidence category or snapshot date, optional skill record path, and review confirmation
  - keep local custom lessons constrained to existing seeded phrase IDs unless a later custom phrase slice is approved
  - preserve current and legacy-key localStorage compatibility, including `language-tutor-state-v1` and `polish-family-tutor-state-v1`
  - define import semantics for old raw JSON without custom lessons as full-state restore with an empty custom lesson collection unless a later import-preview/merge slice is approved
- Out of scope:
  - custom lesson import UI
  - local lesson authoring UI
  - rendering custom lessons on `/lesson`
  - completing custom lessons
  - snapshot schema changes
  - custom phrase storage
  - runtime AI, cloud, auth, sync, hosting, backend routes, or paid APIs

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `planning/issues/LT-010-local-custom-lesson-storage.md`
- `planning/issues/LT-010A-local-custom-lesson-storage-decision.md`
- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/polish-content.ts`

## Acceptance Criteria
- [ ] `AppState` includes a browser-local custom lesson collection with a safe default.
- [ ] `AppState.version` remains `1` for this additive field, unless the implementer stops and refines a breaking migration packet.
- [ ] Custom lesson records wrap `Lesson` content with lightweight provenance/review metadata rather than storing bare lesson JSON only.
- [ ] Loading current or legacy-key localStorage state with no custom lesson field returns valid state.
- [ ] Importing old raw JSON with no custom lesson field returns valid state and restores an empty custom lesson collection as part of full-state import.
- [ ] Malformed custom lesson fields in localStorage or raw JSON fail safely to an empty valid collection or rejected records without corrupting the rest of state.
- [ ] Custom lesson records cannot silently shadow seeded lessons with the same ID.
- [ ] Initial custom lessons reference existing seeded phrase IDs only, or invalid phrase IDs are rejected by helper validation.
- [ ] Raw `Export JSON` naturally includes the custom lesson collection once present because it exports full `AppState`.
- [ ] No route/UI behavior changes are introduced in this slice.

## Data And Privacy Check
- Local-only data touched: browser-local app state shape and raw JSON backup shape.
- Export/import impact: old imports must remain compatible; new exports include the custom lesson collection when present.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, after LT-010A approves browser-local scope.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
- Manual:
  - reason through or test loading current and legacy-key old state objects with no custom lesson field
  - reason through or test importing old raw JSON with no custom lesson field as a full-state restore to an empty custom lesson collection
  - reason through or test malformed custom lesson fields: `null`, wrong type, malformed records, mismatched IDs, and unsupported future custom lesson record versions
  - verify duplicate seeded/custom lesson IDs fail safely in helper validation
  - reason through or test that a state containing one reviewed custom lesson record survives raw export/import or `importState`/migration parsing without losing lesson or provenance metadata
- Browser smoke check:
  - not required unless implementation unexpectedly touches visible routes

## Docs To Update
- `README.md` only if the raw JSON shape is described in user-facing docs.
- `docs/project-status.md` after implementation only if this becomes recently completed.

## Open Questions
- Blocked until LT-010A owner approval.
- None after LT-010A approval. Keep `AppState.version: 1` for the additive custom lesson collection unless implementation discovers a breaking change and stops for a refined migration packet.

## Slash Goal Prompt

```text
/goal Implement LT-010B Custom Lesson Schema And Migration.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010-local-custom-lesson-storage.md, planning/issues/LT-010A-local-custom-lesson-storage-decision.md, planning/issues/LT-010B-custom-lesson-schema-migration.md, .codex/skills/teach-polish/LESSON-FORMAT.md, lib/types.ts, lib/storage.ts, and lib/polish-content.ts.

Only proceed if LT-010A has owner approval. Add the smallest browser-local custom lesson state shape, including lightweight provenance/review metadata, `AppState.version: 1` additive defaults, current and legacy-key old-state compatibility, malformed custom lesson field sanitization, old raw JSON full-restore compatibility, and duplicate seeded/custom lesson ID validation helpers. Do not add import UI, rendering, completion behavior, snapshot changes, custom phrases, runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, or learner data upload.

Validate with npm run typecheck. Manually verify old-state/default compatibility, duplicate-ID handling, and raw export/import or import parsing for a state containing one reviewed custom lesson record.
```
