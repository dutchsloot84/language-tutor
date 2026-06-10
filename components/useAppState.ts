"use client";

import { useEffect, useState } from "react";
import { loadState, saveState } from "@/lib/storage";
import type { AppState } from "@/lib/types";

export function useAppState() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    setState(loadState());
  }, []);

  function update(next: AppState | ((current: AppState) => AppState)) {
    setState((current) => {
      const base = current ?? loadState();
      const resolved = typeof next === "function" ? next(base) : next;
      saveState(resolved);
      return resolved;
    });
  }

  return [state, update] as const;
}
