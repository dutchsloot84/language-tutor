"use client";

import { lessons, phrases } from "./polish-content";
import { todayIso } from "./srs";
import type { AppState, LearnerSnapshot, PracticeLog, QuizMiss, ReviewMissEvidence, SnapshotPhrase, WeakAreaId } from "./types";

const weakAreaLabels: Record<WeakAreaId, string> = {
  "gender-agreement": "Gender agreement",
  "cases-endings": "Cases / endings",
  "phrase-recall": "Phrase recall",
  "listening-pronunciation": "Listening / pronunciation",
  "verbs-tense": "Verbs / tense",
  "repair-phrases": "Repair phrases",
  "home-usage": "Used at home",
  "confidence-hesitation": "Confidence / hesitation"
};

function isWeakAreaId(value: string): value is WeakAreaId {
  return value in weakAreaLabels;
}

function averageScore(scores: number[]) {
  if (!scores.length) return null;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function toSnapshotPhrase(state: AppState, phraseId: string): SnapshotPhrase | null {
  const phrase = phrases.find((item) => item.id === phraseId);
  if (!phrase) return null;
  const review = state.reviews[phraseId];
  return {
    id: phrase.id,
    pl: phrase.pl,
    en: phrase.en,
    category: phrase.category,
    tags: phrase.tags,
    status: state.phraseStatuses[phraseId] ?? "new",
    due: review?.due,
    misses: review?.misses
  };
}

function collectRecentQuizMisses(logs: PracticeLog[]) {
  return logs.flatMap((log) => log.quizMisses ?? []).slice(0, 20);
}

function collectReviewMisses(state: AppState): ReviewMissEvidence[] {
  const loggedMisses = new Map<
    string,
    {
      count: number;
      lastMissedAt?: string;
      status?: ReviewMissEvidence["status"];
    }
  >();

  for (const log of state.practiceLogs) {
    if (
      log.type !== "flashcard" ||
      log.weakArea !== "phrase-recall" ||
      (log.reviewOutcome !== "hard" && log.reviewOutcome !== "needs-review") ||
      !log.phraseId
    ) {
      continue;
    }

    const current = loggedMisses.get(log.phraseId);
    loggedMisses.set(log.phraseId, {
      count: (current?.count ?? 0) + 1,
      lastMissedAt:
        !current?.lastMissedAt || log.createdAt.localeCompare(current.lastMissedAt) > 0 ? log.createdAt : current.lastMissedAt,
      status: log.reviewOutcome
    });
  }

  return Object.values(state.reviews)
    .filter((review) => review.misses > 0 || loggedMisses.has(review.phraseId))
    .flatMap((review): ReviewMissEvidence[] => {
      const phrase = phrases.find((item) => item.id === review.phraseId);
      if (!phrase) return [];
      const logged = loggedMisses.get(review.phraseId);
      const status =
        review.status === "hard" || review.status === "needs-review" ? review.status : logged?.status ?? "needs-review";
      const loggedCount = logged?.count ?? 0;
      const evidence: ReviewMissEvidence = {
        phraseId: phrase.id,
        phraseText: phrase.pl,
        translation: phrase.en,
        language: "pl" as const,
        weakArea: "phrase-recall" as const,
        status,
        count: Math.max(review.misses, loggedCount),
        srsMisses: review.misses,
        loggedMisses: loggedCount
      };
      if (logged?.lastMissedAt) evidence.lastMissedAt = logged.lastMissedAt;
      return [evidence];
    })
    .sort(
      (a, b) =>
        b.count - a.count ||
        (b.lastMissedAt ?? "").localeCompare(a.lastMissedAt ?? "") ||
        a.translation.localeCompare(b.translation)
    )
    .slice(0, 30);
}

function dueReviewQueue(state: AppState) {
  const today = todayIso();
  return Object.values(state.reviews)
    .filter((item) => item.due <= today)
    .sort((a, b) => a.due.localeCompare(b.due) || b.misses - a.misses)
    .map((item) => toSnapshotPhrase(state, item.phraseId))
    .filter((item): item is SnapshotPhrase => Boolean(item))
    .slice(0, 40);
}

function statusList(state: AppState, status: SnapshotPhrase["status"]) {
  return Object.entries(state.phraseStatuses)
    .filter(([, value]) => value === status)
    .map(([phraseId]) => toSnapshotPhrase(state, phraseId))
    .filter((item): item is SnapshotPhrase => Boolean(item))
    .sort((a, b) => (b.misses ?? 0) - (a.misses ?? 0) || a.en.localeCompare(b.en));
}

function buildTutorHints(state: AppState, recentMisses: QuizMiss[]) {
  const hints: string[] = [];
  const hard = statusList(state, "hard").slice(0, 5);
  const needsReview = statusList(state, "needs-review").slice(0, 5);
  const hesitationCount = state.practiceLogs.filter((log) => log.type === "hesitation").length;
  const correctionCount = state.practiceLogs.filter((log) => log.type === "correction").length;

  if (hard.length) hints.push(`Prioritize hard phrases: ${hard.map((phrase) => phrase.en).join(", ")}.`);
  if (needsReview.length) hints.push(`Fold needs-review phrases into retrieval practice: ${needsReview.map((phrase) => phrase.en).join(", ")}.`);
  if (recentMisses.length) hints.push("Turn recent quiz misses into short Polish-from-English prompts.");
  if (correctionCount) hints.push("Use wife corrections as the next drill source before adding many new phrases.");
  if (hesitationCount) hints.push("Add fast-response speaking drills for phrases marked with hesitation.");
  if (!hints.length) hints.push("Keep the next lesson practical, short, and home-focused.");

  return hints;
}

export function createLearnerSnapshot(state: AppState): LearnerSnapshot {
  const quizScores = Object.values(state.quizScores).flat();
  const known = statusList(state, "known");
  const hard = statusList(state, "hard");
  const needsReview = statusList(state, "needs-review");
  const reviewQueue = dueReviewQueue(state);
  const recentMisses = collectRecentQuizMisses(state.practiceLogs);
  const reviewMisses = collectReviewMisses(state);
  const recentCorrectionsAndNotes = state.practiceLogs
    .filter((log) => log.type === "correction" || log.type === "hesitation" || log.type === "note")
    .slice(0, 20);

  return {
    schema: "language-tutor-learner-snapshot-v1",
    generatedAt: new Date().toISOString(),
    app: {
      name: "Language Tutor",
      module: "polish",
      language: "pl",
      stateVersion: state.version
    },
    learner: state.profile,
    summary: {
      completedLessonCount: state.lessonAttempts.length,
      totalLessonCount: lessons.length,
      knownPhraseCount: known.length,
      hardPhraseCount: hard.length,
      needsReviewPhraseCount: needsReview.length,
      dueReviewCount: reviewQueue.length,
      quizAttemptCount: quizScores.length,
      averageQuizScore: averageScore(quizScores),
      streakCount: state.streak.count
    },
    completedLessons: state.lessonAttempts.map((attempt) => {
      const lesson = lessons.find((item) => item.id === attempt.lessonId);
      return {
        id: attempt.lessonId,
        title: lesson?.title ?? attempt.lessonId,
        situation: lesson?.situation ?? "Unknown",
        completedAt: attempt.completedAt,
        score: attempt.score,
        notes: attempt.notes
      };
    }),
    phraseStatuses: {
      known,
      hard,
      needsReview
    },
    reviewQueue,
    reviewMisses,
    quiz: {
      scoresByLesson: state.quizScores,
      recentMisses
    },
    weakAreas: Object.entries(state.weakAreas)
      .map(([id, count]) => ({
        id,
        label: isWeakAreaId(id) ? weakAreaLabels[id] : id,
        count
      }))
      .sort((a, b) => b.count - a.count),
    practiceLogs: state.practiceLogs.slice(0, 50),
    recentCorrectionsAndNotes,
    notes: Object.entries(state.notes).map(([key, text]) => ({ key, text })),
    tutorHints: buildTutorHints(state, recentMisses)
  };
}

export function exportLearnerSnapshot(state: AppState) {
  const snapshot = createLearnerSnapshot(state);
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `language-tutor-learner-snapshot-${todayIso()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
