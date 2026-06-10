"use client";

import { useMemo, useRef, useState } from "react";
import { Check, CheckCircle2, ClipboardCheck, Circle, XCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useAppState } from "@/components/useAppState";
import { lessons, phrases } from "@/lib/polish-content";
import { recordPractice } from "@/lib/storage";
import type { QuizQuestion } from "@/lib/types";

type QuizResult = {
  score: number;
  correctCount: number;
  total: number;
  byQuestion: Record<string, boolean>;
};

function normalizeAnswer(answer: string) {
  return answer
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[.,?!]/g, "")
    .replace(/\s+/g, " ");
}

function isCorrectAnswer(question: QuizQuestion, answer: string) {
  const given = normalizeAnswer(answer);
  if (!given) return false;
  const accepted = question.acceptedAnswers?.length ? question.acceptedAnswers : [question.answer];
  return accepted.some((expected) => given === normalizeAnswer(expected));
}

function acceptedAnswerText(question: QuizQuestion) {
  const accepted = question.acceptedAnswers?.length ? question.acceptedAnswers : [question.answer];
  return Array.from(new Set(accepted)).join(" / ");
}

function answerVariantsForPhrase(phraseId: string) {
  const phrase = phrases.find((item) => item.id === phraseId)!;
  const sameMeaning = phrases.filter(
    (item) =>
      item.id !== phrase.id &&
      item.en === phrase.en &&
      item.category === phrase.category &&
      item.tags.some((tag) => phrase.tags.includes(tag))
  );
  return [phrase.pl, ...sameMeaning.map((item) => item.pl)];
}

export default function QuizPage() {
  const [state, setState] = useAppState();
  const [lessonId, setLessonId] = useState(lessons[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const resultRef = useRef<HTMLElement | null>(null);
  const lesson = lessons.find((item) => item.id === lessonId) ?? lessons[0];

  const questions = useMemo(() => {
    const translationQuestions: QuizQuestion[] = lesson.phraseIds.slice(0, 4).map((phraseId, index) => {
      const phrase = phrases.find((item) => item.id === phraseId)!;
      return {
        id: `phrase-${phrase.id}`,
        type: index % 2 === 0 ? "translate-en-pl" : "translate-pl-en",
        prompt:
          index % 2 === 0 && answerVariantsForPhrase(phrase.id).length > 1
            ? `Say this in Polish: ${phrase.en} (any natural gender form is accepted)`
            : index % 2 === 0
              ? `Say this in Polish: ${phrase.en}`
              : `Translate: ${phrase.pl}`,
        answer: index % 2 === 0 ? phrase.pl : phrase.en,
        acceptedAnswers: index % 2 === 0 ? answerVariantsForPhrase(phrase.id) : [phrase.en]
      };
    });
    return [...lesson.quiz, ...translationQuestions];
  }, [lesson]);

  function submitQuiz() {
    if (!state) return;
    let correct = 0;
    const byQuestion: Record<string, boolean> = {};
    const weakAreas = { ...state.weakAreas };
    for (const question of questions) {
      const ok = isCorrectAnswer(question, answers[question.id] ?? "");
      byQuestion[question.id] = ok;
      if (ok) correct += 1;
      if (!ok) weakAreas[lesson.title] = (weakAreas[lesson.title] ?? 0) + 1;
    }
    const percent = Math.round((correct / questions.length) * 100);
    setResult({
      score: percent,
      correctCount: correct,
      total: questions.length,
      byQuestion
    });
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
    window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  return (
    <main className="page-shell">
      <PageHeader title="Quiz Mode" eyebrow="Short checks" />
      <section ref={resultRef} className={`panel ${result ? "border-moss bg-moss/10" : ""}`} aria-live="polite">
        {result ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-moss">Saved to local progress</p>
              <h2 className="mt-1 text-2xl font-bold">{result.score}%</h2>
              <p className="text-sm text-ink/70">
                {result.correctCount} of {result.total} correct. Missed items were added to weak-area tracking.
              </p>
            </div>
            <CheckCircle2 className="text-moss" size={36} />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-bold">Quiz answers stay on this page</h2>
            <p className="mt-1 text-sm text-ink/65">
              Selected multiple-choice answers are marked with a check. Submit shows your score here and saves it locally on this device.
            </p>
          </div>
        )}
      </section>

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
            setResult(null);
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
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-moss">{question.type.replaceAll("-", " ")}</p>
                <h2 className="mt-2 text-lg font-bold">{question.prompt}</h2>
              </div>
              {result ? (
                result.byQuestion[question.id] ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-moss/15 px-3 py-1 text-xs font-bold text-moss">
                    <CheckCircle2 size={14} /> Correct
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-tomato/15 px-3 py-1 text-xs font-bold text-tomato">
                    <XCircle size={14} /> Review
                  </span>
                )
              ) : null}
            </div>
            {question.choices ? (
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.choices.map((choice) => {
                  const selected = answers[question.id] === choice;
                  return (
                    <button
                      key={choice}
                      type="button"
                      aria-pressed={selected}
                      className={`focus-ring inline-flex min-h-12 items-center justify-start gap-2 rounded-md border px-3 py-2 text-left text-sm font-semibold transition ${
                        selected
                          ? "border-moss bg-moss text-white shadow-sm"
                          : "border-black/15 bg-white text-ink hover:bg-black/5"
                      }`}
                      onClick={() => {
                        setAnswers((current) => ({ ...current, [question.id]: choice }));
                        setResult(null);
                      }}
                    >
                      {selected ? <Check size={17} /> : <Circle size={17} />}
                      <span>{choice}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <input
                className="focus-ring mt-3 min-h-11 w-full rounded-md border border-black/15 bg-white px-3"
                value={answers[question.id] ?? ""}
                onChange={(event) => {
                  setAnswers((current) => ({ ...current, [question.id]: event.target.value }));
                  setResult(null);
                }}
                placeholder="Type your answer; Polish accents optional"
              />
            )}
            {result ? (
              <p className="mt-3 text-sm text-ink/65">
                Accepted: <span className="font-semibold text-ink">{acceptedAnswerText(question)}</span>
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="panel mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Score</h2>
          <p className="text-ink/65">{result === null ? "Submit when you are done." : `${result.score}% saved to progress.`}</p>
        </div>
        <button className="action-button disabled:cursor-not-allowed disabled:bg-ink/45" type="button" disabled={!state} onClick={submitQuiz}>
          <ClipboardCheck size={18} /> Submit quiz
        </button>
      </section>
    </main>
  );
}
