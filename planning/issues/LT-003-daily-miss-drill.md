# LT-003: Daily Miss Drill

## Metadata
- Title: Daily Miss Drill
- Task ID: LT-003
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

The app records quiz misses, hard flashcards, and needs-review phrases, but there is no focused local practice surface that turns those reliable signals into a short daily drill.

## Outcome

Add a small deterministic drill experience that prioritizes recent quiz misses and repeated review misses. The drill should be usable without Codex, API calls, or imported generated content.

## Scope
- In scope:
  - derive a short miss-focused queue from existing local state
  - include recent quiz misses first
  - include hard/needs-review review misses next
  - show prompt, expected answer or phrase, and quick self-rating
  - log drill completion locally
- Out of scope:
  - AI-generated drills
  - imported drill JSON
  - new lesson authoring
  - changing SRS algorithm broadly
  - Supabase, Vercel, auth, runtime API calls

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `lib/snapshot.ts`
- `lib/storage.ts`
- `lib/types.ts`
- `app/review/page.tsx`
- `app/practice/page.tsx`
- `components/PhraseCard.tsx` if phrase rendering is reused

## Acceptance Criteria
- [ ] A user can open a daily miss drill from an existing route or a small new route.
- [ ] Drill queue prioritizes recent quiz misses before review misses.
- [ ] Drill queue is deterministic and local-only.
- [ ] Empty state explains that quiz misses and review misses will populate the drill.
- [ ] Completing/rating drill items writes local practice logs.
- [ ] The slice does not introduce generated content import or runtime AI.

## Data And Privacy Check
- Local-only data touched: quiz miss logs, review item statuses, practice logs.
- Export/import impact: drill logs should appear in raw state and learner snapshots.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - verify empty drill state on fresh local state
  - create or simulate misses through quiz/review, then verify drill appears
- Browser smoke check:
  - changed route or entry point

## Docs To Update
- Update `README.md` if a new route or named workflow is introduced.
- Update `docs/project-status.md` only if the completed slice changes the recommended next slice.

## Open Questions
- Prefer adding this to `/review` first unless implementation is cleaner as `/practice/misses` or `/miss-drill`.

## Slash Goal Prompt

```text
/goal Implement LT-003 Daily Miss Drill.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, planning/issues/LT-003-daily-miss-drill.md, lib/snapshot.ts, lib/storage.ts, lib/types.ts, app/review/page.tsx, and app/practice/page.tsx.

Add a small local-only drill experience that prioritizes recent quiz misses and review misses. Do not add AI generation, imports, cloud, auth, or API calls.

Validate with npm run typecheck and npm run build. Browser-smoke the changed drill route or entry point.
```
