# Resource: App Progress Import Notes

## Source
- Type: Local app learner snapshot JSON export
- Link or local path: generated from Settings & Data in the app as `language-tutor-learner-snapshot-YYYY-MM-DD.json`
- Date added: 2026-06-10

## Why It Matters
The app stores phrase statuses, review scheduling, quiz scores, weak areas, lesson attempts, and practice logs. The learner snapshot summarizes that local state for Codex so `/teach-polish` can recommend the next lesson, drill, or progress review without needing cloud sync.

## Useful Notes
- Prefer snapshot files with `schema: language-tutor-learner-snapshot-v1`.
- `phraseStatuses.known`, `phraseStatuses.hard`, and `phraseStatuses.needsReview` contain phrase text, category, tags, due date, and miss count.
- `reviewQueue` is already sorted for immediate practice.
- `quiz.recentMisses` names the prompt, expected answer, learner answer when available, and weak-area ID.
- `weakAreas` stores stable IDs and counts. Use it to choose drills, but confirm with recent misses and logs.
- `practiceLogs` are the best lightweight source for what actually happened at home.
- `recentCorrectionsAndNotes` should strongly influence the next speaking drill.
- `tutorHints` are deterministic app-side suggestions; treat them as inputs, not as a finished lesson plan.

## Phrases to Import
- Import hard and needs-review phrases first.
- Mix in due review phrases before adding many new phrases.
- Favor phrases marked `used-at-home`, `correction`, or `hesitation` in practice logs.

## Follow-up
When a snapshot is available, create one of:

- a short next lesson with 5-10 target phrases
- a weak-area drill
- a progress review using `PROGRESS-REVIEW-FORMAT.md`
