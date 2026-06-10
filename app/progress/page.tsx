"use client";

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { useAppState } from "@/components/useAppState";
import { lessons, phrases } from "@/lib/polish-content";
import { createProgressProofScorecard } from "@/lib/progress-proof";

function ProofMetric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <div className="rounded-md border border-black/10 bg-black/[0.03] p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-ink/55">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink/65">{detail}</p>
    </div>
  );
}

function retryCoverageDetail(value: number | null) {
  return value === null ? "No miss signals yet" : `${value}% of miss signals`;
}

function knownRetryDetail(value: number | null) {
  return value === null ? "No retries yet" : `${value}% of miss-drill retries`;
}

function homeTrendLabel(trend: "up" | "flat" | "down") {
  if (trend === "up") return "up from prior week";
  if (trend === "down") return "below prior week";
  return "same as prior week";
}

export default function ProgressPage() {
  const [state] = useAppState();
  const proof = state ? createProgressProofScorecard(state) : null;
  const known = proof?.knownPhraseCount ?? 0;
  const hard = proof?.hardPhraseCount ?? 0;
  const review = proof?.needsReviewPhraseCount ?? 0;
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

      <section className="panel mt-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Proof scorecard</h2>
            <p className="mt-1 text-sm text-ink/65">{proof?.loopRead ?? "Local proof appears after progress loads."}</p>
          </div>
          <p className="text-xs font-bold uppercase tracking-wide text-moss">Local only</p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ProofMetric
            label="Recent quiz misses"
            value={proof?.recentQuizMissCount ?? 0}
            detail="latest 20 logged miss items"
          />
          <ProofMetric
            label="Review miss signals"
            value={proof?.reviewMissSignalCount ?? 0}
            detail={`${proof?.reviewMissPhraseCount ?? 0} phrases with review evidence`}
          />
          <ProofMetric
            label="Miss-drill retries"
            value={proof?.missDrillRetryCount ?? 0}
            detail={retryCoverageDetail(proof?.retryCoveragePercent ?? null)}
          />
          <ProofMetric
            label="Rated known in drill"
            value={proof?.missDrillKnownCount ?? 0}
            detail={knownRetryDetail(proof?.knownRetryPercent ?? null)}
          />
          <ProofMetric
            label="Used at home"
            value={proof?.usedAtHomeCount ?? 0}
            detail={`${proof?.usedAtHomeLast7Days ?? 0} last 7 days, ${proof?.usedAtHomePrevious7Days ?? 0} prior (${homeTrendLabel(
              proof?.homeUseTrend ?? "flat"
            )})`}
          />
          <ProofMetric label="Phrase proof" value={known} detail={`${hard} hard, ${review} needs review`} />
        </div>
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
