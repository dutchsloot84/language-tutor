# LT-006 Through LT-010 Refinement Review

Date: 2026-06-10

## Scope

Refinement-only pass for:

- LT-006 Progress Proof Scorecard
- LT-007 Generated Drill Format
- LT-008 Generated Drill Import
- LT-009 Commit-Worthy Lesson Workflow
- LT-010 Local Custom Lesson Storage

No app runtime files were edited.

## Dependency Mapper

- LT-006 can run next. It depends on the current miss-drill state on main: `app/practice/misses/page.tsx` logs `miss-drill` practice events and `lib/miss-drill.ts` derives a queue from quiz/review misses.
- LT-007 should precede LT-008. Import should not be implemented until the generated drill schema and sample are stable.
- LT-009 should precede LT-010. Commit-worthy lesson review should gate browser-local custom lesson storage.
- LT-010 is intentionally `trust:agent-draft` and `status:needs-decision` until the owner chooses local custom lessons over continuing commit-only seeded lessons.

## Local-First Architecture Reviewer

All five packets preserve the manual Codex/local-first model. They explicitly exclude runtime AI calls, backend routes, Supabase, Vercel-specific hosting assumptions, auth, paid APIs, and sync.

## Learning Loop Reviewer

- LT-006 measures whether miss evidence turns into retries, known phrases, and home usage.
- LT-007 standardizes generated drill output so Codex work can become reviewable practice.
- LT-008 closes the manual drill loop by importing only local files after format stabilization.
- LT-009 keeps generated lessons reviewable before they affect app/runtime state.
- LT-010 is useful only after the lesson workflow proves custom lessons are worth storing locally.

## Content Workflow Reviewer

Generated drill and lesson slices keep `/teach-polish` output practical, source-backed, and reviewable. LT-007 requires sample drill provenance. LT-009 requires a lesson quality checklist and app field mapping before seeded content changes or local storage automation.

## Storage Migration Reviewer

- LT-006 and LT-007 should not require storage changes.
- LT-008 requires generated-drill defaults/migration, safe JSON validation, duplicate handling, and raw export/import round-trip checks.
- LT-010 requires old localStorage/raw JSON compatibility, snapshot summary changes, and manual migration checks. It may need splitting into storage/migration and UI slices.

## Validation Enforcer

- Docs/skill-only LT-007 and LT-009 require manual cross-read and JSON parse checks where applicable.
- UI/runtime LT-006, LT-008, and eventual LT-010 require `npm run typecheck`, `npm run build`, and targeted browser smoke checks.
- Storage/import slices explicitly require old-state and export/import round-trip manual checks.
