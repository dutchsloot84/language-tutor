# LT-010 Refinement Split Review

Date: 2026-06-10

## Scope

Refinement-only pass for LT-010 Local Custom Lesson Storage.

Changed surfaces:

- `planning/issues/LT-010-local-custom-lesson-storage.md`
- `planning/issues/LT-010A-local-custom-lesson-storage-decision.md`
- `planning/issues/LT-010B-custom-lesson-schema-migration.md`
- `planning/issues/LT-010C-custom-lesson-import-validation.md`
- `planning/issues/LT-010D-custom-lesson-rendering-completion.md`
- `planning/issues/LT-010E-custom-lesson-snapshot-export-compatibility.md`
- `planning/issues/LT-010F-custom-lesson-docs-workflow.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/project-status.md`

No app runtime files were edited.

## Dependency Mapper

LT-010 depends on LT-009 because the commit-worthy lesson workflow must gate generated lessons before they are stored locally or committed as seeded content. The split keeps LT-010A as the owner decision gate, then sequences implementation as storage/schema migration, import validation, rendering/completion, snapshot/export compatibility, and docs.

LT-010B through LT-010F cannot run until LT-010A approves browser-local custom lessons. LT-010B should run before any other LT-010 implementation slice because all later slices depend on the state shape and old-state migration. LT-010C is the reviewed import/add path. LT-010D depends on LT-010C so rendering/completion can be tested through real reviewed custom lessons rather than hand-built state. LT-010E depends on completion behavior from D. LT-010F has two phases: the import checklist should land with or before LT-010C, and full README/status workflow docs depend on the implemented behavior they document.

LT-010A can run in parallel with LT-008 because it is a decision packet only. LT-010B can also run in parallel with LT-008 only if both coordinate `AppState` additive fields, old raw JSON import defaults, and Settings import/export UI touchpoints. LT-010C and later should not run in parallel with LT-008 unless the owner deliberately re-coordinates Settings import flows, local generated content storage, validation patterns, and learner evidence semantics.

## Local-First Architecture Reviewer

All packets preserve browser-local state and manual JSON export/import. They explicitly exclude Supabase, Vercel-specific hosting assumptions, auth, paid APIs, backend routes, runtime AI calls, automatic sync, secret handling, and learner data upload.

## Learning Loop Reviewer

The split keeps custom lessons tied to the existing proof loop: local snapshot evidence, reviewed `/teach-polish` or hand-authored lesson, local lesson practice, lesson attempt/progress proof, and snapshot summary back to Codex. The packets avoid making custom lessons generic content storage by requiring LT-009 review, existing seeded phrase IDs at first, lesson completion proof, and snapshot compatibility.

## Content Workflow Reviewer

The packets keep lesson records practical and reviewable. LT-010B requires custom lesson records to wrap `Lesson` content with lightweight provenance/review metadata. LT-010C points users back to the commit-worthy lesson workflow before import, rejects missing provenance/review metadata, rejects invalid or colliding lesson payloads, and avoids custom phrase creation. LT-010F keeps seeded committed lessons and browser-local custom lessons conceptually separate, with an import checklist required before or with LT-010C.

## Storage Migration Reviewer

The split explicitly maps storage risk:

- Old localStorage and old raw JSON without custom lesson fields must load/import safely.
- Old localStorage includes both current `language-tutor-state-v1` and legacy `polish-family-tutor-state-v1` key paths.
- `AppState.version` should remain `1` for additive custom lesson defaults; breaking changes require a separate migration packet.
- Parser defaults must add an empty custom lesson collection.
- Malformed custom lesson fields such as `null`, wrong type, malformed records, mismatched IDs, or unsupported future versions must fail safely.
- Duplicate seeded/custom lesson IDs must fail safely.
- Duplicate policy rejects seeded collisions, existing custom collisions by default, and duplicate IDs inside one payload.
- Custom lesson records must preserve provenance/review metadata through storage and raw JSON import/export.
- Initial custom lessons should reference existing seeded phrase IDs only unless a separate custom phrase slice is approved.
- Raw export/import remains the full local backup and transfer path.
- Learner snapshots should summarize custom lesson attempts without dumping unnecessary full custom lesson content.
- Snapshot schema should use additive `language-tutor-learner-snapshot-v1` optional fields unless a breaking schema-version packet is refined first.

## Validation Enforcer

Docs-only refinement used manual cross-read. Future implementation packets name validation by surface:

- LT-010B: `npm run typecheck` plus current/legacy old-state defaults, malformed custom lesson field handling, duplicate-ID checks, and custom lesson raw round-trip/import parsing.
- LT-010C: `npm run typecheck`, `npm run build`, import failure cases, raw round trip, and `/settings` smoke.
- LT-010D: `npm run typecheck`, `npm run build`, old-state route load, seeded/custom completion, and `/lesson` plus `/progress` smoke.
- LT-010E: `npm run typecheck`, `npm run build`, snapshot checks with and without custom lessons, old import, raw round trip, and `/settings` smoke.
- LT-010F: manual cross-read only unless docs include code or command changes.

No automated app validation was run for this refinement because no runtime files changed.

## Manual Cross-Read

Cross-read completed against:

- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `planning/issues/LT-010-local-custom-lesson-storage.md`
- `planning/issues/LT-009-commit-worthy-lesson-workflow.md`
- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `lib/polish-content.ts`
- `app/lesson/page.tsx`
- `app/progress/page.tsx`
- `app/settings/page.tsx`

## Skipped Checks

- App typecheck: skipped because this was docs/planning-only.
- App build: skipped because this was docs/planning-only.
- Browser smoke check: skipped because no UI changed.
- Storage migration check: skipped because no storage shape changed.
