"use client";

import Link from "next/link";
import { BookOpen, Brain, MessageCircle, Play } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { useAppState } from "@/components/useAppState";
import { lessons, phrases } from "@/lib/polish-content";
import { isDue } from "@/lib/srs";

export default function DashboardPage() {
  const [state] = useAppState();
  const completedIds = new Set(state?.lessonAttempts.map((attempt) => attempt.lessonId) ?? []);
  const nextLesson = lessons.find((lesson) => !completedIds.has(lesson.id)) ?? lessons[0];
  const dueCount = state ? Object.values(state.reviews).filter(isDue).length : 0;
  const knownCount = state ? Object.values(state.phraseStatuses).filter((status) => status === "known").length : 0;
  const hardCount = state ? Object.values(state.phraseStatuses).filter((status) => status === "hard" || status === "needs-review").length : 0;
  const weakAreas = state
    ? Object.entries(state.weakAreas)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
    : [];

  return (
    <main className="page-shell">
      <PageHeader title="Language Tutor" eyebrow="Polish module · Local-first A2 to B1">
        <Link href="/lesson" className="action-button">
          <Play size={18} /> Start today
        </Link>
      </PageHeader>

      <section className="grid gap-3 sm:grid-cols-4">
        <StatCard label="Streak" value={state?.streak.count ?? 0} detail="local practice days" />
        <StatCard label="Due review" value={dueCount} detail="flashcards ready" />
        <StatCard label="Known phrases" value={knownCount} detail={`of ${phrases.length}`} />
        <StatCard label="Weak items" value={hardCount} detail="hard or review" />
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel">
          <p className="text-xs font-bold uppercase tracking-wide text-moss">Today’s lesson</p>
          <h2 className="mt-2 text-2xl font-bold">{nextLesson.title}</h2>
          <p className="mt-2 text-ink/70">{nextLesson.situation}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">{nextLesson.level}</span>
            <span className="chip">{nextLesson.phraseIds.length} phrases</span>
            <span className="chip">Speaking challenge</span>
          </div>
          <Link href="/lesson" className="action-button mt-5">
            <BookOpen size={18} /> Open lesson
          </Link>
        </div>

        <div className="panel">
          <p className="text-xs font-bold uppercase tracking-wide text-moss">Quick starts</p>
          <div className="mt-3 grid gap-2">
            <Link className="secondary-button justify-start" href="/review">
              <Brain size={18} /> Review due flashcards
            </Link>
            <Link className="secondary-button justify-start" href="/practice">
              <MessageCircle size={18} /> Practice speaking prompts
            </Link>
            <Link className="secondary-button justify-start" href="/phrasebook">
              <BookOpen size={18} /> Browse family phrasebook
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="panel">
          <h2 className="text-lg font-bold">Weak areas</h2>
          {weakAreas.length ? (
            <ul className="mt-3 space-y-2">
              {weakAreas.map(([area, count]) => (
                <li key={area} className="flex items-center justify-between rounded-md bg-tomato/10 px-3 py-2 text-sm">
                  <span className="font-semibold capitalize">{area.replaceAll("-", " ")}</span>
                  <span>{count} misses</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink/65">Weak areas will appear after quiz misses or hard flashcards.</p>
          )}
        </div>

        <div className="panel">
          <h2 className="text-lg font-bold">Recent activity</h2>
          {state?.practiceLogs.length ? (
            <ul className="mt-3 space-y-2">
              {state.practiceLogs.slice(0, 5).map((log) => (
                <li key={log.id} className="rounded-md bg-black/5 px-3 py-2 text-sm">
                  <span className="font-semibold capitalize">{log.type}</span>: {log.summary}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-ink/65">Complete a lesson, quiz, or speaking prompt to start the log.</p>
          )}
        </div>
      </section>
    </main>
  );
}
