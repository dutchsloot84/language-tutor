"use client";

import { useMemo, useState } from "react";
import { Eye, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { phrases } from "@/lib/polish-content";
import { recordPractice, replaceReview } from "@/lib/storage";
import { isDue, scheduleReview } from "@/lib/srs";
import type { PhraseStatus } from "@/lib/types";

export default function ReviewPage() {
  const [state, setState] = useAppState();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const due = useMemo(() => {
    if (!state) return [];
    return Object.values(state.reviews)
      .filter(isDue)
      .map((item) => phrases.find((phrase) => phrase.id === item.phraseId))
      .filter(Boolean);
  }, [state]);
  const phrase = due[index % Math.max(1, due.length)];

  function rate(status: PhraseStatus) {
    if (!state || !phrase) return;
    const reviewed = scheduleReview(state.reviews[phrase.id], status);
    const next = recordPractice(replaceReview(state, reviewed), {
      type: "flashcard",
      summary: `${phrase.pl} marked ${status}`
    });
    setState(next);
    setRevealed(false);
    setIndex((current) => current + 1);
  }

  return (
    <main className="page-shell">
      <PageHeader title="Flashcards" eyebrow="Spaced review" />
      {!phrase ? (
        <section className="panel text-center">
          <RotateCcw className="mx-auto text-moss" size={36} />
          <h2 className="mt-3 text-xl font-bold">No cards due right now</h2>
          <p className="mt-2 text-ink/65">Mark phrases hard or needs review from the lesson or phrasebook to bring them back sooner.</p>
        </section>
      ) : (
        <section className="mx-auto max-w-xl rounded-lg border border-black/10 bg-white p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wide text-moss">
            Card {index + 1} of {due.length}
          </p>
          <div className="mt-6 min-h-52">
            <p className="text-3xl font-bold text-ink">{phrase.pl}</p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-sky">{phrase.pron}</p>
            {revealed ? (
              <div className="mt-6 rounded-md bg-black/5 p-4">
                <p className="text-lg font-semibold">{phrase.en}</p>
                {phrase.note ? <p className="mt-2 text-sm text-ink/70">{phrase.note}</p> : null}
              </div>
            ) : null}
          </div>
          {!revealed ? (
            <button className="action-button w-full" onClick={() => setRevealed(true)}>
              <Eye size={18} /> Reveal answer
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button className="secondary-button px-2" onClick={() => rate("hard")}>Hard</button>
              <button className="secondary-button px-2" onClick={() => rate("needs-review")}>Review</button>
              <button className="action-button px-2" onClick={() => rate("known")}>Known</button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
