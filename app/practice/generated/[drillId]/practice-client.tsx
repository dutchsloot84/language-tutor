"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, Home, RotateCcw, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { recordPractice } from "@/lib/storage";
import type { PhraseStatus, PracticeLogType } from "@/lib/types";

function ratingLabel(status: PhraseStatus) {
  if (status === "known") return "Got it";
  if (status === "hard") return "Still hard";
  return "Retry";
}

function asPracticeLogType(value: unknown): PracticeLogType | undefined {
  const allowed: PracticeLogType[] = [
    "lesson",
    "flashcard",
    "miss-drill",
    "quiz",
    "speaking",
    "note",
    "used-at-home",
    "correction",
    "hesitation"
  ];
  return typeof value === "string" && allowed.includes(value as PracticeLogType) ? (value as PracticeLogType) : undefined;
}

export function GeneratedDrillPracticeClient({ drillId }: { drillId: string }) {
  const [state, setState] = useAppState();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [ratedCount, setRatedCount] = useState(0);
  const [proofLogged, setProofLogged] = useState(false);
  const record = useMemo(() => state?.generatedDrills.items.find((item) => item.drill.id === drillId), [drillId, state]);
  const drill = record?.drill;
  const prompt = drill?.quickPrompts[index % Math.max(1, drill.quickPrompts.length)];

  function rate(status: PhraseStatus) {
    if (!state || !drill || !prompt) return;

    const next = recordPractice(state, {
      type: "miss-drill",
      language: "pl",
      phraseText: prompt.expected,
      weakArea: prompt.weakArea ?? drill.weakArea,
      reviewOutcome: status,
      summary: `${ratingLabel(status)} on generated drill: ${prompt.expected}`,
      note: `${drill.title} - ${prompt.prompt}`
    });

    setState(next);
    setRatedCount((current) => current + 1);
    setRevealed(false);
    setIndex((current) => current + 1);
  }

  function logProofOfUse() {
    if (!state || !drill) return;
    const suggestion = drill.proofOfUse.logSuggestion;
    const type = asPracticeLogType(suggestion?.type) ?? "used-at-home";

    setState(
      recordPractice(state, {
        type,
        language: "pl",
        weakArea: drill.weakArea,
        summary: suggestion?.summary ?? drill.useToday,
        note: drill.proofOfUse.successSignal
      })
    );
    setProofLogged(true);
  }

  return (
    <main className="page-shell">
      <PageHeader title={drill?.title ?? "Generated Drill"} eyebrow="Imported local drill">
        <Link href="/practice" className="secondary-button">
          Practice
        </Link>
      </PageHeader>

      {!state ? (
        <section className="panel">
          <p className="text-sm text-ink/65">Loading local generated drills...</p>
        </section>
      ) : !drill ? (
        <section className="panel text-center">
          <RotateCcw className="mx-auto text-moss" size={36} />
          <h2 className="mt-3 text-xl font-bold">Generated drill not found</h2>
          <p className="mx-auto mt-2 max-w-md text-ink/65">
            This drill may not be imported in this browser. Import the app-ready JSON from Settings, then try again.
          </p>
          <Link href="/settings" className="action-button mt-4">
            Import a drill
          </Link>
        </section>
      ) : (
        <>
          <section className="panel mb-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="chip">{drill.level}</span>
                  <span className="chip">{drill.weakArea.replaceAll("-", " ")}</span>
                  <span className="chip">{drill.schema}</span>
                </div>
                <p className="mt-3 text-sm text-ink/70">{drill.focus}</p>
                <p className="mt-2 text-sm text-ink/70">{drill.tinyExplanation}</p>
              </div>
              <Sparkles className="shrink-0 text-moss" size={28} />
            </div>
          </section>

          {prompt ? (
            <section className="mx-auto max-w-xl rounded-lg border border-black/10 bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wide text-moss">
                  Prompt {index + 1} of {drill.quickPrompts.length}
                </p>
                <span className="chip">generated drill</span>
              </div>

              <div className="mt-6 min-h-56">
                <p className="text-sm font-bold uppercase tracking-wide text-ink/50">
                  {(prompt.weakArea ?? drill.weakArea).replaceAll("-", " ")}
                </p>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-ink">{prompt.prompt}</h2>
                {prompt.hint ? <p className="mt-3 text-sm text-ink/65">Hint: {prompt.hint}</p> : null}

                {revealed ? (
                  <div className="mt-6 rounded-md bg-black/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-sky">Expected</p>
                    <p className="mt-1 text-xl font-bold">{prompt.expected}</p>
                    {prompt.acceptedAnswers?.length ? (
                      <p className="mt-2 text-sm text-ink/70">Also accepted: {prompt.acceptedAnswers.join(", ")}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {!revealed ? (
                <button className="action-button w-full" onClick={() => setRevealed(true)}>
                  <Eye size={18} /> Reveal answer
                </button>
              ) : (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button className="secondary-button px-2" onClick={() => rate("hard")}>
                    Still hard
                  </button>
                  <button className="secondary-button px-2" onClick={() => rate("needs-review")}>
                    Retry
                  </button>
                  <button className="action-button px-2" onClick={() => rate("known")}>
                    Got it
                  </button>
                </div>
              )}
            </section>
          ) : null}

          <section className="panel mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold">Use today</h2>
              <p className="mt-2 text-sm text-ink/70">{drill.useToday}</p>
              <button className="secondary-button mt-4 justify-start" onClick={logProofOfUse} disabled={proofLogged}>
                {proofLogged ? <CheckCircle2 size={18} /> : <Home size={18} />}
                {proofLogged ? "Logged proof" : "Log proof of use"}
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold">Retry plan</h2>
              <p className="mt-2 text-sm text-ink/70">{drill.retryPlan.retryPrompt}</p>
              <p className="mt-3 text-sm font-semibold text-ink/70">{ratedCount} prompts logged this session</p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
