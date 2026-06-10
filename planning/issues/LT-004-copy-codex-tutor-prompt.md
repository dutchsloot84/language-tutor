# LT-004: Copy Codex Tutor Prompt

## Metadata
- Title: Copy Codex Tutor Prompt
- Task ID: LT-004
- Trust label: `trust:agent-executable`
- Priority: P1
- Owner: Shayne

## Problem

Manual Codex is currently the right tutor engine for this personal local app, but the workflow still requires the learner to manually explain what Codex should do with an exported snapshot.

## Outcome

Settings & Data provides a copyable tutor prompt packet that includes concise instructions for Codex plus the current learner snapshot. This keeps AI out of the app runtime while reducing friction.

## Scope
- In scope:
  - generate a copyable text prompt from local state
  - include snapshot JSON or compact snapshot summary
  - instruct Codex to use `/teach-polish`
  - ask for one next drill, lesson, or progress review
  - keep download export behavior
- Out of scope:
  - OpenAI API calls
  - in-app generation
  - sending data over network
  - clipboard permission complexity beyond a normal user click
  - importing generated content

## Source Docs And Files
- `AGENTS.md`
- `README.md`
- `docs/project-status.md`
- `docs/playbooks/agentic-development.md`
- `docs/backlog/local-first-roadmap.md`
- `.codex/skills/teach-polish/SKILL.md`
- `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`
- `lib/snapshot.ts`
- `app/settings/page.tsx`

## Acceptance Criteria
- [ ] Settings has a `Copy Codex Tutor Prompt` action.
- [ ] The copied text names `/teach-polish` and asks Codex to read the snapshot.
- [ ] The copied text includes enough learner snapshot data to generate one targeted next action.
- [ ] The action is clearly local/manual and does not call an API.
- [ ] If clipboard write fails, the prompt can still be viewed and manually copied.
- [ ] UI remains compact on phone.

## Data And Privacy Check
- Local-only data touched: learner snapshot.
- Export/import impact: none beyond making snapshot easier to use manually.
- Does learner data leave device? No, unless the human manually pastes it into Codex.
- Cloud/API/auth involved? No.
- ADR needed before implementation? No.

## Validation
- Automated:
  - `npm run typecheck`
  - `npm run build`
- Manual:
  - click/copy prompt from Settings
  - verify text includes instructions and current snapshot data
  - verify fallback view/manual copy path
- Browser smoke check:
  - `/settings`

## Docs To Update
- Update `README.md` Adaptive Tutor Loop section to mention the copyable tutor prompt.
- Update `.codex/skills/teach-polish/resources/app-progress-import-notes.md` only if the recommended prompt flow changes skill behavior.

## Open Questions
- None. Prefer a textarea fallback over a toast-only clipboard action.

## Slash Goal Prompt

```text
/goal Implement LT-004 Copy Codex Tutor Prompt.

Read AGENTS.md, README.md, docs/project-status.md, docs/playbooks/agentic-development.md, planning/issues/LT-004-copy-codex-tutor-prompt.md, .codex/skills/teach-polish/SKILL.md, .codex/skills/teach-polish/resources/learner-snapshot-schema.md, lib/snapshot.ts, and app/settings/page.tsx.

Add a local-only Settings action that creates a copyable Codex tutor prompt from the learner snapshot. Do not add runtime API calls, backend routes, cloud sync, auth, or generated content import.

Validate with npm run typecheck and npm run build. Browser-smoke /settings and verify the copied/fallback prompt text.
```
