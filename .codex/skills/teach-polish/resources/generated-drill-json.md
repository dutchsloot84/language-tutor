# Resource: Generated Drill JSON

## Source
- Type: `/teach-polish` generated drill payload
- Schema ID: `language-tutor-generated-drill-v1`
- Date added: 2026-06-10

## Purpose
Generated drill records are markdown files for human review that also contain one fenced JSON payload for a future local import flow. This resource defines the JSON shape only. It does not add app runtime import behavior.

The payload should help Language Tutor close the loop:

1. Evidence shows a miss, hesitation, correction, or due review.
2. `/teach-polish` generates one focused drill.
3. The learner retries the weak prompt.
4. The app can later record proof through local practice logs.

## Required Fields

- `schema`: Must be `language-tutor-generated-drill-v1`.
- `generatedAt`: ISO timestamp for when the drill was generated.
- `app`: Object with `name`, `module`, and `language`. Use `Language Tutor`, `polish`, and `pl` for Polish drills.
- `id`: Stable kebab-case drill ID, unique within generated drill records.
- `title`: Human-readable title.
- `level`: `A2`, `A2+`, or `B1`.
- `weakArea`: Stable weak-area ID from `learner-snapshot-schema.md` when possible.
- `sourceEvidence`: Non-empty array citing snapshot fields, skill records, or user-provided corrections.
- `focus`: One sentence naming the learner behavior the drill improves.
- `tinyExplanation`: Short explanation shown before practice.
- `examples`: Array of Polish examples with `pl`, `en`, and `pron`.
- `quickPrompts`: Array of prompt objects with `id`, `prompt`, `expected`, and optional accepted answers.
- `speakingTask`: Object with `instruction` and optional `durationMinutes`.
- `useToday`: One real-life challenge.
- `retryPlan`: Object explaining how missed prompts should be retried.
- `proofOfUse`: Object naming the success signal and optional local log suggestion.
- `reviewCards`: Array of Polish-English cards for quick review.

## Optional Fields

- `app.stateVersion`: Local app state version if the generating snapshot included it.
- `description`: A short summary for import previews.
- `tags`: Search/filter tags such as `repair`, `kitchen`, or `wife-conversations`.
- `sourceEvidence[].quote`: Short source excerpt when the source is user-provided and safe to store.
- `examples[].sourceRef`: Source path or snapshot reference for individual phrases.
- `quickPrompts[].weakArea`: Override if one prompt targets a secondary weak area.
- `quickPrompts[].hint`: A small hint to show after an incorrect attempt.
- `quickPrompts[].acceptedAnswers`: Alternate acceptable Polish answers.
- `speakingTask.audience`: `wife`, `kids`, or `self`.
- `proofOfUse.logSuggestion`: Suggested local practice log fields using existing app log types where practical.

## Safe Parser Expectations For LT-008

- Find the fenced JSON block under `## App-Ready JSON`; do not parse arbitrary markdown as JSON.
- Parse with `JSON.parse`; never use `eval` or code execution.
- Require a top-level object, not an array or primitive.
- Require the exact `schema` value before trusting the payload.
- Reject malformed JSON, missing required fields, empty `sourceEvidence`, empty `quickPrompts`, or prompts without expected answers.
- Treat unknown optional fields as non-fatal so the format can grow.
- Ignore markdown prose during import; it is for review.
- Keep import manual and local. Do not upload generated drills or learner evidence.

## Source Evidence Types

Use one or more:

- `snapshot-field`: A field from `language-tutor-learner-snapshot-v1`, such as `quiz.recentMisses`, `reviewMisses`, `reviewQueue`, `phraseStatuses.hard`, or `recentCorrectionsAndNotes`.
- `skill-record`: A local record under `.codex/skills/teach-polish/`.
- `user-correction`: A correction supplied directly by the user in the current Codex session.
- `user-request`: A direct user request for a topic or weak area.

Do not invent learner progress. When a drill is a format sample rather than a real personalized drill, cite skill records or docs and state that no learner snapshot was used.

## Field Alignment Notes

- `weakArea` should align with `WeakAreaId` in `lib/types.ts` when possible.
- `proofOfUse.logSuggestion.type` should use existing local practice log types such as `miss-drill`, `used-at-home`, `correction`, or `hesitation` when practical.
- `quickPrompts[].expected` is for a future local checker or review screen; keep it short and exact.
- `reviewCards` are review hints, not a new SRS storage shape in this slice.
