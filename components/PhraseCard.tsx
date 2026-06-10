"use client";

import { Check, CircleHelp, Flame, Home, MessageCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import type { Phrase, PhraseStatus, PracticeLogType } from "@/lib/types";

type PhrasePracticeLogType = Extract<PracticeLogType, "used-at-home" | "correction" | "hesitation">;
type PhraseLogDetails = {
  correctedPhraseText?: string;
  note?: string;
};

const statusLabel: Record<PhraseStatus, string> = {
  new: "New",
  known: "Known",
  hard: "Hard",
  "needs-review": "Needs review"
};

export function PhraseCard({
  phrase,
  status = "new",
  onStatus,
  onLog
}: {
  phrase: Phrase;
  status?: PhraseStatus;
  onStatus?: (status: PhraseStatus) => void;
  onLog?: (type: PhrasePracticeLogType, details?: PhraseLogDetails) => void;
}) {
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false);
  const [correctedPhraseText, setCorrectedPhraseText] = useState(phrase.pl);
  const [correctionNote, setCorrectionNote] = useState("");

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
      {onLog ? (
        <>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-black/10 pt-3">
            <button className="secondary-button px-2" onClick={() => onLog("used-at-home")} title="Log used at home">
              <Home size={16} /> Used
            </button>
            <button
              className="secondary-button px-2"
              onClick={() => {
                setCorrectedPhraseText(phrase.pl);
                setCorrectionNote("");
                setIsCorrectionOpen((current) => !current);
              }}
              title="Log wife correction"
            >
              <MessageCircle size={16} /> Corrected
            </button>
            <button className="secondary-button px-2" onClick={() => onLog("hesitation")} title="Log hesitation">
              <CircleHelp size={16} /> Hesitated
            </button>
          </div>
          {isCorrectionOpen ? (
            <form
              className="mt-3 rounded-md border border-moss/25 bg-moss/5 p-3"
              onSubmit={(event) => {
                event.preventDefault();
                const trimmedCorrection = correctedPhraseText.trim();
                if (!trimmedCorrection) return;
                onLog("correction", {
                  correctedPhraseText: trimmedCorrection,
                  note: correctionNote.trim() || undefined
                });
                setIsCorrectionOpen(false);
              }}
            >
              <label className="block text-xs font-bold uppercase text-ink/60" htmlFor={`corrected-${phrase.id}`}>
                Corrected Polish
              </label>
              <input
                id={`corrected-${phrase.id}`}
                className="focus-ring mt-1 min-h-11 w-full rounded-md border border-black/15 bg-white px-3 text-sm"
                value={correctedPhraseText}
                onChange={(event) => setCorrectedPhraseText(event.target.value)}
                required
              />
              <label className="mt-3 block text-xs font-bold uppercase text-ink/60" htmlFor={`correction-note-${phrase.id}`}>
                Context note
              </label>
              <textarea
                id={`correction-note-${phrase.id}`}
                className="focus-ring mt-1 min-h-20 w-full resize-y rounded-md border border-black/15 bg-white p-3 text-sm"
                value={correctionNote}
                onChange={(event) => setCorrectionNote(event.target.value)}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button className="action-button px-3" type="submit">
                  <Check size={16} /> Save correction
                </button>
                <button className="secondary-button px-3" type="button" onClick={() => setIsCorrectionOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : null}
        </>
      ) : null}
    </article>
  );
}
