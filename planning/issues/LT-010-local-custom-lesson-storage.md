# LT-010: Local Custom Lesson Storage

## Metadata
- Title: Local Custom Lesson Storage
- Task ID: LT-010
- Trust label: `trust:agent-draft`
- Priority: P2
- Owner: Shayne

## Problem

Generated or hand-authored lessons may eventually need to live in browser-local state, but this is riskier than committing seeded content because it changes storage, export/import, lesson rendering, quiz history, and snapshot behavior.

## Outcome

Add browser-local custom lessons only after the commit-worthy lesson workflow is proven. Custom lessons should render alongside seeded lessons, preserve existing progress, and remain fully local/exportable.

## Scope
- In scope:
  - add a versioned custom lesson collection to local state
  - defensively migrate old `AppState.version: 1` records that do not have custom lessons
  - render custom lessons alongside seeded lessons without changing product identity
  - include custom lessons and attempts in raw JSON export/import
  - include custom lesson attempts or summaries in learner snapshots
  - add local create/import path only if the lesson shape is already documented and reviewable
- Out of scope:
  - runtime AI lesson generation
  - cloud storage or sync
  - auth or profiles
  - adding Japanese or another language module
  - rich lesson authoring beyond the smallest useful local import/add flow
  - replacing committed seeded lessons

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `planning/issues/LT-009-commit-worthy-lesson-workflow.md`
- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `lib/polish-content.ts`
- `app/lesson/page.tsx`
- `app/progress/page.tsx`
- `app/settings/page.tsx`

## Acceptance Criteria
- [ ] Custom lessons persist in browser-local state with a versioned shape.
- [ ] Old localStorage/raw JSON state without custom lessons loads and imports safely.
- [ ] Seeded lessons still render and retain existing attempts/progress.
- [ ] Custom lessons render in the lesson selection/lesson experience with clear local/custom labeling.
- [ ] Completing a custom lesson records attempts without breaking seeded lesson history.
- [ ] Raw export/import includes custom lessons and their attempts.
- [ ] Learner snapshot includes custom lesson attempts or summaries without dumping unnecessary full local data.
- [ ] No learner data leaves the device and no runtime AI is added.

## Data And Privacy Check
- Local-only data touched: custom lesson records, lesson attempts, raw export/import, learner snapshot summaries.
- Export/import impact: significant; implementation must preserve old raw JSON compatibility and include manual round-trip checks.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, if scope stays browser-local and manual.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - load or import old state with no custom lesson fields
  - add/import one custom lesson locally
  - complete the custom lesson
  - export raw JSON and import it back, verifying custom lesson and attempt survive
  - verify learner snapshot includes custom lesson attempt/summary
- Browser smoke check:
  - `/lesson`
  - `/progress`
  - `/settings`
  - any custom lesson import/add route if added

## Docs To Update
- Update `README.md` Add Lessons and Adaptive Tutor Loop sections if custom local lessons become supported.
- Update `.codex/skills/teach-polish/resources/learner-snapshot-schema.md` if snapshot shape changes.
- Update `docs/project-status.md` after implementation if this changes the recommended next wave.

## Open Questions
- `status:needs-decision` until LT-009 is complete and the owner decides whether custom lessons should be imported into browser state or remain commit-only for another wave.
- Decide whether this should be split into two slices: storage/migration first, then UI import/rendering.

## Slash Goal Prompt

```text
/goal Refine or implement LT-010 Local Custom Lesson Storage only after LT-009 is complete.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, planning/issues/LT-010-local-custom-lesson-storage.md, planning/issues/LT-009-commit-worthy-lesson-workflow.md, .codex/skills/teach-polish/LESSON-FORMAT.md, lib/types.ts, lib/storage.ts, lib/snapshot.ts, lib/polish-content.ts, app/lesson/page.tsx, app/progress/page.tsx, and app/settings/page.tsx.

If LT-009 is not complete or the owner has not chosen browser-local custom lesson storage over commit-only lessons, stop and mark this status:needs-decision. If approved, implement the smallest local-only custom lesson storage slice with old-state migration, raw export/import preservation, lesson rendering, completion logging, and snapshot summary support. Do not add runtime AI, cloud, auth, hosting, paid APIs, profiles, or another language module.

Validate with npm run typecheck and npm run build. Manually test old-state load/import, custom lesson add/import, custom lesson completion, raw export/import round trip, and learner snapshot summary. Browser-smoke /lesson, /progress, /settings, and any new custom lesson view.
```
