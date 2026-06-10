# Commit-Worthy Lesson Workflow

Purpose: turn a local learner snapshot and `/teach-polish` lesson draft into reviewable seeded content without adding runtime AI, lesson import, browser-local custom lesson storage, cloud sync, auth, hosting, or paid APIs.

This is the LT-009 quality gate before LT-010 Local Custom Lesson Storage. LT-010 must make its own storage, migration, export/import, and snapshot decisions.

## When To Use This

Use this workflow when a `/teach-polish` lesson looks useful enough to become committed seeded app content in `lib/polish-content.ts`.

Do not use this workflow for:

- storing generated lessons in browser state
- importing lesson JSON into the app
- calling an AI model from app runtime
- syncing learner data off-device
- adding auth, hosted storage, deployment assumptions, or secret handling

## Source Inputs

A commit-worthy lesson must start from at least one explicit source:

- app-generated learner snapshot: `language-tutor-learner-snapshot-YYYY-MM-DD.json`
- copied Codex tutor prompt from Settings & Data, including its embedded snapshot
- user-provided correction, self-report, or home-practice note
- existing `/teach-polish` skill record under `.codex/skills/teach-polish/`
- existing seeded app content in `lib/polish-content.ts`

Do not invent learner records. If a lesson includes general curriculum judgment rather than learner-specific evidence, label it as general tutor judgment and keep it secondary to snapshot evidence.

Preferred learner evidence order:

1. `recentCorrectionsAndNotes`, especially wife corrections with `correctedPhraseText`
2. `quiz.recentMisses`
3. `reviewMisses`
4. `phraseStatuses.hard`
5. `reviewQueue`
6. `weakAreas`
7. `used-at-home`, `hesitation`, and note practice logs
8. completed lesson history and quiz score patterns

## Workflow

1. Export or copy a fresh learner packet from Settings & Data.
2. Read `.codex/skills/teach-polish/SKILL.md`, `.codex/skills/teach-polish/LESSON-FORMAT.md`, and `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`.
3. Ask `/teach-polish` for one focused lesson, not a curriculum batch.
4. Save the skill-side lesson draft under `.codex/skills/teach-polish/lessons/YYYY-MM-DD-short-title.md`.
5. Review the lesson against the quality checklist below.
6. Map the lesson to the app `Lesson` shape before touching `lib/polish-content.ts`.
7. Add or reuse `Phrase` records deliberately. A `Lesson` can only reference phrase IDs that exist in `phrases`.
8. Commit only when the provenance, Polish content, app field mapping, and validation notes are clear.

## Quality Checklist

A lesson is commit-worthy only when all checks pass:

- It teaches one practical home/family situation.
- It uses 5-10 target phrases unless there is a clear review reason to reuse a slightly larger existing phrase set.
- It prioritizes snapshot-backed misses, hard phrases, corrections, hesitations, or due reviews.
- It includes one reusable pattern, not a broad grammar lecture.
- It has a short speaking drill that can be done aloud without app changes.
- It ends with one use-it-today challenge and one thing to log back in the app.
- It reuses existing seeded phrases when they fit the evidence.
- Any new phrases are practical, pronounceable for the learner, categorized, tagged, and sourced.
- Quiz prompts test the actual lesson target, not unrelated vocabulary.
- Polish spelling, diacritics, translations, and tone have been reviewed.
- The lesson stays generic to Language Tutor in app-facing content; Polish-specific teaching logic remains in Polish content or `/teach-polish`.

## Data Provenance Checklist

Before committing seeded content, record the lesson basis in the PR description or verification note:

- Snapshot filename or copied prompt date.
- Snapshot `schema` and `generatedAt` when available.
- Evidence fields used, such as `quiz.recentMisses`, `reviewMisses`, `phraseStatuses.hard`, `reviewQueue`, `weakAreas`, or `recentCorrectionsAndNotes`.
- User-provided correction or note, if used.
- Existing skill records consulted, if any.
- Existing phrase IDs reused.
- New phrase IDs added, with why they are needed.

If the source is sensitive, summarize the evidence category rather than pasting private learner text into the PR. Keep learner data local and reviewable.

## App Lesson Field Mapping

Use this mapping before editing `lib/polish-content.ts`.

| App field | Source from `/teach-polish` lesson | Commit rule |
| --- | --- | --- |
| `id` | Derived from title/situation | Stable kebab-case string, usually `lesson-...`; do not reuse an existing ID. |
| `title` | `# Lesson: Title` | Short app-facing title, not a provenance note. |
| `situation` | `## Situation` | One sentence describing the real-life context. |
| `level` | Tutor judgment from difficulty | Must be `A2`, `A2+`, or `B1`; prefer the lowest honest level. |
| `phraseIds` | `## Target Phrases` plus existing/new `Phrase` records | Every ID must exist in `phrases`; use 5-10 where practical. |
| `explanation` | `## Short Explanation` | Short, learner-facing, and directly tied to the situation. |
| `pattern` | `## Pattern to Notice` | One reusable pattern the learner can say today. |
| `speakingDrill` | `## Speaking Drill` | Array of short prompts; each should be speakable from the lesson phrases. |
| `challenge` | `## Use This Today` and `## Log Afterward` | One concrete home-use challenge, with logging intent if useful. |
| `quiz` | `## Mini Quiz` | `QuizQuestion[]` with stable question IDs, valid `type`, `prompt`, `answer`, and optional `choices` or `acceptedAnswers`. |

The skill lesson's `Pronunciation`, `Note`, and `Review Flashcards` material does not map directly onto `Lesson`. Put pronunciation and notes on `Phrase` records when adding new phrases. Use review-flashcard intent to choose `phraseIds`; do not add a separate lesson field.

## Phrase And Quiz Rules

When adding phrases:

- `id` should follow the existing `pNNN` sequence.
- `pl`, `en`, and `pron` are required.
- `category` must be one of the existing `PhraseCategory` values in `lib/types.ts`.
- `tags` should support filtering and future module boundaries.
- `note` is optional and should explain usage, tone, or a learner-relevant contrast.

When adding quiz questions:

- `id` should be unique within the lesson, such as `q1`, `q2`, `q3`.
- `type` must be `multiple-choice`, `translate-pl-en`, `translate-en-pl`, or `missing-word`.
- `answer` must be exact enough for scoring.
- `acceptedAnswers` can support natural variants.
- `choices` are required for useful multiple-choice and missing-word prompts.

## Review Lenses

Run these checks before finalizing a lesson-content PR:

- Dependency Mapper: confirm this lesson workflow gates LT-010 and does not depend on LT-007 or LT-008.
- Local-First Architecture Reviewer: confirm the change is manual Codex/local-first and adds no API, cloud, auth, hosting, sync, secrets, or runtime AI.
- Learning Loop Reviewer: confirm the lesson turns learner evidence into practice and proof, not generic curriculum churn.
- Content Workflow Reviewer: confirm the lesson is practical, reviewable, source-backed, and app-ready.
- Storage Migration Reviewer: confirm no storage migration is introduced; LT-010 must handle migrations separately.
- Validation Enforcer: confirm docs-only changes use manual cross-read, while runtime/content changes run the appropriate app checks.

## Commit And PR Handoff Checklist

Before commit:

- Skill-side lesson draft is saved if the content came from `/teach-polish`.
- Seeded lesson edits are limited to `lib/polish-content.ts` unless docs or skill records need a matching note.
- New phrase IDs, lesson IDs, and quiz IDs are unique.
- Every `phraseIds` entry resolves to an existing `Phrase`.
- Provenance is summarized without exposing unnecessary learner details.
- Out-of-scope automation remains out of the diff.

For a docs-only workflow change:

- Manually cross-read against `LESSON-FORMAT.md`, `learner-snapshot-schema.md`, `lib/types.ts`, `lib/polish-content.ts`, README Adaptive Tutor Loop, and the issue packet.
- Do not claim `npm run typecheck`, `npm run build`, or browser checks unless they ran.

For a seeded lesson-content change:

- Run `npm run setup:worktree` first in a fresh worktree if dependencies are missing.
- Run `npm run typecheck`.
- Run `npm run build` when lesson rendering or route behavior could be affected.
- Add manual notes for the lesson screen and quiz path when practical.

PR description should include:

- learner evidence category and snapshot date
- skill-side lesson record path, if created
- app fields changed
- validation run, with pass/fail/skipped checks
- explicit note that no storage migration, import UI, runtime AI, cloud, auth, hosting, or paid API was added
