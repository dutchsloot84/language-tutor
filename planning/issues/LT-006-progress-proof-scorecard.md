# LT-006: Progress Proof Scorecard

## Metadata
- Title: Progress Proof Scorecard
- Task ID: LT-006
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

The Progress page shows basic totals, but it does not yet prove whether the adaptive loop is working: misses should turn into retries, retries should turn into known phrases, and home usage should increase over time.

## Outcome

Progress shows a compact proof scorecard for the local learning loop using existing local evidence: quiz misses, review misses, miss-drill logs, phrase status changes, and `used-at-home` logs.

This slice should make the loop easier to inspect before adding generated drill import or local custom lesson storage.

## Scope
- In scope:
  - add a scorecard section to `/progress`
  - count recent quiz misses and review misses from existing logs/state
  - count `miss-drill` retries and how many were rated `known`
  - count `used-at-home` logs
  - show hard/needs-review phrase totals alongside known phrase progress
  - handle fresh or sparse local state gracefully
- Out of scope:
  - new app state fields unless a very small derived helper requires them
  - charts that require third-party visualization libraries
  - generated drill import
  - local custom lesson storage
  - runtime AI, cloud sync, auth, hosting, or paid APIs

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `planning/issues/LT-003-daily-miss-drill.md`
- `app/progress/page.tsx`
- `app/practice/misses/page.tsx`
- `lib/miss-drill.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `lib/types.ts`

## Acceptance Criteria
- [ ] `/progress` includes a scorecard that answers whether misses are being retried and resolved.
- [ ] Scorecard derives data from existing browser-local state and does not require imported/generated content.
- [ ] Scorecard shows at least: recent quiz miss count, review miss count, miss-drill retry count, miss-drill `known` count, `used-at-home` count, and hard/needs-review/known phrase totals.
- [ ] Fresh state displays useful zero/empty labels without crashing.
- [ ] Existing lesson history and phrase status sections keep working.
- [ ] No learner data leaves the browser.

## Data And Privacy Check
- Local-only data touched: existing phrase statuses, reviews, quiz scores, and practice logs.
- Export/import impact: none expected if this remains derived UI only.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - verify `/progress` on fresh/sparse state
  - create or use existing quiz/review/miss-drill/home-use logs and verify counts are plausible
- Browser smoke check:
  - `/progress`

## Docs To Update
- Update `README.md` only if the Progress workflow copy changes materially.
- Update `docs/project-status.md` after implementation if this becomes the new recently completed slice or changes the recommended next wave.

## Open Questions
- None. Prefer derived counts over storage changes for this slice.

## Slash Goal Prompt

```text
/goal Implement LT-006 Progress Proof Scorecard.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, planning/issues/LT-006-progress-proof-scorecard.md, app/progress/page.tsx, app/practice/misses/page.tsx, lib/miss-drill.ts, lib/storage.ts, lib/snapshot.ts, and lib/types.ts.

Add a compact local-only proof scorecard to /progress showing whether misses are turning into retries, retries are becoming known, and home usage is increasing. Prefer derived data from existing AppState and practice logs; do not add generated drill import, local lesson storage, runtime AI, cloud, auth, hosting, or paid API behavior.

Validate with npm run typecheck and npm run build. Browser-smoke /progress with sparse state and with at least one quiz/review/miss-drill/home-use signal when practical.
```
