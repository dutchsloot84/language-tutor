# LT-010F: Custom Lesson Docs And Workflow

## Metadata
- Title: Custom Lesson Docs And Workflow
- Task ID: LT-010F
- Trust label: `trust:agent-executable`
- Priority: P2 with LT-010C for import checklist; P3 after LT-010E for full workflow docs
- Owner: Shayne
- Status: blocked by LT-010A approval; import checklist must land with or before LT-010C

## Problem

If browser-local custom lessons become supported, the README and lesson workflow docs need to explain when to store a lesson locally, when to commit seeded content, and how raw export/import protects custom lessons. Without this, custom lesson storage could weaken the commit-worthy content standard.

## Outcome

Update user-facing and agent-facing docs so browser-local custom lessons remain practical, reviewable, source-backed, and local-first.

This docs work has two phases: the local custom lesson import checklist must land with or before LT-010C, while the full user-facing workflow should wait until the implemented behavior from LT-010C through LT-010E exists.

## Scope
- In scope:
  - add a local custom lesson import checklist to `docs/playbooks/commit-worthy-lessons.md` with or before LT-010C
  - document local custom lesson support in README only after it exists
  - update `docs/playbooks/commit-worthy-lessons.md` to distinguish committed seeded lessons from browser-local custom lessons
  - document manual raw JSON export/import backup expectations for custom lessons
  - update project status or roadmap after implementation waves land
  - preserve the LT-009 quality gate for generated content
- Out of scope:
  - app runtime changes
  - new lesson storage behavior
  - runtime AI, cloud sync, auth, hosting, backend routes, paid APIs, or learner data upload

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `planning/issues/LT-010-local-custom-lesson-storage.md`
- implemented LT-010B through LT-010E verification notes, if present

## Acceptance Criteria
- [ ] README explains how local custom lessons work, only after the feature exists.
- [ ] README keeps committed seeded lessons and browser-local custom lessons conceptually separate.
- [ ] The local custom lesson import checklist exists before or with LT-010C and requires provenance/review metadata.
- [ ] Commit-worthy lesson workflow states generated lessons still need review before either commit or local import.
- [ ] Docs explain that manual raw `Export JSON` and `Import JSON` are the backup/transfer path for custom lessons.
- [ ] Docs explicitly preserve local-first constraints: no runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, or learner data upload.

## Data And Privacy Check
- Local-only data touched: docs only.
- Export/import impact: docs describe the implemented raw JSON behavior.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - none required for docs-only changes
- Manual:
  - cross-read docs against implemented custom lesson behavior and LT-009 workflow
  - verify docs do not claim unsupported import/render/snapshot behavior
- Browser smoke check:
  - not required

## Docs To Update
- `README.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/project-status.md`

## Open Questions
- The import checklist is blocked only by LT-010A approval and should land with or before LT-010C.
- Full README/status workflow docs are blocked until custom lesson behavior exists. Do not document unsupported behavior.

## Slash Goal Prompt

```text
/goal Implement LT-010F Custom Lesson Docs And Workflow.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010-local-custom-lesson-storage.md, and the implemented LT-010B through LT-010E diffs or verification notes.

Update docs to explain supported browser-local custom lesson behavior, manual raw JSON export/import backup/transfer expectations, and the difference between committed seeded lessons and local custom lessons. Do not document unimplemented behavior. Do not edit app runtime files or add runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, or learner data upload.

Validate with manual cross-read only unless docs include code or command changes.
```
