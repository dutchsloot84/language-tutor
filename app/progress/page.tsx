"use client";

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { useAppState } from "@/components/useAppState";
import { lessons, phrases } from "@/lib/polish-content";

export default function ProgressPage() {
  const [state] = useAppState();
  const known = state ? Object.values(state.phraseStatuses).filter((status) => status === "known").length : 0;
  const hard = state ? Object.values(state.phraseStatuses).filter((status) => status === "hard").length : 0;
  const review = state ? Object.values(state.phraseStatuses).filter((status) => status === "needs-review").length : 0;
  const quizScores = state ? Object.values(state.quizScores).flat() : [];
  const average = quizScores.length ? Math.round(quizScores.reduce((sum, item) => sum + item, 0) / quizScores.length) : 0;

  return (
    <main className="page-shell">
      <PageHeader title="Progress" eyebrow="Local learning record" />
      <section className="grid gap-3 sm:grid-cols-4">
        <StatCard label="Lessons" value={state?.lessonAttempts.length ?? 0} detail={`of ${lessons.length}`} />
        <StatCard label="Known" value={known} detail={`of ${phrases.length} phrases`} />
        <StatCard label="Hard" value={hard} detail="marked hard" />
        <StatCard label="Quiz avg" value={`${average}%`} detail={`${quizScores.length} attempts`} />
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="panel">
          <h2 className="text-lg font-bold">Phrase status</h2>
          <div className="mt-4 space-y-3">
            {[
              ["Known", known, "bg-moss"],
              ["Needs review", review, "bg-honey"],
              ["Hard", hard, "bg-tomato"]
            ].map(([label, value, color]) => (
              <div key={label as string}>
                <div className="flex justify-between text-sm font-semibold">
                  <span>{label}</span>
                  <span>{value as number}</span>
                </div>
                <div className="mt-1 h-3 overflow-hidden rounded-full bg-black/10">
                  <div className={`h-full ${color as string}`} style={{ width: `${Math.min(100, ((value as number) / phrases.length) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2 className="text-lg font-bold">Recommended next drills</h2>
          {state && Object.keys(state.weakAreas).length ? (
            <ul className="mt-3 space-y-2">
              {Object.entries(state.weakAreas)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([area, count]) => (
                  <li key={area} className="rounded-md bg-black/5 p-3 text-sm">
                    <span className="font-semibold">{area}</span>
                    <p className="text-ink/65">Create a speaking drill and 5 flashcards here. Misses: {count}</p>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink/65">Quiz misses and hard flashcards will generate weak-area recommendations.</p>
          )}
        </div>
      </section>

      <section className="panel mt-5">
        <h2 className="text-lg font-bold">Lesson history</h2>
        {state?.lessonAttempts.length ? (
          <ul className="mt-3 space-y-2">
            {state.lessonAttempts.map((attempt) => {
              const lesson = lessons.find((item) => item.id === attempt.lessonId);
              return (
                <li key={`${attempt.lessonId}-${attempt.completedAt}`} className="rounded-md bg-black/5 p-3 text-sm">
                  <span className="font-semibold">{lesson?.title ?? attempt.lessonId}</span>
                  <span className="text-ink/60"> completed {new Date(attempt.completedAt).toLocaleDateString()}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ink/65">No completed lessons yet.</p>
        )}
      </section>
    </main>
  );
}
