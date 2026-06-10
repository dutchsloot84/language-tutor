"use client";

import { Download, RotateCcw, Upload } from "lucide-react";
import { useMemo, type ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { createLearnerSnapshot, exportLearnerSnapshot } from "@/lib/snapshot";
import { exportState, importState, resetState } from "@/lib/storage";
import type { LearnerSnapshot, PracticeLog, QuizMiss, SnapshotPhrase } from "@/lib/types";

function SnapshotCount({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div className="rounded-md bg-black/5 p-3">
      <p className="text-xs font-semibold uppercase text-ink/55">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
      {detail ? <p className="text-xs text-ink/60">{detail}</p> : null}
    </div>
  );
}

function EmptyPreviewLine({ children }: { children: ReactNode }) {
  return <p className="rounded-md bg-black/5 p-3 text-sm text-ink/60">{children}</p>;
}

function PhraseExcerpt({ title, phrases, empty }: { title: string; phrases: SnapshotPhrase[]; empty: string }) {
  return (
    <div>
      <h3 className="text-sm font-bold">{title}</h3>
      {phrases.length ? (
        <ul className="mt-2 space-y-2">
          {phrases.slice(0, 3).map((phrase) => (
            <li key={phrase.id} className="rounded-md bg-black/5 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{phrase.pl}</span>
                <span className="text-ink/55">{phrase.en}</span>
              </div>
              <p className="mt-1 text-xs text-ink/55">
                {phrase.status}
                {phrase.due ? ` - due ${phrase.due}` : ""}
                {phrase.misses ? ` - ${phrase.misses} misses` : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPreviewLine>{empty}</EmptyPreviewLine>
      )}
    </div>
  );
}

function QuizMissExcerpt({ misses }: { misses: QuizMiss[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold">Recent quiz misses</h3>
      {misses.length ? (
        <ul className="mt-2 space-y-2">
          {misses.slice(0, 3).map((miss, index) => (
            <li key={`${miss.questionId}-${index}`} className="rounded-md bg-black/5 p-3 text-sm">
              <p className="font-semibold">{miss.prompt}</p>
              <p className="mt-1 text-ink/60">Expected: {miss.expected}</p>
              {miss.given ? <p className="text-ink/60">Given: {miss.given}</p> : null}
              <p className="mt-1 text-xs text-ink/55">{miss.weakArea}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPreviewLine>No quiz misses logged yet.</EmptyPreviewLine>
      )}
    </div>
  );
}

function PracticeLogExcerpt({ logs, notes }: { logs: PracticeLog[]; notes: LearnerSnapshot["notes"] }) {
  return (
    <div>
      <h3 className="text-sm font-bold">Corrections, hesitations, and notes</h3>
      {logs.length || notes.length ? (
        <ul className="mt-2 space-y-2">
          {logs.slice(0, 2).map((log) => (
            <li key={log.id} className="rounded-md bg-black/5 p-3 text-sm">
              <p className="font-semibold">{log.summary}</p>
              {log.note ? <p className="mt-1 text-ink/60">{log.note}</p> : null}
              <p className="mt-1 text-xs text-ink/55">
                {log.type} - {new Date(log.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
          {notes.slice(0, 2).map((note) => (
            <li key={note.key} className="rounded-md bg-black/5 p-3 text-sm">
              <p className="font-semibold">{note.key}</p>
              <p className="mt-1 text-ink/60">{note.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPreviewLine>Corrections, hesitations, and learner notes will appear here after practice.</EmptyPreviewLine>
      )}
    </div>
  );
}

function SnapshotPreview({ snapshot }: { snapshot: LearnerSnapshot }) {
  const topWeakAreas = snapshot.weakAreas.slice(0, 4);
  const hardAndReview = [...snapshot.phraseStatuses.hard, ...snapshot.phraseStatuses.needsReview];

  return (
    <section className="panel mt-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Learner snapshot preview</h2>
          <p className="mt-1 text-sm text-ink/65">
            This is the local tutor packet that Export Learner Snapshot downloads.
          </p>
        </div>
        <span className="chip w-fit">{snapshot.schema}</span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
        <SnapshotCount label="Lessons" value={snapshot.summary.completedLessonCount} detail={`of ${snapshot.summary.totalLessonCount}`} />
        <SnapshotCount label="Known" value={snapshot.summary.knownPhraseCount} detail="phrases" />
        <SnapshotCount label="Due" value={snapshot.summary.dueReviewCount} detail="review items" />
        <SnapshotCount label="Hard" value={snapshot.summary.hardPhraseCount} detail="phrases" />
        <SnapshotCount label="Review" value={snapshot.summary.needsReviewPhraseCount} detail="phrases" />
        <SnapshotCount
          label="Quiz avg"
          value={snapshot.summary.averageQuizScore === null ? "n/a" : `${snapshot.summary.averageQuizScore}%`}
          detail={`${snapshot.summary.quizAttemptCount} attempts`}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-bold">Top weak areas</h3>
          {topWeakAreas.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {topWeakAreas.map((area) => (
                <span key={area.id} className="chip">
                  {area.label}: {area.count}
                </span>
              ))}
            </div>
          ) : (
            <EmptyPreviewLine>Weak areas will appear after quiz misses, corrections, or hesitations.</EmptyPreviewLine>
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold">Tutor hints</h3>
          <ul className="mt-2 space-y-2">
            {snapshot.tutorHints.slice(0, 2).map((hint) => (
              <li key={hint} className="rounded-md bg-black/5 p-3 text-sm text-ink/70">
                {hint}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <PhraseExcerpt title="Due review excerpt" phrases={snapshot.reviewQueue} empty="No reviews are due today." />
        <PhraseExcerpt title="Hard and review evidence" phrases={hardAndReview} empty="No hard or needs-review phrases marked yet." />
        <QuizMissExcerpt misses={snapshot.quiz.recentMisses} />
        <PracticeLogExcerpt logs={snapshot.recentCorrectionsAndNotes} notes={snapshot.notes} />
      </div>
    </section>
  );
}

export default function SettingsPage() {
  const [state, setState] = useAppState();
  const snapshot = useMemo(() => (state ? createLearnerSnapshot(state) : null), [state]);

  return (
    <main className="page-shell">
      <PageHeader title="Settings & Data" eyebrow="Local-first storage" />
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="panel">
          <h2 className="text-lg font-bold">Storage mode</h2>
          <p className="mt-2 text-sm text-ink/70">
            V1 stores progress in this browser’s localStorage. It works immediately and stays free, but each browser/device has its own copy unless you export and import data.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">No account</span>
            <span className="chip">No cloud required</span>
            <span className="chip">PWA-ready</span>
          </div>
        </div>

        <div className="panel">
          <h2 className="text-lg font-bold">Data tools</h2>
          <div className="mt-4 grid gap-2">
            <button className="action-button justify-start" onClick={() => state && exportLearnerSnapshot(state)}>
              <Download size={18} /> Export Learner Snapshot
            </button>
            <button className="secondary-button justify-start" onClick={() => state && exportState(state)}>
              <Download size={18} /> Export JSON
            </button>
            <label className="secondary-button cursor-pointer justify-start">
              <Upload size={18} /> Import JSON
              <input
                className="hidden"
                type="file"
                accept="application/json"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (file) setState(await importState(file));
                }}
              />
            </label>
            <button
              className="secondary-button justify-start border-tomato/30 text-tomato"
              onClick={() => {
                const confirmed = window.confirm("Reset all local progress in this browser?");
                if (confirmed) setState(resetState());
              }}
            >
              <RotateCcw size={18} /> Reset demo data
            </button>
          </div>
        </div>
      </section>

      {snapshot ? (
        <SnapshotPreview snapshot={snapshot} />
      ) : (
        <section className="panel mt-5">
          <h2 className="text-lg font-bold">Learner snapshot preview</h2>
          <p className="mt-2 text-sm text-ink/65">Loading local learner state...</p>
        </section>
      )}

      <section className="panel mt-5">
        <h2 className="text-lg font-bold">Future paths</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink/70">
          <li>Local network: run `npm run dev:lan`, then open your Mac’s LAN IP on your phone.</li>
          <li>Static/free hosting: Vercel, Netlify, Cloudflare Pages, or GitHub Pages can host the UI later.</li>
          <li>Private sync later: add SQLite file sync, Tailscale/private access, or Supabase when multi-device/family profiles matter.</li>
        </ul>
      </section>
    </main>
  );
}
