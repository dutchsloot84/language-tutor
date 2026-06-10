# Resource: Learner Snapshot Schema

## Source
- Type: App-generated learner snapshot
- Filename: `language-tutor-learner-snapshot-YYYY-MM-DD.json`
- Schema ID: `language-tutor-learner-snapshot-v1`
- Date added: 2026-06-10

## Purpose
Use this snapshot as the bridge between the local-first Language Tutor app and `/teach-polish`. It is a tutor-facing summary, not a raw backup.

## Top-Level Fields

- `schema`: snapshot schema ID.
- `generatedAt`: export timestamp.
- `app`: product name, active module, language code, and local state version.
- `learner`: local learner profile and goals.
- `summary`: counts for completed lessons, phrase statuses, due reviews, quiz attempts, average score, and streak.
- `completedLessons`: lesson IDs, titles, situations, completion dates, scores, and notes.
- `phraseStatuses`: grouped `known`, `hard`, and `needsReview` phrase lists.
- `reviewQueue`: due phrases to practice now.
- `reviewMisses`: repeated flashcard miss evidence grouped by phrase ID, including phrase text, translation, language, weak-area ID, current review status, total count, SRS misses, logged misses, and latest logged miss timestamp.
- `quiz.scoresByLesson`: historical score arrays by lesson ID.
- `quiz.recentMisses`: recent missed prompts with expected answer, learner answer, and weak-area ID.
- `weakAreas`: stable weak-area IDs with labels and counts.
- `practiceLogs`: recent local practice events.
- `recentCorrectionsAndNotes`: correction, hesitation, and note logs.
- `notes`: app notes keyed by phrase or record ID.
- `tutorHints`: deterministic app-side suggestions.

## Practice Log Types

- `lesson`: lesson completion.
- `flashcard`: SRS review action. Hard and needs-review outcomes include `language`, `phraseId`, `phraseText`, `weakArea`, and `reviewOutcome`.
- `quiz`: quiz submission, often with `quizMisses`.
- `speaking`: roleplay or speaking practice.
- `note`: freeform note.
- `used-at-home`: learner used a phrase in real life.
- `correction`: wife corrected a phrase or usage.
- `hesitation`: learner hesitated and wants more retrieval practice.

## Weak-Area IDs

- `gender-agreement`
- `cases-endings`
- `phrase-recall`
- `listening-pronunciation`
- `verbs-tense`
- `repair-phrases`
- `home-usage`
- `confidence-hesitation`

## Tutor Use

1. Start with `recentCorrectionsAndNotes`, `quiz.recentMisses`, `reviewMisses`, `phraseStatuses.hard`, and `reviewQueue`.
2. Select one weak area for the next drill unless the learner asks for a full lesson.
3. Reuse known and due phrases as retrieval prompts before adding new material.
4. Keep the plan home-focused and practical.
5. End with one use-it-today challenge and one thing to log back in the app.
