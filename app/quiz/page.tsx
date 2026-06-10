"use client";

import { useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { lessons, phrases } from "@/lib/polish-content";
import { recordPractice } from "@/lib/storage";
import type { QuizQuestion } from "@/lib/types";

export default function QuizPage() {
  const [state, setState] = useAppState();
  const [lessonId, setLessonId] = useState(lessons[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];

  const questions = useMemo(() => {
    const translationQuestions: QuizQuestion[] = lesson.phraseIds.slice(0, 4).map((phraseId, index) => {
      const phrase = phrases.find((item) => item.id === phraseId)!;
      return {
        id: `phrase-${phrase.id}`,
        type: index % 2 === 0 ? "translate-en-pl" : "translate-pl-en",
        prompt: index % 2 === 0 ? `Say this in Polish: ${phrase.en}` : `Translate: ${phrase.pl}`,
        answer: index % 2 === 0 ? phrase.pl : phrase.en
      };
    });
    return [...lesson.quiz, ...translationQuestions];
  }, [lesson]);

  function submitQuiz() {
    if (!state) return;
    let correct = 0;
    const weakAreas = { ...state.weakAreas };
    for (const question of questions) {
      const given = (answers[question.id] ?? "").trim().toLowerCase();
      const expected = question.answer.trim().toLowerCase();
      const ok = given === expected || expected.includes(given);
      if (ok && given.length > 0) correct += 1;
      if (!ok) weakAreas[lesson.title] = (weakAreas[lesson.title] ?? 0) + 1;
    }
    const percent = Math.round((correct / questions.length) * 100);
    setScore(percent);
    setState(
      recordPractice(
        {
          ...state,
          weakAreas,
          quizScores: {
            ...state.quizScores,
            [lesson.id]: [...(state.quizScores[lesson.id] ?? []), percent]
          }
        },
        { type: "quiz", summary: `${lesson.title}: ${percent}%` }
      )
    );
  }

  return (
    <main className="page-shell">
      <PageHeader title="Quiz Mode" eyebrow="Short checks" />
      <section className="panel">
        <label className="text-sm font-bold text-ink/70" htmlFor="lesson-select">
          Lesson
        </label>
        <select
          id="lesson-select"
          className="focus-ring mt-2 min-h-11 w-full rounded-md border border-black/15 bg-white px-3"
          value={lessonId}
          onChange={(event) => {
            setLessonId(event.target.value);
            setAnswers({});
            setScore(null);
          }}
        >
          {lessons.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-5 space-y-3">
        {questions.map((question) => (
          <article key={question.id} className="panel">
            <p className="text-xs font-bold uppercase tracking-wide text-moss">{question.type.replaceAll("-", " ")}</p>
            <h2 className="mt-2 text-lg font-bold">{question.prompt}</h2>
            {question.choices ? (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.choices.map((choice) => (
                  <button
                    key={choice}
                    className={`secondary-button justify-start ${answers[question.id] === choice ? "border-moss bg-moss/10" : ""}`}
                    onClick={() => setAnswers((current) => ({ ...current, [question.id]: choice }))}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <input
                className="focus-ring mt-3 min-h-11 w-full rounded-md border border-black/15 bg-white px-3"
                value={answers[question.id] ?? ""}
                onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                placeholder="Type your answer"
              />
            )}
            {score !== null ? (
              <p className="mt-3 text-sm text-ink/65">
                Answer: <span className="font-semibold text-ink">{question.answer}</span>
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="panel mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Score</h2>
          <p className="text-ink/65">{score === null ? "Submit when you are done." : `${score}% saved to progress.`}</p>
        </div>
        <button className="action-button" onClick={submitQuiz}>
          <ClipboardCheck size={18} /> Submit quiz
        </button>
      </section>
    </main>
  );
}
