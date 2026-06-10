# Start Next Codex Thread

Use this prompt in a new Codex thread opened under the `language-tutor` project:

```text
We are continuing the Language Tutor project.

Repo:
/Users/shaynevandersloot/Documents/Codex/language-tutor

Please read:
- .codex/handoffs/2026-06-10-language-tutor-next.md
- README.md
- lib/types.ts
- lib/storage.ts
- app/settings/page.tsx
- .codex/skills/teach-polish/SKILL.md

Goal for this thread:
Improve the local-first adaptive tutor loop without adding Supabase, Vercel, auth, or paid APIs.

Start with:
1. Add a learner snapshot export that summarizes completed lessons, phrase statuses, review queue, quiz misses, weak areas, practice logs, and recent corrections/notes.
2. Add lightweight logging for "used at home," "wife corrected me," and "hesitated on this."
3. Update /teach-polish docs/resources so Codex can read the snapshot and generate a next lesson/drill plan.

Keep the app generic as Language Tutor. Polish is the first module; Japanese should be possible later.

Before editing, inspect the repo and propose the exact file structure changes. Then implement a small working local increment and verify it with typecheck/build.
```

