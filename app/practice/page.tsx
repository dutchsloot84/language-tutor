"use client";

import { Mic, UserRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { roleplayScripts } from "@/lib/polish-content";
import { recordPractice } from "@/lib/storage";

export default function PracticePage() {
  const [state, setState] = useAppState();

  function logPractice(title: string) {
    if (!state) return;
    setState(recordPractice(state, { type: "speaking", summary: `Practiced ${title}` }));
  }

  return (
    <main className="page-shell">
      <PageHeader title="Practice Speaking" eyebrow="Roleplay out loud" />
      <section className="grid gap-4 lg:grid-cols-2">
        {roleplayScripts.map((script) => (
          <article key={script.id} className="panel">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="chip">{script.audience}</p>
                <h2 className="mt-3 text-xl font-bold">{script.title}</h2>
                <p className="mt-1 text-sm text-ink/65">{script.context}</p>
              </div>
              <UserRound className="text-moss" />
            </div>
            <div className="mt-4 space-y-2">
              {script.lines.map((line, index) => (
                <div key={`${script.id}-${index}`} className="rounded-md bg-black/5 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink/50">{line.speaker}</p>
                  <p className="mt-1 font-bold">{line.pl}</p>
                  <p className="text-sm text-ink/65">{line.en}</p>
                </div>
              ))}
            </div>
            <button className="action-button mt-4 w-full" onClick={() => logPractice(script.title)}>
              <Mic size={18} /> Mark practiced
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
