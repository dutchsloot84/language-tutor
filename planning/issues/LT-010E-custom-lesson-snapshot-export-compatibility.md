# LT-010E: Custom Lesson Snapshot And Export Compatibility

## Metadata
- Title: Custom Lesson Snapshot And Export Compatibility
- Task ID: LT-010E
- Trust label: `trust:agent-executable`
- Priority: P2 after LT-010D
- Owner: Shayne
- Status: blocked by `LT-010A`, `LT-010B`, and `LT-010D`

## Problem

Once local custom lessons can be completed, the tutor snapshot must explain that evidence without dumping unnecessary full local lesson content. Raw export/import must still preserve the actual custom lesson records and completion attempts.

The current snapshot resolves completed lessons only from seeded `lessons`, and `learner-snapshot-schema.md` does not describe custom lesson attempts.

## Outcome

Learner snapshots summarize custom lesson attempts clearly enough for `/teach-polish` planning, while manual raw JSON export/import remains the full local backup/transfer path for custom lesson records.

Use an additive `language-tutor-learner-snapshot-v1` extension for optional custom/local lesson source fields unless implementation discovers a breaking snapshot contract. If a breaking contract is required, stop and refine a snapshot schema version bump packet instead of silently changing the schema ID.

## Scope
- In scope:
  - update snapshot creation to resolve completed custom lesson title/situation/source
  - include a compact custom lesson summary or source marker in completed lesson entries
  - keep `language-tutor-learner-snapshot-v1` for additive optional custom/local source fields, or stop for a schema-version packet if a breaking change is required
  - keep full custom lesson content in raw `Export JSON`, not necessarily in learner snapshot
  - update Settings snapshot preview if custom lesson counts or labels are visible
  - update learner snapshot schema docs for any new fields or semantics
  - manually verify old state and raw export/import round trip
- Out of scope:
  - changing the raw export/import mechanism beyond preserving full `AppState`
  - adding cloud sync or cross-device automatic transfer
  - adding runtime AI
  - importing custom lessons if LT-010C is not already done
  - rendering/completion behavior if LT-010D is not already done

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `docs/playbooks/commit-worthy-lessons.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `lib/types.ts`
- `lib/storage.ts`
- `lib/snapshot.ts`
- `lib/polish-content.ts`
- `app/settings/page.tsx`

## Acceptance Criteria
- [ ] Learner snapshot completed lesson summaries resolve custom lesson titles/situations.
- [ ] Snapshot output distinguishes custom/local lessons from seeded lessons without exposing unnecessary full custom lesson content.
- [ ] Snapshot schema docs describe custom lesson attempt/source behavior.
- [ ] Snapshot schema remains `language-tutor-learner-snapshot-v1` for additive optional fields, unless the implementer stops and refines a breaking schema-version packet.
- [ ] Raw `Export JSON` includes custom lesson records and attempts.
- [ ] Raw `Import JSON` preserves custom lesson records and attempts.
- [ ] Old raw JSON with no custom lesson fields still imports safely.
- [ ] Settings snapshot preview remains readable on mobile and desktop if updated.

## Data And Privacy Check
- Local-only data touched: snapshot summaries, raw JSON backup content, settings preview.
- Export/import impact: significant; raw round trip and old import compatibility are required.
- Does learner data leave device? No automatic transfer. Learner may manually export/copy snapshots or raw JSON.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No, after LT-010A approval.

## Validation
- Automated:
  - `npm run setup:worktree` if dependencies are missing in the worktree
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - generate a snapshot with no custom lessons and verify existing shape remains safe
  - generate a snapshot after a custom lesson completion and verify custom/local summary behavior
  - export raw JSON, import it back, and verify custom lessons and attempts survive
  - import old raw JSON with no custom lesson field and verify snapshot generation still works
- Browser smoke check:
  - `/settings`

## Docs To Update
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `README.md` Adaptive Tutor Loop or Storage sections if user-facing export semantics change

## Open Questions
- Blocked until LT-010A, LT-010B, and LT-010D land.
- Should the additive snapshot summary include custom lesson `phraseIds`, or only title/situation/source and completion evidence?

## Slash Goal Prompt

```text
/goal Implement LT-010E Custom Lesson Snapshot And Export Compatibility.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, docs/backlog/local-first-roadmap.md, docs/playbooks/commit-worthy-lessons.md, planning/issues/LT-010E-custom-lesson-snapshot-export-compatibility.md, .codex/skills/teach-polish/resources/learner-snapshot-schema.md, lib/types.ts, lib/storage.ts, lib/snapshot.ts, lib/polish-content.ts, and app/settings/page.tsx.

Only proceed after LT-010A approval and after custom lesson storage/completion exist. Update snapshot summaries and schema docs so custom lesson attempts are tutor-useful without dumping unnecessary full local lesson content. Keep `language-tutor-learner-snapshot-v1` for additive optional fields unless a breaking schema-version packet is refined first. Preserve manual raw JSON export/import as the full local backup/transfer path. Do not add runtime AI, cloud, auth, hosting, sync, backend routes, paid APIs, or learner data upload.

Validate with npm run typecheck and npm run build. Manually test snapshots with and without custom lessons, old raw JSON import, raw export/import round trip, and browser-smoke /settings.
```
