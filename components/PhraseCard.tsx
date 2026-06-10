"use client";

import { Check, Flame, RotateCcw } from "lucide-react";
import type { Phrase, PhraseStatus } from "@/lib/types";

const statusLabel: Record<PhraseStatus, string> = {
  new: "New",
  known: "Known",
  hard: "Hard",
  "needs-review": "Needs review"
};

export function PhraseCard({
  phrase,
  status = "new",
  onStatus
}: {
  phrase: Phrase;
  status?: PhraseStatus;
  onStatus?: (status: PhraseStatus) => void;
}) {
  return (
    <article className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-ink">{phrase.pl}</p>
          <p className="mt-1 text-sm text-ink/70">{phrase.en}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-sky">{phrase.pron}</p>
        </div>
        <span className="chip shrink-0">{statusLabel[status]}</span>
      </div>
      {phrase.note ? <p className="mt-3 rounded-md bg-honey/15 p-3 text-sm text-ink/75">{phrase.note}</p> : null}
      {onStatus ? (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button className="secondary-button px-2" onClick={() => onStatus("hard")} title="Mark hard">
            <Flame size={16} /> Hard
          </button>
          <button className="secondary-button px-2" onClick={() => onStatus("needs-review")} title="Mark needs review">
            <RotateCcw size={16} /> Review
          </button>
          <button className="secondary-button px-2" onClick={() => onStatus("known")} title="Mark known">
            <Check size={16} /> Known
          </button>
        </div>
      ) : null}
    </article>
  );
}
