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
6. Useful generated content is committed back to the repo.

## Recently Completed

- Local learner snapshot export.
- Practice logs for `used-at-home`, `correction`, and `hesitation`.
- Quiz miss logging with weak-area IDs.
- `/teach-polish` snapshot schema docs.
- README documentation for the adaptive tutor loop.

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

1. Snapshot preview page.
2. Review miss evidence.
3. Daily miss drill.
4. Copy Codex tutor prompt.
5. Wife correction retry flow.
6. Progress proof scorecard.
7. Generated drill format.
8. Generated drill import.
9. Commit-worthy lesson workflow.
10. Language module boundary.

## Expansion Gates

Create an ADR before adding:

- Supabase or any hosted sync.
- Vercel-specific runtime assumptions.
- Auth.
- OpenAI API calls.
- Backend secrets.
- Cross-device personal data transfer.
