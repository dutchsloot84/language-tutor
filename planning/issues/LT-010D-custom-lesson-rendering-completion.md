# LT-010D: Custom Lesson Rendering And Completion

## Metadata
- Title: Custom Lesson Rendering And Completion
- Task ID: LT-010D
- Trust label: `trust:agent-executable`
- Priority: P2 after LT-010C
- Owner: Shayne
- Status: blocked by `LT-010A`, `LT-010B`, and `LT-010C`

## Problem

Imported custom lessons are only useful if they can enter the same local learning loop as seeded lessons: review target phrases, complete the lesson, schedule phrase review, and produce proof in local progress. Current lesson and progress routes resolve lesson metadata only from seeded `lessons`.

## Outcome

Custom lessons render alongside seeded lessons with clear local/custom labeling, and completing a custom lesson records a normal lesson attempt without breaking seeded lesson progress.

LT-010C is a hard prerequisite so rendering/completion is tested through the real reviewed import/add path rather than hand-built state.

## Scope
- In scope:
  - create a lesson resolver that combines seeded lessons with browser-local custom lessons
  - show custom lessons in the lesson experience with clear local/custom labeling
  - keep seeded lesson selection and completion behavior intact
  - complete a custom lesson using the existing `LessonAttempt` shape unless a small source field is required
  - schedule review for referenced seeded phrase IDs
  - update progress lesson history to resolve custom lesson titles/situations
- Out of scope:
  - lesson import validation unless LT-010C is included
  - custom phrase storage
  - changing quiz scoring behavior beyond existing lesson completion needs
  - snapshot schema updates beyond what is needed for local display
  - runtime AI, cloud, auth, sync, hosting, backend routes, paid APIs, or learner data upload

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `planning/issues/LT-010B-custom-lesson-schema-migration.md`
- `planning/issues/LT-010C-custom-lesson-import-validation.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/polish-content.ts`
- `app/lesson/page.tsx`
- `app/progress/page.tsx`

## Acceptance Criteria
- [ ] Seeded lessons continue to render and complete as before.
- [ ] Custom lessons render from browser-local state with a visible local/custom label.
- [ ] Completing a custom lesson records a lesson attempt without duplicating completion history.
- [ ] Custom lesson completion schedules review for its existing seeded phrase IDs.
- [ ] Progress lesson history resolves custom lesson titles instead of showing only raw IDs.
- [ ] Custom lesson completion contributes to local progress/proof evidence and remains available for LT-010E learner snapshot summary.
- [ ] Old state with no custom lessons still renders `/lesson` and `/progress` safely.
- [ ] No data leaves the device and no runtime generation is added.

## Data And Privacy Check
- Local-only data touched: custom lesson records, lesson attempts, review scheduling, progress display.
- Export/import impact: completion attempts remain in raw state; raw export/import should still preserve state after LT-010B/C.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, after LT-010A approval.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - load old state with no custom lessons and verify `/lesson` and `/progress`
  - complete a seeded lesson and verify existing behavior remains
  - complete a custom lesson and verify attempt/history/review scheduling
  - reload and verify completion state persists
- Browser smoke check:
  - `/lesson`
  - `/progress`

## Docs To Update
- `README.md` Add Lessons section if custom lessons become visible in the app.
- `docs/project-status.md` after implementation if this changes the proof loop.

## Open Questions
- Blocked until LT-010A, LT-010B, and LT-010C land so the renderer can be tested through the real reviewed import/add path.
- Should the lesson page auto-select the next incomplete custom lesson, or should custom lessons live behind an explicit local lessons chooser?

## Slash Goal Prompt

```text
/goal Implement LT-010D Custom Lesson Rendering And Completion.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010D-custom-lesson-rendering-completion.md, planning/issues/LT-010B-custom-lesson-schema-migration.md, planning/issues/LT-010C-custom-lesson-import-validation.md, lib/types.ts, lib/storage.ts, lib/polish-content.ts, app/lesson/page.tsx, and app/progress/page.tsx.

Only proceed after LT-010A approval and after LT-010B and LT-010C land. Render browser-local custom lessons alongside seeded lessons with local/custom labeling, preserve seeded behavior, record custom lesson completion, schedule existing phrase reviews, resolve custom titles in progress history, and keep completion evidence available for LT-010E learner snapshot summary. Do not add runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, learner data upload, or custom phrase storage.

Validate with npm run typecheck and npm run build. Manually test old-state route load, seeded lesson completion, custom lesson completion, review scheduling, reload persistence, and browser-smoke /lesson and /progress.
```
