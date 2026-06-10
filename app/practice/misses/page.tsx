"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, RotateCcw, Target } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { buildDailyMissDrillQueue } from "@/lib/miss-drill";
import { recordPractice, replaceReview } from "@/lib/storage";
import { scheduleReview } from "@/lib/srs";
import type { PhraseStatus } from "@/lib/types";

function ratingLabel(status: PhraseStatus) {
  if (status === "known") return "Got it";
  if (status === "hard") return "Still hard";
  return "Retry";
}

export default function DailyMissDrillPage() {
  const [state, setState] = useAppState();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [ratedCount, setRatedCount] = useState(0);
  const queue = useMemo(() => (state ? buildDailyMissDrillQueue(state) : []), [state]);
  const item = queue[index % Math.max(1, queue.length)];

  function rate(status: PhraseStatus) {
    if (!state || !item) return;
    const nextBase =
      item.source === "review" && item.phraseId && state.reviews[item.phraseId]
        ? replaceReview(state, scheduleReview(state.reviews[item.phraseId], status))
        : state;
    const next = recordPractice(nextBase, {
      type: "miss-drill",
      language: "pl",
      phraseId: item.phraseId,
      phraseText: item.phraseText ?? item.expected,
      weakArea: item.weakArea,
      reviewOutcome: status,
      summary: `${ratingLabel(status)} on ${item.source} miss: ${item.expected}`,
      note: item.prompt
    });

    setState(next);
    setRatedCount((current) => current + 1);
    setRevealed(false);
    setIndex((current) => current + 1);
  }

  return (
    <main className="page-shell">
      <PageHeader title="Daily Miss Drill" eyebrow="Local retry loop">
        <Link href="/practice" className="secondary-button">
          Practice
        </Link>
      </PageHeader>

      {!item ? (
        <section className="panel text-center">
          <RotateCcw className="mx-auto text-moss" size={36} />
          <h2 className="mt-3 text-xl font-bold">No misses ready yet</h2>
          <p className="mx-auto mt-2 max-w-md text-ink/65">
            Quiz misses and review misses will populate this drill after you submit quizzes or mark flashcards hard or needs review.
          </p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
            <Link href="/quiz" className="action-button">
              Take a quiz
            </Link>
            <Link href="/review" className="secondary-button">
              Review flashcards
            </Link>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-xl rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-moss">
              Card {index + 1} of {queue.length}
            </p>
            <span className="chip capitalize">{item.source} miss</span>
          </div>

          <div className="mt-6 min-h-56">
            <p className="text-sm font-bold uppercase tracking-wide text-ink/50">{item.weakArea.replaceAll("-", " ")}</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-ink">{item.prompt}</h2>
            {item.translation && item.source === "review" ? <p className="mt-3 text-sm text-ink/65">{item.missCount} recorded misses</p> : null}

            {revealed ? (
              <div className="mt-6 rounded-md bg-black/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-sky">Expected</p>
                <p className="mt-1 text-xl font-bold">{item.expected}</p>
                {item.translation && item.translation !== item.expected ? <p className="mt-2 text-sm text-ink/70">{item.translation}</p> : null}
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
      )}

      <section className="panel mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Today’s miss queue</h2>
          <p className="text-sm text-ink/65">Recent quiz misses appear first, followed by review misses from flashcards.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-ink/70">
          {ratedCount ? <CheckCircle2 className="text-moss" size={18} /> : <Target className="text-moss" size={18} />}
          <span>{ratedCount} logged this session</span>
        </div>
      </section>
    </main>
  );
}
