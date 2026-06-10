# LT-005: Wife Correction Retry Flow

## Metadata
- Title: Wife Correction Retry Flow
- Task ID: LT-005
- Trust label: `trust:agent-executable`
- Priority: P2
- Owner: Shayne

## Problem

The app can log that a wife correction happened, but it does not capture enough detail to turn that correction into a useful retry later.

## Outcome

Correction logs capture the original phrase, corrected phrase, context note, and retry timing so `/teach-polish` and local review can use real feedback more effectively.

## Scope
- In scope:
  - extend correction log shape safely
  - capture corrected Polish text
  - capture optional context note
  - capture or derive a retry date
  - include correction details in learner snapshot
  - keep old correction logs compatible
- Out of scope:
  - wife/family profile system
  - audio recording
  - push notifications
  - cloud sync
  - runtime AI feedback

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `components/PhraseCard.tsx`
- `app/phrasebook/page.tsx`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`

## Acceptance Criteria
- [ ] Logging a correction prompts for corrected Polish text.
- [ ] Logging a correction allows an optional context note.
- [ ] Correction log includes phrase ID, original phrase text, corrected phrase text, note, created time, and retry date or retry hint.
- [ ] Old correction logs still load without crashing.
- [ ] Learner snapshot includes recent correction details.
- [ ] No cloud/API/auth behavior is added.

## Data And Privacy Check
- Local-only data touched: practice logs and snapshot.
- Export/import impact: raw JSON includes richer correction logs; snapshot includes correction details.
- Does learner data leave device? No.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - log a correction from Phrasebook
  - verify recent activity or snapshot includes corrected text
  - verify old logs without corrected text still render/load
- Browser smoke check:
  - `/phrasebook`
  - `/settings` if snapshot preview exists

## Docs To Update
- Update `.codex/skills/teach-polish/resources/learner-snapshot-schema.md` if correction fields are added to the documented snapshot.
- Update `README.md` only if the visible workflow changes materially.

## Open Questions
- Default retry date should be tomorrow unless existing SRS utilities make a better deterministic date easy.

## Slash Goal Prompt

```text
/goal Implement LT-005 Wife Correction Retry Flow.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, planning/issues/LT-005-wife-correction-retry-flow.md, lib/types.ts, lib/storage.ts, lib/snapshot.ts, components/PhraseCard.tsx, app/phrasebook/page.tsx, and .codex/skills/teach-polish/resources/learner-snapshot-schema.md.

Make correction logs capture corrected Polish, optional context, and retry timing while preserving old local state. Do not add profiles, audio, cloud, auth, or runtime AI.

Validate with npm run typecheck and npm run build. Browser-smoke /phrasebook, and /settings if snapshot preview exists.
```
