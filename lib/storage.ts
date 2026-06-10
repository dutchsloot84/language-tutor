"use client";

import { phrases } from "./polish-content";
import { createReviewItem, todayIso } from "./srs";
import type { AppState, PhraseStatus, PracticeLog, ReviewItem } from "./types";

const STORAGE_KEY = "polish-family-tutor-state-v1";

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

export function loadState(): AppState {
  if (typeof window === "undefined") return createInitialState();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return createInitialState();

  try {
    const parsed = JSON.parse(raw) as AppState;
    const initial = createInitialState();
    return {
      ...initial,
      ...parsed,
      phraseStatuses: { ...initial.phraseStatuses, ...parsed.phraseStatuses },
      reviews: { ...initial.reviews, ...parsed.reviews }
    };
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
  anchor.download = `polish-learning-state-${todayIso()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function importState(file: File): Promise<AppState> {
  const text = await file.text();
  const parsed = JSON.parse(text) as AppState;
  saveState(parsed);
  return parsed;
}
