# Agentic Development Playbook

Purpose: make Language Tutor easy to develop with Codex or other agentic AI without overbuilding the process.

## Core Model

Use Codex as a local execution partner inside a bounded workflow.

Do use Codex for:

- reading the repo and tightening a slice
- implementing small local-first features
- generating Polish lessons and drills from snapshots
- writing tests, docs, and verification notes
- reviewing diffs and finding risk

Do not use Codex as:

- the source of truth for learner progress
- an automatic runtime tutor in the app
- a reason to add cloud services early
- a substitute for validation

## Standard Flow

1. Capture the problem or improvement idea.
2. Refine it into one bounded issue or execution packet.
3. Identify the source docs and likely files.
4. Implement the smallest useful change.
5. Run the smallest truthful validation.
6. Update docs or skill resources when behavior changes.
7. Record follow-ups in the roadmap instead of expanding scope mid-slice.

## Planning Mode

Use planning mode when the request is vague, strategic, cross-cutting, or cost/privacy-related.

Planning output should be one of:

- refined issue under `planning/issues/`
- backlog update
- ADR under `docs/decisions/`
- `status:needs-decision`

Planning should not edit app behavior unless the user explicitly asks to continue into implementation.

## Execution Mode

Use execution mode when there is a clear goal, scope, acceptance criteria, and validation path.

Before editing, confirm:

- target slice
- in-scope and out-of-scope
- likely files
- validation commands
- any storage migration risk

If the slice touches local learner data, check `lib/types.ts`, `lib/storage.ts`, `lib/snapshot.ts`, and Settings export/import behavior together.

In a fresh Codex worktree, run `npm run setup:worktree` before validation or dev-server work. Worktrees do not copy ignored dependency folders like `node_modules`; the setup command no-ops when dependencies are already present.

## Local-First Guardrail

Default architecture:

- browser local state
- JSON export/import
- project-local skill records
- Codex Desktop as the human-in-the-loop tutor engine

Expansion requires an ADR when it introduces:

- hosted data
- auth
- runtime AI
- API keys
- recurring cost
- personal learner data leaving the device

## Snapshot-To-Tutor Workflow

When using `/teach-polish` with an app snapshot:

1. Read `.codex/skills/teach-polish/SKILL.md`.
2. Read `.codex/skills/teach-polish/resources/learner-snapshot-schema.md`.
3. Read the exported snapshot.
4. Prioritize corrections, hesitations, recent quiz misses, hard phrases, and due reviews.
5. Generate one lesson, one drill, or one progress review.
6. End with one thing to say at home and one thing to log back in the app.

Before committing a generated lesson as seeded app content, use `docs/playbooks/commit-worthy-lessons.md`.

## Validation Ladder

Use the smallest truthful proof:

- fresh worktree: `npm run setup:worktree`
- docs-only: manual cross-read
- type-only model changes: `npm run typecheck`
- UI or route changes: `npm run typecheck` and `npm run build`
- storage import/export changes: add manual export/import check
- visible UI changes: add browser smoke check when practical

Never claim a check passed if it did not run.

## Definition Of Done

A slice is done when:

- the requested outcome works
- scope stayed bounded
- docs or skill resources were updated if needed
- relevant validation ran or gaps were named
- final handoff includes changed surfaces, commands, risks, and follow-ups

## Improvement Drill

When pressure-testing a feature idea, answer:

- What learner pain does this solve?
- Can it work entirely local-first?
- What data does it need?
- Does it belong in app runtime, `/teach-polish`, or both?
- What is the smallest version?
- What would prove it works?
- What would make us stop and write an ADR first?
