"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { PhraseCard } from "@/components/PhraseCard";
import { useAppState } from "@/components/useAppState";
import { categoryLabels, phrases } from "@/lib/polish-content";
import { recordPhrasePractice, replaceReview } from "@/lib/storage";
import { scheduleReview } from "@/lib/srs";
import type { PhraseCategory, PracticeLogType } from "@/lib/types";

const categories = Object.keys(categoryLabels) as PhraseCategory[];
type PhrasePracticeLogType = Extract<PracticeLogType, "used-at-home" | "correction" | "hesitation">;

export default function PhrasebookPage() {
  const [state, setState] = useAppState();
  const [category, setCategory] = useState<PhraseCategory | "all">("all");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalized = query.toLowerCase();
    return phrases.filter((phrase) => {
      const matchesCategory = category === "all" || phrase.category === category;
      const matchesQuery = !normalized || `${phrase.pl} ${phrase.en} ${phrase.tags.join(" ")}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="page-shell">
      <PageHeader title="Family Phrasebook" eyebrow={`${phrases.length} starter phrases`} />
      <section className="panel">
        <div className="grid gap-3 sm:grid-cols-[1fr_220px]">
          <input
            className="focus-ring min-h-11 rounded-md border border-black/15 bg-white px-3"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Polish, English, or tag"
          />
          <select
            className="focus-ring min-h-11 rounded-md border border-black/15 bg-white px-3"
            value={category}
            onChange={(event) => setCategory(event.target.value as PhraseCategory | "all")}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {categoryLabels[item]}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="mt-5 grid gap-3 md:grid-cols-2">
        {visible.map((phrase) => (
          <PhraseCard
            key={phrase.id}
            phrase={phrase}
            status={state?.phraseStatuses[phrase.id]}
            onStatus={(status) => {
              if (!state) return;
              setState(replaceReview(state, scheduleReview(state.reviews[phrase.id], status)));
            }}
            onLog={(type: PhrasePracticeLogType) => {
              if (!state) return;
              const note =
                type === "correction"
                  ? window.prompt("What correction did you get?", "") ?? undefined
                  : type === "hesitation"
                    ? window.prompt("What made you hesitate?", "") ?? undefined
                    : undefined;
              setState(recordPhrasePractice(state, { phraseId: phrase.id, phraseText: phrase.pl, type, note }));
            }}
          />
        ))}
      </section>
    </main>
  );
}
