# LT-009: Commit-Worthy Lesson Workflow

## Metadata
- Title: Commit-Worthy Lesson Workflow
- Task ID: LT-009
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

Generated lessons can be useful, but the project needs a reviewable path from snapshot to `/teach-polish` lesson to committed seeded content before generated lessons are stored dynamically in browser state.

## Outcome

Document a commit-worthy lesson workflow that keeps lesson generation manual, inspectable, local-first, and aligned with the seeded `Lesson` shape in `lib/polish-content.ts`.

This slice creates the quality gate that should precede local custom lesson storage.

## Scope
- In scope:
  - add a workflow doc for snapshot-to-lesson-to-commit
  - add a lesson quality checklist
  - map `/teach-polish` lesson markdown sections to app-ready `Lesson` fields
  - name what evidence a generated lesson may cite
  - include a short review checklist for Polish content, app fit, and learner data provenance
  - include a commit/PR handoff checklist for generated lesson changes
- Out of scope:
  - app runtime changes
  - adding new lessons to `lib/polish-content.ts`
  - local custom lesson storage
  - lesson import UI
  - runtime AI, cloud sync, auth, hosting, or paid APIs

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/templates/codex-task-template.md`
- `.codex/skills/teach-polish/SKILL.md`
- `.codex/skills/teach-polish/LESSON-FORMAT.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `lib/types.ts`
- `lib/polish-content.ts`

## Acceptance Criteria
- [ ] A workflow doc exists under `docs/playbooks/` or `docs/` for committing generated lessons.
- [ ] Workflow starts from app snapshot or explicitly user-provided learning evidence.
- [ ] Workflow says not to invent learner records that the app or user did not provide.
- [ ] Checklist maps generated lesson content to required app `Lesson` fields: `id`, `title`, `situation`, `level`, `phraseIds`, `explanation`, `pattern`, `speakingDrill`, `challenge`, and `quiz`.
- [ ] Checklist requires human/Codex review before editing seeded content.
- [ ] Workflow keeps import/storage automation out of scope.

## Data And Privacy Check
- Local-only data touched: docs and optional skill workflow references.
- Export/import impact: none.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - none required for docs-only changes
- Manual:
  - cross-read workflow against `LESSON-FORMAT.md`, `lib/types.ts`, and `lib/polish-content.ts`
  - verify it preserves local-first manual Codex handoff
- Browser smoke check:
  - not required

## Docs To Update
- `README.md` if the Adaptive Tutor Loop or Add Lessons sections should link to the workflow.
- `.codex/skills/teach-polish/SKILL.md` only if the skill workflow should mention commit-worthy lesson review.

## Open Questions
- None. This should precede or at least gate LT-010.

## Slash Goal Prompt

```text
/goal Implement LT-009 Commit-Worthy Lesson Workflow.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, planning/issues/LT-009-commit-worthy-lesson-workflow.md, docs/templates/codex-task-template.md, .codex/skills/teach-polish/SKILL.md, .codex/skills/teach-polish/LESSON-FORMAT.md, .codex/skills/teach-polish/resources/learner-snapshot-schema.md, lib/types.ts, and lib/polish-content.ts.

Create a docs-only workflow for turning a local learner snapshot and /teach-polish lesson output into reviewable committed seeded content. Include a quality checklist, app Lesson field mapping, data provenance requirements, and a commit/PR handoff checklist. Do not edit app runtime files or add local custom lesson storage, lesson import, runtime AI, cloud, auth, hosting, or paid APIs.

Validate with a manual cross-read against LESSON-FORMAT.md, lib/types.ts, and lib/polish-content.ts.
```
