# Resource: App Progress Import Notes

## Source
- Type: Local app JSON export
- Link or local path: generated from Settings & Data in the app
- Date added: 2026-06-10

## Why It Matters
The app stores phrase statuses, review scheduling, quiz scores, weak areas, lesson attempts, and practice logs. A future Codex session can use an exported JSON file to recommend the next lesson or drill.

## Useful Notes
- `phraseStatuses` maps phrase IDs to `new`, `known`, `hard`, or `needs-review`.
- `weakAreas` stores quiz misses and should drive future drills.
- `practiceLogs` are the best lightweight source for what actually happened.

## Phrases to Import
- Import hard and needs-review phrases first.

## Follow-up
When app export is available, summarize it into a progress review.
