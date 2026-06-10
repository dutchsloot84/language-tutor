import { phrases } from "./polish-content";
import type { AppState, PhraseStatus, PracticeLog } from "./types";

const RECENT_QUIZ_MISS_LIMIT = 20;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type HomeUseTrend = "up" | "flat" | "down";

export type ProgressProofScorecard = {
  recentQuizMissCount: number;
  reviewMissSignalCount: number;
  reviewMissPhraseCount: number;
  missDrillRetryCount: number;
  missDrillKnownCount: number;
  usedAtHomeCount: number;
  usedAtHomeLast7Days: number;
  usedAtHomePrevious7Days: number;
  homeUseTrend: HomeUseTrend;
  knownPhraseCount: number;
  hardPhraseCount: number;
  needsReviewPhraseCount: number;
  totalPhraseCount: number;
  retryCoveragePercent: number | null;
  knownRetryPercent: number | null;
  loopRead: string;
};

function countStatuses(statuses: AppState["phraseStatuses"], status: PhraseStatus) {
  return Object.values(statuses).filter((value) => value === status).length;
}

function recentQuizMissCount(logs: PracticeLog[]) {
  return logs.flatMap((log) => log.quizMisses ?? []).slice(0, RECENT_QUIZ_MISS_LIMIT).length;
}

function reviewMissSignals(state: AppState) {
  const loggedMisses = new Map<string, number>();

  for (const log of state.practiceLogs) {
    if (
      log.type !== "flashcard" ||
      log.weakArea !== "phrase-recall" ||
      (log.reviewOutcome !== "hard" && log.reviewOutcome !== "needs-review") ||
      !log.phraseId
    ) {
      continue;
    }

    loggedMisses.set(log.phraseId, (loggedMisses.get(log.phraseId) ?? 0) + 1);
  }

  const phraseIds = new Set([
    ...Object.values(state.reviews)
      .filter((review) => review.misses > 0)
      .map((review) => review.phraseId),
    ...loggedMisses.keys()
  ]);

  let count = 0;
  for (const phraseId of phraseIds) {
    count += Math.max(state.reviews[phraseId]?.misses ?? 0, loggedMisses.get(phraseId) ?? 0);
  }

  return {
    count,
    phraseCount: phraseIds.size
  };
}

function countLogs(logs: PracticeLog[], type: PracticeLog["type"]) {
  return logs.filter((log) => log.type === type).length;
}

function countHomeUseInWindow(logs: PracticeLog[], from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();

  return logs.filter((log) => {
    if (log.type !== "used-at-home") return false;
    const createdAt = new Date(log.createdAt).getTime();
    return Number.isFinite(createdAt) && createdAt >= fromTime && createdAt < toTime;
  }).length;
}

function percent(part: number, total: number) {
  if (!total) return null;
  return Math.round((part / total) * 100);
}

function trend(current: number, previous: number): HomeUseTrend {
  if (current > previous) return "up";
  if (current < previous) return "down";
  return "flat";
}

function loopRead(input: {
  missSignalCount: number;
  missDrillRetryCount: number;
  missDrillKnownCount: number;
  usedAtHomeCount: number;
}) {
  if (!input.missSignalCount) return "Do a quiz or review session to seed proof.";
  if (!input.missDrillRetryCount) return "Misses are recorded; retry them in Daily Miss Drill.";
  if (!input.missDrillKnownCount) return "Retries are logged; keep resolving drill items to known.";
  if (!input.usedAtHomeCount) return "Drill proof exists; log one real home use next.";
  return "Misses, retries, known ratings, and home use are all present.";
}

export function createProgressProofScorecard(state: AppState, referenceDate = new Date()): ProgressProofScorecard {
  const logs = Array.isArray(state.practiceLogs) ? state.practiceLogs : [];
  const quizMissCount = recentQuizMissCount(logs);
  const reviewMiss = reviewMissSignals(state);
  const missSignalCount = quizMissCount + reviewMiss.count;
  const missDrillRetryCount = countLogs(logs, "miss-drill");
  const missDrillKnownCount = logs.filter((log) => log.type === "miss-drill" && log.reviewOutcome === "known").length;
  const usedAtHomeCount = countLogs(logs, "used-at-home");
  const last7Start = new Date(referenceDate.getTime() - 7 * ONE_DAY_MS);
  const previous7Start = new Date(referenceDate.getTime() - 14 * ONE_DAY_MS);
  const usedAtHomeLast7Days = countHomeUseInWindow(logs, last7Start, referenceDate);
  const usedAtHomePrevious7Days = countHomeUseInWindow(logs, previous7Start, last7Start);

  return {
    recentQuizMissCount: quizMissCount,
    reviewMissSignalCount: reviewMiss.count,
    reviewMissPhraseCount: reviewMiss.phraseCount,
    missDrillRetryCount,
    missDrillKnownCount,
    usedAtHomeCount,
    usedAtHomeLast7Days,
    usedAtHomePrevious7Days,
    homeUseTrend: trend(usedAtHomeLast7Days, usedAtHomePrevious7Days),
    knownPhraseCount: countStatuses(state.phraseStatuses, "known"),
    hardPhraseCount: countStatuses(state.phraseStatuses, "hard"),
    needsReviewPhraseCount: countStatuses(state.phraseStatuses, "needs-review"),
    totalPhraseCount: phrases.length,
    retryCoveragePercent: percent(missDrillRetryCount, missSignalCount),
    knownRetryPercent: percent(missDrillKnownCount, missDrillRetryCount),
    loopRead: loopRead({
      missSignalCount,
      missDrillRetryCount,
      missDrillKnownCount,
      usedAtHomeCount
    })
  };
}
