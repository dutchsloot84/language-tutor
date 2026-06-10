# LT-010C: Custom Lesson Import Validation

## Metadata
- Title: Custom Lesson Import Validation
- Task ID: LT-010C
- Trust label: `trust:agent-executable`
- Priority: P2 after LT-010B
- Owner: Shayne
- Status: blocked by `LT-010A` and `LT-010B`

## Problem

Local custom lessons need a safe add/import path before they can become part of the learner loop. The app should not accept arbitrary malformed JSON, seeded ID collisions, lessons that cite missing phrase IDs, or generated content that bypasses the LT-009 review standard.

## Outcome

Add a minimal local custom lesson JSON import/add path with validation and visible failure behavior. Imported lessons persist in browser-local state but do not need to render in the lesson flow until LT-010D.

Coordinate with LT-008 if it is in flight. LT-010C should not run in parallel with LT-008 unless the owner deliberately re-coordinates Settings import UI, generated content storage, validation patterns, and learner evidence semantics.

## Scope
- In scope:
  - define the accepted custom lesson JSON payload as a reviewed custom lesson record, with `Lesson` fields plus provenance/review metadata from LT-010B
  - add parser/validator logic for required fields, provenance/review metadata, quiz question types, duplicate IDs, missing phrase IDs, and practical length limits
  - define duplicate handling explicitly: seeded ID collisions reject, existing custom ID collisions reject by default, duplicate IDs inside a multi-lesson payload reject the whole payload unless a later replace/merge flow is approved
  - support local file import or a minimal local add path from Settings
  - persist valid lessons into the LT-010B custom lesson collection
  - show clear feedback for rejected input without overwriting existing state
  - preserve raw export/import behavior for the updated state
- Out of scope:
  - runtime AI lesson generation
  - importing markdown directly unless a later slice explicitly defines safe extraction
  - custom phrase creation
  - rendering imported lessons in `/lesson`
  - completing custom lessons
  - snapshot schema updates
  - cloud sync, auth, hosting, backend routes, paid APIs, or learner data upload

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `planning/issues/LT-010B-custom-lesson-schema-migration.md`
- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/polish-content.ts`
- `app/settings/page.tsx`

## Acceptance Criteria
- [ ] A valid custom lesson JSON payload can be imported or added locally.
- [ ] Malformed JSON fails safely with visible feedback and no state overwrite.
- [ ] Missing required fields, missing provenance/review metadata, invalid quiz types, duplicate lesson IDs, and missing phrase IDs fail safely.
- [ ] Imported generated lessons must carry LT-009 review confirmation plus source category or workflow evidence without storing unnecessary private learner text.
- [ ] Duplicate handling is explicit: seeded collisions reject, existing custom collisions reject by default, and duplicates inside one payload reject the payload.
- [ ] Imported custom lessons persist after reload.
- [ ] Raw `Export JSON` and `Import JSON` preserve imported custom lessons.
- [ ] The UI or helper copy points users back to the commit-worthy lesson workflow before adding generated lessons.
- [ ] No custom lesson is rendered in the main lesson flow unless LT-010D is also intentionally implemented.

## Data And Privacy Check
- Local-only data touched: custom lesson JSON and browser-local app state.
- Export/import impact: raw state export/import must preserve imported custom lessons.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, after LT-010A approval.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - import one valid reviewed custom lesson JSON
  - try malformed JSON and verify no state overwrite
  - try a structurally valid lesson with missing provenance/review metadata and verify rejection
  - try duplicate seeded ID, existing custom ID, and duplicate IDs inside one payload and verify rejection
  - try missing phrase ID and verify rejection
  - export raw JSON, import it back, and verify custom lesson survives
- Browser smoke check:
  - `/settings`
  - any custom lesson import/add UI added by this slice

## Docs To Update
- `docs/playbooks/commit-worthy-lessons.md` with a local custom lesson import checklist; this should land with or before the import path.
- `README.md` Add Lessons section if local custom lesson import becomes supported.

## Open Questions
- Blocked until LT-010A and LT-010B land.
- Should the first import path accept only `.json`, or also markdown lessons with a fenced app-ready JSON block in a later slice?

## Slash Goal Prompt

```text
/goal Implement LT-010C Custom Lesson Import Validation.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010C-custom-lesson-import-validation.md, planning/issues/LT-010B-custom-lesson-schema-migration.md, .codex/skills/teach-polish/LESSON-FORMAT.md, lib/types.ts, lib/storage.ts, lib/polish-content.ts, and app/settings/page.tsx.

Only proceed after LT-010A approval and LT-010B landing. Coordinate with LT-008 if it is in flight. Add a local custom lesson JSON import/add path with strict validation, provenance/review metadata checks, visible failure feedback, explicit duplicate rejection, persistence, raw export/import preservation, and the local custom lesson import checklist in docs/playbooks/commit-worthy-lessons.md. Do not render imported lessons in the main lesson flow unless LT-010D is also in scope. Do not add runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, custom phrases, or learner data upload.

Validate with npm run typecheck and npm run build. Manually test valid import, malformed import, missing provenance/review metadata rejection, seeded/custom/payload duplicate ID rejection, missing phrase ID rejection, and raw export/import round trip. Browser-smoke /settings and the import UI.
```
