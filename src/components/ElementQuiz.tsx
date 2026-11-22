import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { ElementData } from '../types/chemistry';
import { useApp } from '../context/AppContext';

interface ElementQuizProps {
  element: ElementData;
}

export const ElementQuiz: React.FC<ElementQuizProps> = ({ element }) => {
  const { language, t, saveQuizScore } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = element.quiz;
  const currentQ = questions[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);
    if (optIdx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
      saveQuizScore(element.id, score, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0b101d]/90 p-6 sm:p-8 text-center">
        <p className="text-xs font-medium text-slate-400">
          {element.symbol} · {element.names[language]}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold text-white">{t.quizResultTitle}</h3>
        <div className="my-6">
          <span className={`font-mono text-5xl font-bold tabular-nums ${element.theme.accentTextClass}`}>
            {score} / {questions.length}
          </span>
          <p className="mt-2 font-mono text-sm text-slate-300 tabular-nums">{pct}%</p>
        </div>
        <button
          type="button"
          onClick={handleRetry}
          className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-slate-950 transition-colors cursor-pointer ${element.theme.accentBgClass} ${element.theme.accentHoverBgClass}`}
        >
          <RotateCcw className="h-4 w-4" />
          {t.quizRetryBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b101d]/90 p-5 sm:p-7">
      {/* Progress Header */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <span className="font-mono text-xs font-medium tabular-nums text-slate-300">
          {t.quizQuestionProgress} {currentIndex + 1} / {questions.length}
        </span>
        <span className="font-mono text-xs tabular-nums text-slate-400">
          {t.challengeScoreLabel}: {score}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className={`h-full transition-all duration-300 ${element.theme.accentBgClass}`}
          style={{ width: `${((currentIndex + (selectedOption !== null ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="mt-6 font-display text-lg sm:text-xl font-semibold text-white leading-snug">
        {currentQ.question[language]}
      </h3>

      {/* Options */}
      <div className="mt-5 grid grid-cols-1 gap-3">
        {currentQ.options[language].map((opt, idx) => {
          const isAnswered = selectedOption !== null;
          const isCorrect = idx === currentQ.correctIndex;
          const isChosen = idx === selectedOption;

          let styleClass =
            'border-white/10 bg-slate-900/70 text-slate-200 hover:border-white/25 hover:bg-slate-800/80';
          if (isAnswered) {
            if (isCorrect) {
              styleClass = 'border-emerald-500/60 bg-emerald-500/15 text-emerald-100';
            } else if (isChosen) {
              styleClass = 'border-rose-500/60 bg-rose-500/15 text-rose-100';
            } else {
              styleClass = 'border-white/5 bg-slate-900/40 text-slate-500';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(idx)}
              className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                isAnswered ? 'cursor-default' : 'cursor-pointer'
              } ${styleClass}`}
            >
              <span className="leading-snug">{opt}</span>
              {isAnswered && isCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              )}
              {isAnswered && isChosen && !isCorrect && (
                <XCircle className="h-5 w-5 shrink-0 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {selectedOption !== null && (
        <div className="mt-5 space-y-4 border-t border-white/10 pt-4">
          <div className="space-y-1">
            <p
              className={`text-sm font-semibold ${
                selectedOption === currentQ.correctIndex ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {selectedOption === currentQ.correctIndex ? t.quizCorrect : t.quizIncorrect}
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              {currentQ.explanation[language]}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors cursor-pointer ${element.theme.accentBgClass} ${element.theme.accentHoverBgClass}`}
          >
            {currentIndex + 1 < questions.length ? t.quizNextQuestion : t.quizFinish}
          </button>
        </div>
      )}
    </div>
  );
};
