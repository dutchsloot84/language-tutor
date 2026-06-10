# LT-002: Review Miss Evidence

## Metadata
- Title: Review Miss Evidence
- Task ID: LT-002
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

Quiz misses and review misses are currently the most reliable adaptive signals. The app tracks review item misses internally through SRS, but review misses are not clearly promoted into practice logs, snapshot summaries, or tutor-facing evidence.

## Outcome

Flashcard review outcomes produce clear local evidence when a phrase is marked `hard` or `needs-review`, and the learner snapshot makes repeated review misses easy for Codex to use.

## Scope
- In scope:
  - enrich flashcard review logging for `hard` and `needs-review`
  - include phrase ID, phrase text, status, and weak-area hint in logs
  - improve snapshot review-miss summary if needed
  - keep existing SRS scheduling behavior
- Out of scope:
  - redesigning the Review page
  - daily drill UI
  - generated lessons or imports
  - runtime AI, API calls, cloud sync, auth

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `lib/srs.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `app/review/page.tsx`
- `lib/types.ts`

## Acceptance Criteria
- [ ] Marking a flashcard `hard` logs a practice event with phrase ID, language, weak-area ID, and phrase text.
- [ ] Marking a flashcard `needs-review` logs a practice event with phrase ID, language, weak-area ID, and phrase text.
- [ ] Marking a flashcard `known` keeps existing positive review behavior and does not inflate weak-area counts.
- [ ] Learner snapshot exposes review-miss evidence clearly enough for Codex to find repeated problem phrases.
- [ ] Existing raw state import/export remains compatible with old state.

## Data And Privacy Check
- Local-only data touched: review practice logs, review item miss counts, learner snapshot.
- Export/import impact: snapshot becomes more useful; raw JSON stays compatible.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - mark one phrase hard and one phrase needs-review in `/review`
  - confirm recent activity/snapshot evidence contains the phrase IDs or text
- Browser smoke check:
  - `/review`
  - `/settings` if snapshot preview already exists

## Docs To Update
- Update `.codex/skills/teach-polish/resources/learner-snapshot-schema.md` if the snapshot shape changes.
- Update `README.md` only if user-facing workflow changes.

## Open Questions
- None. Use `phrase-recall` as the weak-area ID for hard/review flashcard misses unless a better deterministic mapping already exists in code.

## Slash Goal Prompt

```text
/goal Implement LT-002 Review Miss Evidence.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, planning/issues/LT-002-review-miss-evidence.md, lib/srs.ts, lib/storage.ts, lib/snapshot.ts, app/review/page.tsx, and lib/types.ts.

Make flashcard hard/needs-review outcomes first-class local evidence for the learner snapshot. Preserve existing SRS behavior and do not add cloud, auth, API, generated drill import, or daily drill UI.

Validate with npm run typecheck and npm run build. Browser-smoke /review, and /settings if snapshot preview exists.
```
