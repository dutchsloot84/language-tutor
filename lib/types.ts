export type PhraseStatus = "new" | "known" | "hard" | "needs-review";

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

export type PracticeLog = {
  id: string;
  createdAt: string;
  type: "lesson" | "flashcard" | "quiz" | "speaking" | "note";
  summary: string;
};

export type LearnerProfile = {
  id: string;
  name: string;
  level: "A2";
  goals: string[];
};

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
