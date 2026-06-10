# LT-010: Local Custom Lesson Storage

## Metadata
- Title: Local Custom Lesson Storage
- Task ID: LT-010
- Trust label: `trust:agent-draft`
- Priority: P2
- Owner: Shayne
- Status: `status:needs-decision`

## Problem

Generated or hand-authored lessons may eventually need to live in browser-local state, but the original LT-010 scope is too broad for one implementation slice. It crosses storage shape, old localStorage compatibility, safe local lesson validation, lesson rendering, completion logging, raw export/import, learner snapshot summaries, and workflow docs.

The project now has the LT-009 commit-worthy lesson workflow. That workflow is the quality gate for committed seeded lessons, but it does not automatically decide whether the app should also support browser-local custom lessons.

## Outcome

Split LT-010 into smaller packets that can be executed only after the owner explicitly chooses browser-local custom lesson storage over continuing commit-only seeded lessons for another wave.

Recommended sequence:

1. `LT-010A-local-custom-lesson-storage-decision.md`
2. `LT-010B-custom-lesson-schema-migration.md`
3. `LT-010C-custom-lesson-import-validation.md`
4. `LT-010D-custom-lesson-rendering-completion.md`
5. `LT-010E-custom-lesson-snapshot-export-compatibility.md`
6. `LT-010F-custom-lesson-docs-workflow.md`

## Scope
- In scope:
  - preserve LT-010 as the parent planning packet
  - document the decision required before implementation
  - split storage, import, rendering/completion, snapshot/export compatibility, and docs work into bounded slices
  - keep all future implementation local-first and browser-local
- Out of scope:
  - implementing custom lesson storage in this refinement slice
  - adding custom lessons to browser state now
  - runtime AI lesson generation
  - cloud storage or sync
  - auth or profiles
  - backend routes, API keys, hosting assumptions, or paid APIs
  - adding Japanese or another language module

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
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

## Acceptance Criteria
- [ ] LT-010 remains marked `status:needs-decision` until the owner chooses browser-local custom lessons.
- [ ] Sub-slices name clear dependencies, in-scope work, out-of-scope work, validation, and docs updates.
- [ ] Storage migration, old raw JSON compatibility, duplicate IDs, parser defaults, raw export/import, and snapshot impact are explicitly covered before any UI slice.
- [ ] No packet adds runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, or learner data upload.
- [ ] The learning loop remains snapshot evidence -> reviewed lesson -> local practice -> proof.

## Data And Privacy Check
- Local-only data touched: planning docs only in this refinement slice.
- Export/import impact: none in this refinement slice; future packets explicitly cover raw JSON compatibility.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, if the owner approves browser-local custom lessons and scope stays local-only. Create an ADR first if scope expands to sync, auth, hosted storage, runtime AI, backend secrets, or learner data upload.

## Validation
- Automated:
  - none required for docs-only refinement
- Manual:
  - cross-read this parent packet and LT-010 sub-packets against the source docs/files listed above
  - run the requested review lenses before commit and PR
- Browser smoke check:
  - not required because no runtime files changed

## Docs To Update
- `docs/backlog/local-first-roadmap.md` to point LT-010 to the decision gate and sub-packets.
- `docs/project-status.md` only if the recommended next implementation wave needs to name the decision gate.

## Open Questions
- `status:needs-decision`: Does the owner want browser-local custom lesson storage now, or should generated lessons remain commit-only seeded content until more real study sessions prove the workflow?
- If approved, should local custom lesson IDs use a reserved prefix such as `custom-lesson-` to avoid collisions with seeded lesson IDs?
- If approved, should local custom lessons be limited to phrase IDs that already exist in seeded `phrases`, or may a later slice introduce custom phrase records?

## Slash Goal Prompt

```text
/goal Decide LT-010 Local Custom Lesson Storage.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010-local-custom-lesson-storage.md, planning/issues/LT-010A-local-custom-lesson-storage-decision.md, planning/issues/LT-010B-custom-lesson-schema-migration.md, planning/issues/LT-010C-custom-lesson-import-validation.md, planning/issues/LT-010D-custom-lesson-rendering-completion.md, planning/issues/LT-010E-custom-lesson-snapshot-export-compatibility.md, planning/issues/LT-010F-custom-lesson-docs-workflow.md, planning/issues/LT-009-commit-worthy-lesson-workflow.md, .codex/skills/teach-polish/LESSON-FORMAT.md, .codex/skills/teach-polish/resources/learner-snapshot-schema.md, lib/types.ts, lib/storage.ts, lib/snapshot.ts, lib/polish-content.ts, app/lesson/page.tsx, app/progress/page.tsx, and app/settings/page.tsx.

Do not implement app behavior in the decision slice. Decide whether browser-local custom lesson storage should proceed now or whether generated lessons should remain commit-only seeded content for another wave. If approved, start with LT-010B. Do not add runtime AI, cloud, auth, hosting, paid APIs, backend routes, sync, learner data upload, profiles, or another language module.
```
