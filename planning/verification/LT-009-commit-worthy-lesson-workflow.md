# LT-009 Commit-Worthy Lesson Workflow Verification

Date: 2026-06-10

## Scope

Docs-only implementation for LT-009.

Changed surfaces:

- `docs/playbooks/commit-worthy-lessons.md`
- `README.md`
- `docs/playbooks/agentic-development.md`
- `docs/project-status.md`
- `docs/backlog/local-first-roadmap.md`

No app runtime files were edited.

## Review Lenses

### Dependency Mapper

LT-009 gates LT-010 Local Custom Lesson Storage by defining the manual review workflow and app field mapping that should be proven before browser-local custom lessons are added. LT-009 does not require LT-007 Generated Drill Format or LT-008 Generated Drill Import because lesson commits use seeded content review, not generated drill import.

### Local-First Architecture Reviewer

The workflow preserves the manual Codex/local-first architecture: learner evidence comes from local snapshot export or explicit user-provided notes, `/teach-polish` generates a draft outside app runtime, and reviewable content is committed manually. The workflow explicitly excludes API calls, cloud sync, auth, hosting, secrets, paid APIs, runtime AI, and learner data leaving the device.

### Learning Loop Reviewer

The workflow starts from snapshot evidence and prioritizes corrections, quiz misses, review misses, hard phrases, due reviews, weak areas, and home-practice logs. It requires one practical home/family situation, one pattern, a speaking drill, a use-it-today challenge, and a log-back instruction so lessons produce practice and proof instead of generic curriculum churn.

### Content Workflow Reviewer

The workflow requires provenance, Polish content review, app field mapping, unique seeded IDs, phrase reuse where possible, phrase quality checks, valid quiz question types, and a commit/PR handoff checklist. It keeps generated lessons practical, reviewable, source-backed, and commit-worthy before any import or storage automation exists.

### Storage Migration Reviewer

No storage migration is introduced. The workflow documents that LT-010 must handle any future storage shape, migration, export/import, lesson rendering, quiz history, and snapshot behavior changes separately.

### Validation Enforcer

Validation was docs-only manual cross-read. No `npm run typecheck`, `npm run build`, dev server, browser smoke check, or storage migration test was run because no runtime files changed.

## Manual Cross-Read

Cross-read completed against:

- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `lib/types.ts`
- `lib/polish-content.ts`
- `README.md` Adaptive Tutor Loop and Add Lessons sections
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `planning/issues/LT-009-commit-worthy-lesson-workflow.md`
- `planning/issues/LT-010-local-custom-lesson-storage.md`

Result: workflow matches the skill lesson sections, required app `Lesson` fields, existing `Phrase` and `QuizQuestion` shapes, snapshot evidence fields, and the LT-009/LT-010 boundary.

## Skipped Checks

- App typecheck: skipped because this was docs-only.
- App build: skipped because this was docs-only.
- Browser smoke check: skipped because no UI changed.
- Storage migration check: skipped because no storage shape changed.
