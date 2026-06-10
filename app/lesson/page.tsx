"use client";

import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { PhraseCard } from "@/components/PhraseCard";
import { useAppState } from "@/components/useAppState";
import { lessons, phrases } from "@/lib/polish-content";
import { recordPractice, replaceReview } from "@/lib/storage";
import { scheduleReview } from "@/lib/srs";

export default function LessonPage() {
  const [state, setState] = useAppState();
  const completedIds = new Set(state?.lessonAttempts.map((attempt) => attempt.lessonId) ?? []);
  const lesson = lessons.find((item) => !completedIds.has(item.id)) ?? lessons[0];
  const lessonPhrases = lesson.phraseIds.map((id) => phrases.find((phrase) => phrase.id === id)).filter(Boolean);

  function completeLesson() {
    if (!state) return;
    let next = recordPractice(
      {
        ...state,
        lessonAttempts: state.lessonAttempts.some((attempt) => attempt.lessonId === lesson.id)
          ? state.lessonAttempts
          : [{ lessonId: lesson.id, completedAt: new Date().toISOString() }, ...state.lessonAttempts]
      },
      { type: "lesson", summary: `Completed ${lesson.title}` }
    );

    for (const phraseId of lesson.phraseIds) {
      const item = next.reviews[phraseId];
      if (item) next = replaceReview(next, scheduleReview(item, "needs-review"));
    }
    setState(next);
  }

  return (
    <main className="page-shell">
      <PageHeader title={lesson.title} eyebrow="Today’s lesson" />
      <section className="panel">
        <p className="text-sm font-semibold text-moss">{lesson.situation}</p>
        <p className="mt-3 text-ink/75">{lesson.explanation}</p>
        <div className="mt-4 rounded-md bg-sky/10 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-sky">Pattern to notice</p>
          <p className="mt-1 text-sm text-ink/75">{lesson.pattern}</p>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-xl font-bold">Target phrases</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {lessonPhrases.map((phrase) =>
            phrase ? (
              <PhraseCard
                key={phrase.id}
                phrase={phrase}
                status={state?.phraseStatuses[phrase.id]}
                onStatus={(status) => {
                  if (!state) return;
                  setState(replaceReview(state, scheduleReview(state.reviews[phrase.id], status)));
                }}
              />
            ) : null
          )}
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="panel">
          <h2 className="text-lg font-bold">Speaking drill</h2>
          <ol className="mt-3 space-y-2">
            {lesson.speakingDrill.map((line) => (
              <li key={line} className="rounded-md bg-black/5 px-3 py-2 text-sm">
                {line}
              </li>
            ))}
          </ol>
        </div>
        <div className="panel">
          <h2 className="text-lg font-bold">Use this today</h2>
          <p className="mt-2 text-ink/75">{lesson.challenge}</p>
          <button className="action-button mt-4" onClick={completeLesson}>
            <CheckCircle2 size={18} /> Mark lesson complete
          </button>
        </div>
      </section>
    </main>
  );
}
