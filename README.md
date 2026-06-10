# Language Tutor

A local-first language learning app. The first module is Polish, backed by a project-local Codex skill, `/teach-polish`, for practical A2-to-B1 family Polish.

The first milestone is intentionally local and simple: run on your MacBook, open in a browser, complete a sample lesson, review flashcards, take a quiz, and keep progress saved in the same browser.

## What Is Included

- Next.js + TypeScript mobile-first PWA
- Polish as the first language module
- Local browser persistence with `localStorage`
- Dashboard, Today’s Lesson, Flashcards, Phrasebook, Practice, Daily Miss Drill, Quiz, Progress, Glossary, Settings/Data
- 120 starter family/home Polish phrases
- 5 sample daily lessons
- Basic spaced repetition scheduling
- Phrase status: `hard`, `known`, `needs-review`
- Quiz scoring and weak-area tracking
- Daily miss drill that retries recent quiz misses before review misses
- JSON export/import/reset
- Learner snapshot export for Codex tutor planning
- Project-local Codex skill at `.codex/skills/teach-polish`

## Run Locally on macOS

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful checks:

```bash
npm run typecheck
npm run build
```

## Use From Your Phone on the Same Wi-Fi

Start the server so other devices on your network can reach it:

```bash
npm run dev:lan
```

Find your Mac’s local IP:

```bash
ipconfig getifaddr en0
```

On your phone, open:

```text
http://YOUR_MAC_IP:3000
```

Your phone and Mac browser will keep separate local progress unless you export/import JSON from Settings & Data.

## Language Modules

The current app content is Polish-first. The repo is named and structured as `Language Tutor` so future modules can add Japanese or other languages without changing the product identity.

Near-term module direction:

- Polish: practical family/home Polish, A2 to B1
- Japanese: future module, likely separate curriculum, scripts, writing system support, and `/teach-japanese` skill

## `/teach-polish` Skill

The project-local skill lives here:

```text
.codex/skills/teach-polish/
```

It includes:

- `SKILL.md`
- lesson, drill, glossary, phrasebook, mission, learning record, resource, pronunciation, and progress review formats
- starter mission
- starter lesson
- starter repair drill
- starter phrasebook and glossary
- initial handoff/progress review

In future Codex sessions, ask to use `/teach-polish` for lessons, drills, weak-area reviews, or app progress handoffs.

### Optional Global Install Later

This repo does not modify global skill folders. To install globally later on your Mac, copy the skill folder:

```bash
mkdir -p ~/.codex/skills
cp -R .codex/skills/teach-polish ~/.codex/skills/teach-polish
```

If your Codex Desktop setup uses agents instead, use:

```bash
mkdir -p ~/.agents/skills
cp -R .codex/skills/teach-polish ~/.agents/skills/teach-polish
```

Prefer the project-local copy while iterating, then copy globally once the workflow feels right.

## Agentic Development Workflow

This repo includes a lightweight Codex/agent workflow inspired by the Field IQ project, scaled down for a personal local-first tutor.

Start with:

```text
AGENTS.md
docs/project-status.md
docs/playbooks/agentic-development.md
docs/backlog/local-first-roadmap.md
```

Use:

- `docs/templates/refined-issue-template.md` for bounded improvement slices
- `docs/templates/codex-task-template.md` for implementation handoffs
- `docs/templates/adr-template.md` before cloud, auth, API, sync, or hosting decisions
- `planning/issues/` for execution-ready work
- `planning/verification/` for durable validation notes when a slice needs them

Current recommended next slice:

```text
planning/issues/LT-001-snapshot-preview.md
```

## Learning Records

Skill records are markdown files under:

```text
.codex/skills/teach-polish/learning-records/
.codex/skills/teach-polish/lessons/
.codex/skills/teach-polish/drills/
.codex/skills/teach-polish/glossary/
.codex/skills/teach-polish/missions/
.codex/skills/teach-polish/progress-reviews/
.codex/skills/teach-polish/phrasebook/
.codex/skills/teach-polish/resources/
```

App progress is browser-local and can be exported from Settings & Data as JSON. A future `/teach-polish` session can read that export and create a progress review or next lesson plan.

## Adaptive Tutor Loop

Use Settings & Data to export `language-tutor-learner-snapshot-YYYY-MM-DD.json`. This is a compact tutor-facing summary, not the full raw app backup.

The snapshot includes:

- completed lessons and quiz scores
- known, hard, and needs-review phrases
- due review queue
- repeated flashcard review misses
- recent quiz misses
- weak areas
- practice logs, including used-at-home, wife-correction, and hesitation events
- recent corrections, notes, and tutor hints

Recommended local loop:

1. Use the app normally on your Mac or phone.
2. In Settings & Data, export the learner snapshot.
3. Ask Codex to use `/teach-polish` and read the snapshot.
4. Have Codex generate the next lesson, drill, or progress review under `.codex/skills/teach-polish/`.
5. Add app-ready lessons manually for now in `lib/polish-content.ts`.

Use raw `Export JSON` only for backup, restore, or moving browser state between devices.

## Add Lessons

App lessons are currently seeded in:

```text
lib/polish-content.ts
```

Add a new `Lesson` with:

- `id`
- `title`
- `situation`
- `level`
- `phraseIds`
- `explanation`
- `pattern`
- `speakingDrill`
- `challenge`
- `quiz`

For skill-side lesson records, copy `.codex/skills/teach-polish/LESSON-FORMAT.md` into `.codex/skills/teach-polish/lessons/YYYY-MM-DD-title.md`.

## Storage Tradeoffs

V1 uses `localStorage` because it is free, instant, and enough for a local MVP.

Tradeoffs:

- Good: no account, no server, no database, works immediately
- Limitation: each browser/device has separate state
- Mitigation: export/import JSON
- Future: move to IndexedDB for larger records, SQLite for file-backed local data, or Supabase for family sync

## Optional Free or Cheap Deployment

Do not make hosting a blocker. Once the local app is useful:

- Vercel free tier: easiest for Next.js
- Netlify or Cloudflare Pages: good static/web hosting options
- GitHub Pages: possible if the app is exported as a static site
- Tailscale/private access: useful if you want private access without public auth
- Supabase later: useful for family profiles, sync, auth, and shared records

## V2 Roadmap

- Family/kid learner profiles
- IndexedDB or SQLite-backed local database
- Better SRS tuning and daily review queue
- Audio pronunciation recordings
- Wife correction log flow
- Kid-friendly games and phrase routines
- App-to-skill progress export summary
- Optional private sync through Tailscale or Supabase
- Installable production PWA build with offline lesson cache
