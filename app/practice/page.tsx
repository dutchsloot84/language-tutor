"use client";

import Link from "next/link";
import { FilePlus, Mic, Sparkles, Target, UserRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { buildDailyMissDrillQueue } from "@/lib/miss-drill";
import { roleplayScripts } from "@/lib/polish-content";
import { recordPractice } from "@/lib/storage";

export default function PracticePage() {
  const [state, setState] = useAppState();
  const missDrillCount = state ? buildDailyMissDrillQueue(state).length : 0;
  const generatedDrills = state?.generatedDrills.items ?? [];

  function logPractice(title: string) {
    if (!state) return;
    setState(recordPractice(state, { type: "speaking", summary: `Practiced ${title}` }));
  }

  return (
    <main className="page-shell">
      <PageHeader title="Practice Speaking" eyebrow="Roleplay out loud">
        <Link href="/practice/misses" className="action-button">
          <Target size={18} /> Daily miss drill
        </Link>
      </PageHeader>
      <section className="panel mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Retry recent misses</h2>
          <p className="text-sm text-ink/65">A short local drill pulls quiz misses first, then review misses.</p>
        </div>
        <Link href="/practice/misses" className="secondary-button justify-start">
          <Target size={18} /> {missDrillCount ? `${missDrillCount} ready` : "Open drill"}
        </Link>
      </section>
      <section className="panel mb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Generated drills</h2>
            <p className="mt-1 text-sm text-ink/65">
              Import app-ready drill JSON from Settings, then retry the generated quick prompts here.
            </p>
          </div>
          <Link href="/settings" className="secondary-button justify-start">
            <FilePlus size={18} /> Import
          </Link>
        </div>

        {generatedDrills.length ? (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {generatedDrills.map(({ importedAt, drill }) => (
              <Link
                key={drill.id}
                href={`/practice/generated/${encodeURIComponent(drill.id)}`}
                className="focus-ring rounded-lg border border-black/10 bg-black/5 p-4 transition hover:bg-black/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="chip">{drill.level}</p>
                    <h3 className="mt-3 text-lg font-bold">{drill.title}</h3>
                    <p className="mt-1 text-sm text-ink/65">{drill.focus}</p>
                  </div>
                  <Sparkles className="shrink-0 text-moss" size={22} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink/60">
                  <span>{drill.quickPrompts.length} prompts</span>
                  <span>{drill.weakArea.replaceAll("-", " ")}</span>
                  <span>Imported {new Date(importedAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-4 rounded-md bg-black/5 p-3 text-sm text-ink/60">
            No generated drills imported yet. Use the LT-007 App-Ready JSON payload after a `/teach-polish` session.
          </p>
        )}
      </section>
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
