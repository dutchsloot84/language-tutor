# Handoff Packet: Language Tutor Next Thread

Date: 2026-06-10

## Repo

- GitHub: https://github.com/dutchsloot84/language-tutor
- Local project path: `/Users/shaynevandersloot/Documents/Codex/language-tutor`
- Branch: `main`

## Current State

Language Tutor is a local-first Next.js app. Polish is the first language module, with a project-local Codex skill at `.codex/skills/teach-polish/`.

The app currently runs locally, works from a phone on the same Wi-Fi, and stores progress in browser `localStorage`.

No Supabase, no Vercel dependency, no auth, no paid API, and no AI calls are used at runtime.

## Current App Features

- Dashboard
- Today's Lesson
- Flashcards / Review
- Family Phrasebook
- Practice Mode
- Quiz Mode
- Progress page
- Glossary
- Settings / Data
- JSON export/import/reset
- Basic SRS
- Weak-area tracking
- Phrase status: `hard`, `known`, `needs-review`

## Content

- 120 starter Polish family/home phrases
- 5 sample daily lessons
- wife conversation scripts
- kid/parenting practice scripts
- starter glossary
- starter `/teach-polish` skill records

## Recent Fixes

- Quiz multiple-choice selections now persist per question and are visibly selected.
- Quiz submit now shows top-of-page feedback and per-question Correct/Review markers.
- Typed Polish answers are normalized:
  - lowercase
  - punctuation ignored
  - extra spacing ignored
  - Polish accents optional
- Ambiguous English prompts now accept natural gender variants, e.g. `Jesteś głodna?` and `Jesteś głodny?`.

## Important Design Direction

Keep the app local-first while improving the tutor loop. Do not jump to Supabase/Vercel yet.

The app should become a reusable language-learning shell:

- Polish module first
- Japanese module later
- other language modules possible

Keep Polish-specific teaching skill as `/teach-polish`. Later, consider shared skill formats plus language-specific skills such as `/teach-japanese`.

## Current Architecture

- `app/` - Next.js app routes
- `components/` - shared UI
- `lib/polish-content.ts` - seeded Polish phrases, lessons, glossary, scripts
- `lib/storage.ts` - localStorage persistence and legacy key migration
- `lib/srs.ts` - basic review scheduling
- `lib/types.ts` - app data model
- `.codex/skills/teach-polish/` - project-local Codex skill

## Key Product Insight

Right now the app is a local workbook. The `/teach-polish` skill is the teacher brain, but it is not wired into the app at runtime.

Best next step: connect them through local export/import, not cloud.

Codex Desktop can act as the tutor engine by reading app exports and generating lessons, drills, and progress reviews.

## Recommended Next Objective

Build a local adaptive tutor loop:

1. Add a learner snapshot export that summarizes:
   - completed lessons
   - known phrases
   - hard phrases
   - due reviews
   - quiz misses
   - weak categories
   - wife/kid usage logs
   - self-reported confidence
   - recent corrections

2. Add simple local logging:
   - "I used this at home"
   - "Wife corrected me"
   - "I hesitated on this"
   - "This felt easy/hard"

3. Add deterministic weak-area taxonomy:
   - gender agreement
   - cases / endings
   - phrase recall
   - listening/pronunciation
   - verbs / tense
   - repair phrases

4. Add `/teach-polish` handoff flow:
   - app exports learner snapshot JSON
   - Codex reads it using `/teach-polish`
   - Codex generates next lesson/drill/progress review
   - app can import generated lesson/drill JSON later

5. Improve quiz quality:
   - accepted answer variants
   - explicit prompts for masculine/feminine/formal/plural
   - "close but not quite" deterministic feedback
   - per-question explanation after submit

## Teaching Best Practices To Encode

- Comprehensible input: mostly understood, slightly above current level
- Retrieval practice: make the learner produce Polish from memory
- Spaced repetition: hard items return sooner
- Task-based learning: lessons map to real home situations
- Output plus feedback: log corrections and retry
- Interleaving: mix old and new material
- Noticing: short pattern explanations after examples
- Personal relevance: prioritize what is actually used with wife/kids

## Guardrails

- Do not require Supabase for v1/v1.5.
- Do not require paid APIs.
- Do not overbuild auth.
- Keep phone UX first.
- Preserve existing local progress when storage keys change.
- Keep Polish content practical, family-oriented, and A2-to-B1.
- Keep product identity generic: `Language Tutor`.

## Useful Commands

```bash
npm install
npm run dev
npm run dev:lan
npm run typecheck
npm run lint
npm run build
```

Phone on same Wi-Fi:

```text
http://YOUR_MAC_IP:3000
```

## Suggested First Commit In Next Thread

Create a learner snapshot/data-management upgrade:

- Add `lib/snapshot.ts`
- Add Settings button: Export Learner Snapshot
- Include summary stats and weak-area details
- Add README section explaining how to use the snapshot with `/teach-polish`
- Add a sample snapshot schema under `.codex/skills/teach-polish/resources/`

