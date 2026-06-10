# Project Status

Date: 2026-06-10

## Current Phase

Local-first proof loop.

The project is proving that a useful adaptive tutor can work with:

- browser-local storage
- manual JSON snapshot export
- Codex as the offline tutor engine
- project-local language skill records
- no Supabase
- no Vercel dependency
- no auth
- no paid runtime API calls

## Current Product Loop

1. Learner uses Language Tutor locally.
2. App records phrase statuses, review scheduling, quiz misses, weak areas, and practice logs.
3. Learner previews, exports, or copies a tutor packet from Settings & Data.
4. Codex reads the snapshot with `/teach-polish`.
5. Codex generates a next lesson, drill, progress review, or content update.
6. Useful generated lesson content passes `docs/playbooks/commit-worthy-lessons.md` before it is committed back to the repo.

## Recently Completed

- Local learner snapshot export.
- Practice logs for `used-at-home`, `correction`, and `hesitation`.
- Quiz miss logging with weak-area IDs.
- Daily miss drill for recent quiz misses and review misses.
- `/teach-polish` snapshot schema docs.
- README documentation for the adaptive tutor loop.
- Commit-worthy lesson workflow for reviewing generated lessons before seeded-content commits.

## Active Constraints

- Keep the app generic as `Language Tutor`.
- Polish remains the first module.
- Japanese should remain possible later.
- Do not add hosted infrastructure yet.
- Do not add API cost yet.
- Keep phone UX practical.
- Preserve local progress across storage changes.

## Next Proof Milestone

Prove the adaptive loop over several real study sessions:

- export snapshots
- preview what Codex will read
- generate next drills
- prioritize quiz misses and review misses
- log real home usage and corrections as secondary context
- manually add only the most useful generated content

## Current Top Backlog

1. Progress proof scorecard.
2. Generated drill format.
3. Generated drill import.
4. Local custom lesson storage decision.
5. Language module boundary.

## Recommended Next Implementation Wave

1. LT-006 Progress Proof Scorecard.
2. LT-007 Generated Drill Format.
3. LT-008 Generated Drill Import after LT-007 lands.
4. Decide LT-010 Local Custom Lesson Storage only after the commit-worthy lesson workflow is proven useful in review.

LT-010 Local Custom Lesson Storage should stay `status:needs-decision` until the commit-worthy lesson workflow is proven and the owner chooses browser-local custom lessons over continuing commit-only seeded lessons.

## Expansion Gates

Create an ADR before adding:

- Supabase or any hosted sync.
- Vercel-specific runtime assumptions.
- Auth.
- OpenAI API calls.
- Backend secrets.
- Cross-device personal data transfer.
