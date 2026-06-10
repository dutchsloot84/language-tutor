"use client";

import { phrases } from "./polish-content";
import { addDaysIso, createReviewItem, todayIso } from "./srs";
import type { AppState, PhraseStatus, PracticeLog, ReviewItem, WeakAreaId } from "./types";

const STORAGE_KEY = "language-tutor-state-v1";
const LEGACY_STORAGE_KEY = "polish-family-tutor-state-v1";

export function createInitialState(): AppState {
  return {
    version: 1,
    profile: {
      id: "shayne",
      name: "Shayne",
      level: "A2",
      goals: [
        "Speak more Polish with my wife",
        "Use practical family Polish at home",
        "Build toward B1 conversation"
      ]
    },
    phraseStatuses: Object.fromEntries(phrases.map((phrase) => [phrase.id, "new" as PhraseStatus])),
    reviews: Object.fromEntries(phrases.map((phrase) => [phrase.id, createReviewItem(phrase.id)])),
    lessonAttempts: [],
    quizScores: {},
    weakAreas: {},
    practiceLogs: [],
    notes: {},
    streak: {
      count: 0
    }
  };
}

function normalizePracticeLog(log: PracticeLog): PracticeLog {
  if (log.type !== "correction") return log;

  const summary = typeof log.summary === "string" ? log.summary : "Wife corrected me";

  return {
    ...log,
    summary,
    phraseText: log.phraseText ?? summary.replace(/^Wife corrected me:\s*/, ""),
    retryHint: log.retryDate ? log.retryHint : log.retryHint ?? "Retry this correction in the next practice session."
  };
}

function migrateState(parsed: Partial<AppState>): AppState {
  const initial = createInitialState();
  const practiceLogs = Array.isArray(parsed.practiceLogs)
    ? parsed.practiceLogs.map((log) => normalizePracticeLog(log as PracticeLog))
    : initial.practiceLogs;

  return {
    ...initial,
    ...parsed,
    version: 1,
    profile: { ...initial.profile, ...parsed.profile },
    phraseStatuses: { ...initial.phraseStatuses, ...parsed.phraseStatuses },
    reviews: { ...initial.reviews, ...parsed.reviews },
    lessonAttempts: parsed.lessonAttempts ?? initial.lessonAttempts,
    quizScores: parsed.quizScores ?? initial.quizScores,
    weakAreas: parsed.weakAreas ?? initial.weakAreas,
    practiceLogs,
    notes: parsed.notes ?? initial.notes,
    streak: { ...initial.streak, ...parsed.streak }
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return createInitialState();
  const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return createInitialState();

  try {
    const parsed = JSON.parse(raw) as Partial<AppState>;
    const migrated = migrateState(parsed);
    if (!window.localStorage.getItem(STORAGE_KEY)) saveState(migrated);
    return migrated;
  } catch {
    return createInitialState();
  }
}

export function saveState(state: AppState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
}

export function resetState() {
  const state = createInitialState();
  saveState(state);
  return state;
}

export function recordPractice(state: AppState, log: Omit<PracticeLog, "id" | "createdAt">): AppState {
  const today = todayIso();
  const streak =
    state.streak.lastPracticeDate === today
      ? state.streak
      : {
          lastPracticeDate: today,
          count: state.streak.lastPracticeDate ? state.streak.count + 1 : 1
        };

  return {
    ...state,
    practiceLogs: [
      {
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...log
      },
      ...state.practiceLogs
    ].slice(0, 200),
    streak
  };
}

export function recordPhrasePractice(
  state: AppState,
  input: {
    phraseId: string;
    type: "used-at-home" | "correction" | "hesitation";
    phraseText: string;
    correctedPhraseText?: string;
    note?: string;
  }
): AppState {
  const weakArea: WeakAreaId =
    input.type === "correction" ? "phrase-recall" : input.type === "hesitation" ? "confidence-hesitation" : "home-usage";
  const labels = {
    "used-at-home": "Used at home",
    correction: "Wife corrected me",
    hesitation: "Hesitated on this"
  };

  const retryDate = input.type === "correction" ? addDaysIso(1) : undefined;
  const correctionSummary =
    input.type === "correction" && input.correctedPhraseText
      ? `${labels[input.type]}: ${input.phraseText} -> ${input.correctedPhraseText}`
      : `${labels[input.type]}: ${input.phraseText}`;

  return recordPractice(
    {
      ...state,
      weakAreas:
        input.type === "used-at-home"
          ? state.weakAreas
          : {
              ...state.weakAreas,
              [weakArea]: (state.weakAreas[weakArea] ?? 0) + 1
            }
    },
    {
      type: input.type,
      language: "pl",
      phraseId: input.phraseId,
      phraseText: input.phraseText,
      correctedPhraseText: input.correctedPhraseText,
      retryDate,
      retryHint: retryDate ? `Retry on ${retryDate}.` : undefined,
      weakArea,
      summary: correctionSummary,
      note: input.note
    }
  );
}

export function replaceReview(state: AppState, item: ReviewItem): AppState {
  return {
    ...state,
    reviews: { ...state.reviews, [item.phraseId]: item },
    phraseStatuses: { ...state.phraseStatuses, [item.phraseId]: item.status }
  };
}

export function exportState(state: AppState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `language-tutor-state-${todayIso()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importState(file: File): Promise<AppState> {
  const text = await file.text();
  const parsed = JSON.parse(text) as Partial<AppState>;
  const migrated = migrateState(parsed);
  saveState(migrated);
  return migrated;
}
