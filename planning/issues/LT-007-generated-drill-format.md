# LT-007: Generated Drill Format

## Metadata
- Title: Generated Drill Format
- Task ID: LT-007
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

`/teach-polish` can create useful markdown drills, but there is no stable app-ready generated drill shape. Building import UI before the format is settled would make the local-first handoff brittle.

## Outcome

The project-local `/teach-polish` skill has a stable generated drill format that is human-reviewable in markdown and includes a fenced JSON payload suitable for a future local import slice.

This slice standardizes Codex output only. It does not make the app import or render generated drills.

## Scope
- In scope:
  - update `.codex/skills/teach-polish/DRILL-FORMAT.md` with an app-ready generated drill contract
  - add or update a resource doc describing the generated drill JSON fields and validation expectations
  - create one sample generated drill under `.codex/skills/teach-polish/drills/`
  - include source snapshot/evidence references in the sample so the drill is reviewable
  - keep the format practical for short A2-to-B1 home Polish drills
- Out of scope:
  - app import UI
  - app runtime rendering of generated drills
  - localStorage schema changes
  - automatic Codex generation from inside the app
  - cloud sync, auth, hosting, or paid APIs

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `.codex/skills/teach-polish/SKILL.md`
- `.codex/skills/teach-polish/DRILL-FORMAT.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `.codex/skills/teach-polish/resources/app-progress-import-notes.md`
- `.codex/skills/teach-polish/drills/`
- `lib/types.ts` for future app field alignment only

## Acceptance Criteria
- [ ] `DRILL-FORMAT.md` defines the human-readable drill sections plus an app-ready fenced JSON payload.
- [ ] A resource doc names required JSON fields, optional fields, version/schema identifier, and safe parser expectations for a future app import.
- [ ] One sample generated drill exists and follows the format.
- [ ] Sample drill cites snapshot data, skill records, or user-provided corrections rather than inventing learner progress.
- [ ] Format remains Polish-skill-specific while preserving the app identity as generic `Language Tutor`.
- [ ] No app runtime files are changed.

## Data And Privacy Check
- Local-only data touched: project-local skill docs and sample drill record.
- Export/import impact: none in this slice; it prepares a future import format only.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - none required for docs/skill-record-only changes
- Manual:
  - cross-read `DRILL-FORMAT.md`, the generated drill resource doc, and the sample drill for field consistency
  - verify the sample JSON is valid JSON if copied from its fenced block
- Browser smoke check:
  - not required

## Docs To Update
- `.codex/skills/teach-polish/SKILL.md` only if the drill-generation workflow changes.
- `README.md` only if the user-facing manual Codex loop description changes.

## Open Questions
- None. Make this precede LT-008.

## Slash Goal Prompt

```text
/goal Implement LT-007 Generated Drill Format.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, planning/issues/LT-007-generated-drill-format.md, .codex/skills/teach-polish/SKILL.md, .codex/skills/teach-polish/DRILL-FORMAT.md, .codex/skills/teach-polish/resources/learner-snapshot-schema.md, and .codex/skills/teach-polish/resources/app-progress-import-notes.md.

Standardize the /teach-polish generated drill format with human-readable markdown and an app-ready fenced JSON payload, then add one sample generated drill record. Do not edit app runtime files, add import UI, add localStorage fields, or introduce runtime AI, cloud, auth, hosting, or paid APIs.

Validate with a manual cross-read of the format/resource/sample, and verify the sample fenced JSON parses as valid JSON.
```
