# LT-001: Snapshot Preview Page

## Metadata
- Title: Snapshot Preview Page
- Task ID: LT-001
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

The learner snapshot export is useful, but the learner cannot inspect what Codex will receive before downloading it. That makes the local-first tutor loop less transparent.

## Outcome

Settings & Data shows a readable learner snapshot preview before export, using the same snapshot builder as the JSON download.

This is the first slice because the manual Codex loop depends on trustworthy tutor input. Do not build import, generation, API, or sync behavior here.

## Scope
- In scope:
  - preview summary counts
  - due review count/list excerpt
  - weak areas
  - recent quiz misses
  - recent review misses or hard/review phrase evidence
  - recent corrections/hesitations/notes
  - keep existing raw JSON export
- Out of scope:
  - importing generated lessons
  - runtime AI calls
  - cloud sync
  - auth
  - redesigning Settings navigation

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `lib/snapshot.ts`
- `app/settings/page.tsx`

## Acceptance Criteria
- [ ] Settings renders a snapshot preview from `createLearnerSnapshot(state)`.
- [ ] Preview handles empty/new learner state gracefully.
- [ ] Preview includes counts, top weak areas, due review excerpt, recent quiz misses, review-miss evidence, and recent corrections/notes.
- [ ] Preview shows phrase text for the top due/hard/review items so the learner can judge whether the snapshot is useful.
- [ ] Export Learner Snapshot still downloads schema `language-tutor-learner-snapshot-v1`.
- [ ] UI stays compact on phone.

## Data And Privacy Check
- Local-only data touched: learner snapshot derived from browser-local state.
- Export/import impact: export unchanged; preview shows the same derived data before download.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - verify preview content on a fresh or sparse local state
- Browser smoke check:
  - `/settings`

## Docs To Update
- Update `README.md` only if the Settings workflow copy changes materially.

## Slash Goal Prompt

```text
/goal Implement LT-001 Snapshot Preview Page.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, planning/issues/LT-001-snapshot-preview.md, lib/snapshot.ts, and app/settings/page.tsx.

Add a compact Settings & Data preview of the learner snapshot using createLearnerSnapshot(state). Keep it local-only and do not add import, API, cloud, auth, or sync behavior.

Validate with npm run typecheck and npm run build. Use a browser smoke check on /settings if practical.
```
