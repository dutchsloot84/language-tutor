import type { PhraseStatus, ReviewItem } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysIso(days: number) {
  return new Date(Date.now() + days * DAY_MS).toISOString().slice(0, 10);
}

export function createReviewItem(phraseId: string): ReviewItem {
  return {
    phraseId,
    status: "new",
    ease: 2.3,
    intervalDays: 0,
    due: todayIso(),
    correct: 0,
    misses: 0
  };
}

export function scheduleReview(item: ReviewItem, rating: PhraseStatus): ReviewItem {
  if (rating === "hard") {
    return {
      ...item,
      status: "hard",
      ease: Math.max(1.3, item.ease - 0.2),
      intervalDays: 1,
      due: addDaysIso(1),
      misses: item.misses + 1
    };
  }

  if (rating === "needs-review") {
    return {
      ...item,
      status: "needs-review",
      ease: Math.max(1.4, item.ease - 0.05),
      intervalDays: Math.max(1, Math.round(item.intervalDays || 1)),
      due: addDaysIso(1),
      misses: item.misses + 1
    };
  }

  const nextInterval = item.intervalDays === 0 ? 2 : Math.ceil(item.intervalDays * item.ease);
  return {
    ...item,
    status: "known",
    ease: Math.min(2.8, item.ease + 0.08),
    intervalDays: nextInterval,
    due: addDaysIso(nextInterval),
    correct: item.correct + 1
  };
}

export function isDue(item: ReviewItem) {
  return item.due <= todayIso();
}
