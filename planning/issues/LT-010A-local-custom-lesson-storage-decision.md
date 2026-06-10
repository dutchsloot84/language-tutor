# LT-010A: Local Custom Lesson Storage Decision

## Metadata
- Title: Local Custom Lesson Storage Decision
- Task ID: LT-010A
- Trust label: `trust:human-signoff`
- Priority: P1
- Owner: Shayne
- Status: `status:needs-decision`

## Problem

LT-009 created a commit-worthy lesson workflow for reviewing generated lessons before they become seeded content. The remaining decision is whether the app should also support browser-local custom lessons now, or whether the learner should continue committing only the best generated lessons to `lib/polish-content.ts` for another wave.

Starting LT-010 implementation without this decision would add storage complexity before there is clear owner intent.

## Outcome

Make an explicit owner decision:

- Proceed with browser-local custom lesson storage, starting with LT-010B.
- Or keep generated lessons commit-only for now and leave LT-010B through LT-010F parked.

## Scope
- In scope:
  - review LT-009 workflow usefulness after at least one generated lesson has been evaluated or committed
  - decide whether local custom lessons solve a real learner pain
  - choose the smallest allowed local custom lesson capability
  - confirm reserved ID and phrase handling expectations before storage work
- Out of scope:
  - implementing storage, import, rendering, snapshot, or docs changes
  - runtime AI lesson generation
  - cloud sync, auth, hosting, backend routes, paid APIs, or learner data upload
  - custom phrase storage unless a later packet is explicitly added

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `planning/issues/LT-010-local-custom-lesson-storage.md`
- `planning/issues/LT-009-commit-worthy-lesson-workflow.md`
- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `lib/types.ts`
- `lib/polish-content.ts`

## Acceptance Criteria
- [ ] Owner explicitly chooses `proceed` or `defer`.
- [ ] Before `proceed`, record evidence that LT-009 was used to evaluate or commit at least one generated lesson, or record an explicit owner waiver explaining why browser-local custom lessons should proceed before that proof.
- [ ] Before `proceed`, name one reviewed lesson example tied to snapshot or user evidence, the expected local practice behavior, and the expected proof signal in Progress or learner snapshot.
- [ ] If proceeding, owner confirms local custom lessons are browser-local only and manual raw JSON export/import is the only backup/transfer path.
- [ ] If proceeding, owner confirms custom lessons initially reference existing seeded phrase IDs only, unless a new custom phrase slice is created.
- [ ] If proceeding, owner confirms custom lesson IDs should not collide with seeded lesson IDs, preferably by using a reserved prefix.
- [ ] If deferring, roadmap/status docs keep LT-010 parked and point back to commit-worthy seeded lesson workflow.

## Data And Privacy Check
- Local-only data touched: none; decision only.
- Export/import impact: none until implementation.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, if the decision stays browser-local. Yes if the decision introduces sync, hosted storage, runtime AI, backend secrets, or learner data upload.

## Validation
- Automated:
  - none required
- Manual:
  - confirm decision is recorded in the issue packet, roadmap, project status, or PR notes
- Browser smoke check:
  - not required

## Docs To Update
- `docs/project-status.md` if LT-010 becomes an approved implementation wave.
- `docs/backlog/local-first-roadmap.md` if LT-010 is deferred or approved.

## Open Questions
- `status:needs-decision`: proceed with browser-local custom lessons now, or defer?
- Should local custom lessons initially be constrained to existing seeded phrases only?
- Should the app reserve `custom-lesson-` as the local custom lesson ID prefix?

## Slash Goal Prompt

```text
/goal Decide LT-010A Local Custom Lesson Storage.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010-local-custom-lesson-storage.md, planning/issues/LT-010A-local-custom-lesson-storage-decision.md, planning/issues/LT-009-commit-worthy-lesson-workflow.md, .codex/skills/teach-polish/LESSON-FORMAT.md, lib/types.ts, and lib/polish-content.ts.

Do not implement app behavior. Record whether browser-local custom lessons should proceed now or remain deferred behind commit-only seeded lesson workflow. If proceeding, confirm custom lessons stay local-only, use manual raw JSON export/import as the backup/transfer path, avoid seeded ID collisions, and initially reference existing seeded phrase IDs unless a custom phrase slice is created.
```
