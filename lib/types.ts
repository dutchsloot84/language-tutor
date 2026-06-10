export type PhraseStatus = "new" | "known" | "hard" | "needs-review";

export type LanguageCode = "pl" | "ja" | (string & {});

export type PhraseCategory =
  | "home"
  | "kitchen"
  | "parenting"
  | "getting-ready"
  | "bedtime"
  | "feelings"
  | "questions"
  | "wife-conversations"
  | "kids"
  | "outings";

export type Phrase = {
  id: string;
  pl: string;
  en: string;
  pron: string;
  category: PhraseCategory;
  tags: string[];
  note?: string;
};

export type Lesson = {
  id: string;
  title: string;
  situation: string;
  level: "A2" | "A2+" | "B1";
  phraseIds: string[];
  explanation: string;
  pattern: string;
  speakingDrill: string[];
  challenge: string;
  quiz: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  answer: string;
  acceptedAnswers?: string[];
  choices?: string[];
  type: "multiple-choice" | "translate-pl-en" | "translate-en-pl" | "missing-word";
};

export type GlossaryTerm = {
  id: string;
  pl: string;
  en: string;
  example: string;
  tags: string[];
  note?: string;
};

export type RoleplayScript = {
  id: string;
  title: string;
  context: string;
  audience: "wife" | "kids" | "self";
  lines: { speaker: string; pl: string; en: string }[];
};

export type ReviewItem = {
  phraseId: string;
  status: PhraseStatus;
  ease: number;
  intervalDays: number;
  due: string;
  correct: number;
  misses: number;
};

export type LessonAttempt = {
  lessonId: string;
  completedAt: string;
  score?: number;
  notes?: string;
};

export type PracticeLogType =
  | "lesson"
  | "flashcard"
  | "quiz"
  | "speaking"
  | "note"
  | "used-at-home"
  | "correction"
  | "hesitation";

export type QuizMiss = {
  questionId: string;
  prompt: string;
  expected: string;
  given?: string;
  weakArea: WeakAreaId;
};

export type PracticeLog = {
  id: string;
  createdAt: string;
  type: PracticeLogType;
  summary: string;
  language?: LanguageCode;
  phraseId?: string;
  phraseText?: string;
  lessonId?: string;
  weakArea?: WeakAreaId;
  reviewOutcome?: PhraseStatus;
  quizMisses?: QuizMiss[];
  note?: string;
};

export type LearnerProfile = {
  id: string;
  name: string;
  level: "A2";
  goals: string[];
};

export type WeakAreaId =
  | "gender-agreement"
  | "cases-endings"
  | "phrase-recall"
  | "listening-pronunciation"
  | "verbs-tense"
  | "repair-phrases"
  | "home-usage"
  | "confidence-hesitation";

export type AppState = {
  version: 1;
  profile: LearnerProfile;
  phraseStatuses: Record<string, PhraseStatus>;
  reviews: Record<string, ReviewItem>;
  lessonAttempts: LessonAttempt[];
  quizScores: Record<string, number[]>;
  weakAreas: Record<string, number>;
  practiceLogs: PracticeLog[];
  notes: Record<string, string>;
  streak: {
    lastPracticeDate?: string;
    count: number;
  };
};

export type SnapshotPhrase = {
  id: string;
  pl: string;
  en: string;
  category: PhraseCategory;
  tags: string[];
  status: PhraseStatus;
  due?: string;
  misses?: number;
};

export type ReviewMissEvidence = {
  phraseId: string;
  phraseText: string;
  translation: string;
  language: LanguageCode;
  weakArea: WeakAreaId;
  status: Extract<PhraseStatus, "hard" | "needs-review">;
  count: number;
  srsMisses: number;
  loggedMisses: number;
  lastMissedAt?: string;
};

export type LearnerSnapshot = {
  schema: "language-tutor-learner-snapshot-v1";
  generatedAt: string;
  app: {
    name: "Language Tutor";
    module: "polish";
    language: "pl";
    stateVersion: AppState["version"];
  };
  learner: LearnerProfile;
  summary: {
    completedLessonCount: number;
    totalLessonCount: number;
    knownPhraseCount: number;
    hardPhraseCount: number;
    needsReviewPhraseCount: number;
    dueReviewCount: number;
    quizAttemptCount: number;
    averageQuizScore: number | null;
    streakCount: number;
  };
  completedLessons: {
    id: string;
    title: string;
    situation: string;
    completedAt: string;
    score?: number;
    notes?: string;
  }[];
  phraseStatuses: {
    known: SnapshotPhrase[];
    hard: SnapshotPhrase[];
    needsReview: SnapshotPhrase[];
  };
  reviewQueue: SnapshotPhrase[];
  reviewMisses: ReviewMissEvidence[];
  quiz: {
    scoresByLesson: Record<string, number[]>;
    recentMisses: QuizMiss[];
  };
  weakAreas: {
    id: WeakAreaId | string;
    label: string;
    count: number;
  }[];
  practiceLogs: PracticeLog[];
  recentCorrectionsAndNotes: PracticeLog[];
  notes: {
    key: string;
    text: string;
  }[];
  tutorHints: string[];
};
