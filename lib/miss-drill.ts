"use client";

import { phrases } from "./polish-content";
import type { AppState, PhraseStatus, QuizMiss, WeakAreaId } from "./types";

export type MissDrillSource = "quiz" | "review";

export type MissDrillItem = {
  id: string;
  source: MissDrillSource;
  prompt: string;
  expected: string;
  weakArea: WeakAreaId;
  phraseId?: string;
  phraseText?: string;
  translation?: string;
  missedAt?: string;
  missCount: number;
};

function phraseIdFromQuestionId(questionId: string) {
  if (!questionId.startsWith("phrase-")) return undefined;
  const phraseId = questionId.slice("phrase-".length);
  return phrases.some((phrase) => phrase.id === phraseId) ? phraseId : undefined;
}

function quizMissKey(miss: QuizMiss) {
  return `${miss.questionId}|${miss.prompt}|${miss.expected}`;
}

function collectQuizMissItems(state: AppState): MissDrillItem[] {
  const seen = new Set<string>();
  const items: MissDrillItem[] = [];

  for (const log of state.practiceLogs) {
    for (const miss of log.quizMisses ?? []) {
      const key = quizMissKey(miss);
      if (seen.has(key)) continue;
      seen.add(key);
      const phraseId = phraseIdFromQuestionId(miss.questionId);
      const phrase = phraseId ? phrases.find((item) => item.id === phraseId) : undefined;
      items.push({
        id: `quiz:${key}`,
        source: "quiz",
        prompt: miss.prompt,
        expected: miss.expected,
        weakArea: miss.weakArea,
        phraseId,
        phraseText: phrase?.pl,
        translation: phrase?.en,
        missedAt: log.createdAt,
        missCount: 1
      });
    }
  }

  return items;
}

function collectLoggedReviewMisses(state: AppState) {
  const logged = new Map<string, { count: number; lastMissedAt?: string; status?: Extract<PhraseStatus, "hard" | "needs-review"> }>();

  for (const log of state.practiceLogs) {
    if (
      log.type !== "flashcard" ||
      log.weakArea !== "phrase-recall" ||
      (log.reviewOutcome !== "hard" && log.reviewOutcome !== "needs-review") ||
      !log.phraseId
    ) {
      continue;
    }

    const current = logged.get(log.phraseId);
    logged.set(log.phraseId, {
      count: (current?.count ?? 0) + 1,
      lastMissedAt:
        !current?.lastMissedAt || log.createdAt.localeCompare(current.lastMissedAt) > 0 ? log.createdAt : current.lastMissedAt,
      status: log.reviewOutcome
    });
  }

  return logged;
}

function collectReviewMissItems(state: AppState): MissDrillItem[] {
  const logged = collectLoggedReviewMisses(state);

  return Object.values(state.reviews)
    .filter((review) => review.misses > 0 || logged.has(review.phraseId))
    .flatMap((review): MissDrillItem[] => {
      const phrase = phrases.find((item) => item.id === review.phraseId);
      if (!phrase) return [];
      const evidence = logged.get(review.phraseId);
      return [
        {
          id: `review:${phrase.id}`,
          source: "review",
          prompt: `Say this in Polish: ${phrase.en}`,
          expected: phrase.pl,
          weakArea: "phrase-recall",
          phraseId: phrase.id,
          phraseText: phrase.pl,
          translation: phrase.en,
          missedAt: evidence?.lastMissedAt,
          missCount: Math.max(review.misses, evidence?.count ?? 0)
        }
      ];
    })
    .sort(
      (a, b) =>
        b.missCount - a.missCount ||
        (b.missedAt ?? "").localeCompare(a.missedAt ?? "") ||
        (a.translation ?? a.expected).localeCompare(b.translation ?? b.expected)
    );
}

export function buildDailyMissDrillQueue(state: AppState, limit = 8): MissDrillItem[] {
  const usedPhraseIds = new Set<string>();
  const queue: MissDrillItem[] = [];

  for (const item of collectQuizMissItems(state)) {
    queue.push(item);
    if (item.phraseId) usedPhraseIds.add(item.phraseId);
    if (queue.length >= limit) return queue;
  }

  for (const item of collectReviewMissItems(state)) {
    if (item.phraseId && usedPhraseIds.has(item.phraseId)) continue;
    queue.push(item);
    if (queue.length >= limit) return queue;
  }

  return queue;
}
