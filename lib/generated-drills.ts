"use client";

import type {
  AppState,
  GeneratedDrill,
  GeneratedDrillCollection,
  GeneratedDrillLevel,
  GeneratedDrillRecord
} from "./types";

export const GENERATED_DRILL_SCHEMA = "language-tutor-generated-drill-v1";

type ParseResult =
  | {
      ok: true;
      drill: GeneratedDrill;
    }
  | {
      ok: false;
      error: string;
    };

const levels: GeneratedDrillLevel[] = ["A2", "A2+", "B1"];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value: unknown) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasValidDate(value: unknown): value is string {
  return isNonEmptyString(value) && !Number.isNaN(Date.parse(value));
}

function fail(error: string): ParseResult {
  return { ok: false, error };
}

function parseJsonObject(text: string): { ok: true; value: unknown } | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, error: "The file is not valid JSON." };
  }
}

function extractPayloadText(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;

  const appReadyIndex = text.indexOf("## App-Ready JSON");
  if (appReadyIndex === -1) return null;

  const appReadySection = text.slice(appReadyIndex);
  const match = appReadySection.match(/```json\s*([\s\S]*?)```/);
  return match?.[1]?.trim() ?? null;
}

function validateSourceEvidence(value: unknown): string | null {
  if (!Array.isArray(value) || value.length === 0) return "sourceEvidence must be a non-empty array.";

  for (const item of value) {
    if (!isObject(item)) return "Every sourceEvidence item must be an object.";
    if (!isNonEmptyString(item.type)) return "Every sourceEvidence item needs a type.";
    if (!isNonEmptyString(item.ref)) return "Every sourceEvidence item needs a ref.";
    if (!isNonEmptyString(item.summary)) return "Every sourceEvidence item needs a summary.";
    if (item.quote !== undefined && typeof item.quote !== "string") return "sourceEvidence.quote must be text when present.";
  }

  return null;
}

function validateExamples(value: unknown): string | null {
  if (!Array.isArray(value) || value.length === 0) return "examples must be a non-empty array.";

  for (const item of value) {
    if (!isObject(item)) return "Every example must be an object.";
    if (!isNonEmptyString(item.pl)) return "Every example needs pl text.";
    if (!isNonEmptyString(item.en)) return "Every example needs en text.";
    if (!isNonEmptyString(item.pron)) return "Every example needs pron text.";
    if (item.tags !== undefined && !isStringArray(item.tags)) return "example tags must be text values.";
    if (item.sourceRef !== undefined && typeof item.sourceRef !== "string") return "example sourceRef must be text.";
  }

  return null;
}

function validateQuickPrompts(value: unknown): string | null {
  if (!Array.isArray(value) || value.length === 0) return "quickPrompts must be a non-empty array.";

  const promptIds = new Set<string>();
  for (const item of value) {
    if (!isObject(item)) return "Every quick prompt must be an object.";
    if (!isNonEmptyString(item.id)) return "Every quick prompt needs an id.";
    if (promptIds.has(item.id)) return `Duplicate quick prompt id: ${item.id}.`;
    promptIds.add(item.id);
    if (!isNonEmptyString(item.prompt)) return `Quick prompt ${item.id} needs prompt text.`;
    if (!isNonEmptyString(item.expected)) return `Quick prompt ${item.id} needs an expected answer.`;
    if (item.acceptedAnswers !== undefined && !isStringArray(item.acceptedAnswers)) {
      return `Quick prompt ${item.id} acceptedAnswers must be text values.`;
    }
    if (item.hint !== undefined && typeof item.hint !== "string") return `Quick prompt ${item.id} hint must be text.`;
    if (item.weakArea !== undefined && typeof item.weakArea !== "string") return `Quick prompt ${item.id} weakArea must be text.`;
  }

  return null;
}

function validateSpeakingTask(value: unknown): string | null {
  if (!isObject(value)) return "speakingTask must be an object.";
  if (!isNonEmptyString(value.instruction)) return "speakingTask.instruction is required.";
  if (value.durationMinutes !== undefined && typeof value.durationMinutes !== "number") {
    return "speakingTask.durationMinutes must be a number.";
  }
  if (value.audience !== undefined && typeof value.audience !== "string") return "speakingTask.audience must be text.";
  return null;
}

function validateRetryPlan(value: unknown): string | null {
  if (!isObject(value)) return "retryPlan must be an object.";
  if (!isNonEmptyString(value.retryPrompt)) return "retryPlan.retryPrompt is required.";
  if (value.retryAfterDays !== undefined && typeof value.retryAfterDays !== "number") {
    return "retryPlan.retryAfterDays must be a number.";
  }
  if (value.logType !== undefined && typeof value.logType !== "string") return "retryPlan.logType must be text.";
  return null;
}

function validateProofOfUse(value: unknown): string | null {
  if (!isObject(value)) return "proofOfUse must be an object.";
  if (!isNonEmptyString(value.successSignal)) return "proofOfUse.successSignal is required.";

  if (value.logSuggestion !== undefined) {
    if (!isObject(value.logSuggestion)) return "proofOfUse.logSuggestion must be an object.";
    if (value.logSuggestion.type !== undefined && typeof value.logSuggestion.type !== "string") {
      return "proofOfUse.logSuggestion.type must be text.";
    }
    if (value.logSuggestion.summary !== undefined && typeof value.logSuggestion.summary !== "string") {
      return "proofOfUse.logSuggestion.summary must be text.";
    }
  }

  return null;
}

function validateReviewCards(value: unknown): string | null {
  if (!Array.isArray(value) || value.length === 0) return "reviewCards must be a non-empty array.";

  for (const item of value) {
    if (!isObject(item)) return "Every review card must be an object.";
    if (!isNonEmptyString(item.pl)) return "Every review card needs pl text.";
    if (!isNonEmptyString(item.en)) return "Every review card needs en text.";
  }

  return null;
}

export function parseGeneratedDrillText(text: string): ParseResult {
  const payloadText = extractPayloadText(text);
  if (!payloadText) {
    return fail("No generated drill JSON object found. Import the JSON payload or the markdown section under App-Ready JSON.");
  }

  const parsed = parseJsonObject(payloadText);
  if (parsed.ok === false) return parsed;
  const value = parsed.value;

  if (!isObject(value)) return fail("Generated drill payload must be a JSON object.");
  if (value.schema !== GENERATED_DRILL_SCHEMA) return fail(`Generated drill schema must be ${GENERATED_DRILL_SCHEMA}.`);
  if (!hasValidDate(value.generatedAt)) return fail("generatedAt must be a valid ISO date string.");

  if (!isObject(value.app)) return fail("app must be an object.");
  if (value.app.name !== "Language Tutor") return fail("app.name must be Language Tutor.");
  if (value.app.module !== "polish") return fail("app.module must be polish.");
  if (value.app.language !== "pl") return fail("app.language must be pl.");

  if (!isNonEmptyString(value.id)) return fail("id is required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.id)) return fail("id must be kebab-case.");
  if (!isNonEmptyString(value.title)) return fail("title is required.");
  if (!levels.includes(value.level as GeneratedDrillLevel)) return fail("level must be A2, A2+, or B1.");
  if (!isNonEmptyString(value.weakArea)) return fail("weakArea is required.");
  if (!isNonEmptyString(value.focus)) return fail("focus is required.");
  if (!isNonEmptyString(value.tinyExplanation)) return fail("tinyExplanation is required.");
  if (!isNonEmptyString(value.useToday)) return fail("useToday is required.");

  const validators = [
    validateSourceEvidence(value.sourceEvidence),
    validateExamples(value.examples),
    validateQuickPrompts(value.quickPrompts),
    validateSpeakingTask(value.speakingTask),
    validateRetryPlan(value.retryPlan),
    validateProofOfUse(value.proofOfUse),
    validateReviewCards(value.reviewCards)
  ];
  const error = validators.find((message): message is string => Boolean(message));
  if (error) return fail(error);

  if (value.description !== undefined && typeof value.description !== "string") return fail("description must be text.");
  if (value.tags !== undefined && !isStringArray(value.tags)) return fail("tags must be text values.");

  return { ok: true, drill: value as GeneratedDrill };
}

export function normalizeGeneratedDrills(value: unknown): GeneratedDrillCollection {
  const empty: GeneratedDrillCollection = { version: 1, items: [] };
  if (!isObject(value) || value.version !== 1 || !Array.isArray(value.items)) return empty;

  const seen = new Set<string>();
  const items: GeneratedDrillRecord[] = [];

  for (const item of value.items) {
    if (!isObject(item) || !hasValidDate(item.importedAt)) continue;
    const importedAt = item.importedAt;
    const validation = parseGeneratedDrillText(JSON.stringify(item.drill));
    if (validation.ok === false || seen.has(validation.drill.id)) continue;
    seen.add(validation.drill.id);
    items.push({
      importedAt,
      drill: validation.drill
    });
  }

  return { version: 1, items };
}

export function addGeneratedDrill(state: AppState, drill: GeneratedDrill): AppState {
  const collection = normalizeGeneratedDrills(state.generatedDrills);
  if (collection.items.some((item) => item.drill.id === drill.id)) {
    throw new Error(`A generated drill with ID "${drill.id}" is already imported.`);
  }

  return {
    ...state,
    generatedDrills: {
      version: 1,
      items: [
        {
          importedAt: new Date().toISOString(),
          drill
        },
        ...collection.items
      ]
    }
  };
}

export async function importGeneratedDrillFile(state: AppState, file: File): Promise<AppState> {
  const text = await file.text();
  const parsed = parseGeneratedDrillText(text);
  if (parsed.ok === false) throw new Error(parsed.error);
  return addGeneratedDrill(state, parsed.drill);
}
