import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from 'lucide-react';
import type { ElementId, LocalizedText } from '../types/chemistry';
import { ELEMENTS_LIST } from '../data/elements';
import { useApp } from '../context/AppContext';

interface ChallengePrompt {
  id: string;
  clue: LocalizedText;
  answerId: ElementId;
  explanation: LocalizedText;
}

const CHALLENGE_ROUNDS: ChallengePrompt[] = [
  {
    id: 'ch-1',
    clue: {
      ru: 'Атомный номер 80, единственный жидкий металл при комнатной температуре, добывается из киновари.',
      kz: 'Атомдық нөмірі 80, бөлме температурасындағы жалғыз сұйық металл, киноварьдан алынады.',
    },
    answerId: 'hg',
    explanation: {
      ru: 'Ртуть (Hg, №80) плавится при −38,83 °C, а её главный минерал — киноварь HgS.',
      kz: 'Сынап (Hg, №80) −38,83 °C-та балқиды, ал басты минералы — киноварь HgS.',
    },
  },
  {
    id: 'ch-2',
    clue: {
      ru: 'Открыт Уильямом Круксом в 1861 году благодаря ослепительно яркой зелёной спектральной линии 535 нм.',
      kz: '1861 жылы Уильям Крукс жарқын 535 нм жасыл спектр сызығы бойынша ашқан элемент.',
    },
    answerId: 'tl',
    explanation: {
      ru: 'Таллий (Tl, №81) назван от греческого thallos («зелёная ветвь»).',
      kz: 'Таллий (Tl, №81) грекше thallos («жасыл бұтақ») сөзінен аталған.',
    },
  },
  {
    id: 'ch-3',
    clue: {
      ru: 'Электронная конфигурация [Xe] 4f¹⁴ 5d¹⁰ 6s¹, плотность 19,32 г/см³, растворяется в «царской водке».',
      kz: 'Электрондық конфигурациясы [Xe] 4f¹⁴ 5d¹⁰ 6s¹, тығыздығы 19,32 г/см³, «патша арағында» ериді.',
    },
    answerId: 'au',
    explanation: {
      ru: 'Золото (Au, №79) имеет 1 электрон на внешнем 6s-уровне и рекордную среди четырёх элементов плотность.',
      kz: 'Алтынның (Au, №79) сыртқы 6s-деңгейінде 1 электрон бар және төрт элементтің ішіндегі ең жоғары тығыздыққа ие.',
    },
  },
  {
    id: 'ch-4',
    clue: {
      ru: 'Имеет 4 электрона на внешнем уровне (6s² 6p²), главный минерал — галенит, защищает от рентгеновского излучения.',
      kz: 'Сыртқы деңгейінде 4 электроны бар (6s² 6p²), басты минералы — галенит, рентген сәулесінен қорғайды.',
    },
    answerId: 'pb',
    explanation: {
      ru: 'Свинец (Pb, №82) находится в 14-й группе и является дважды магическим элементом в ядре ²⁰⁸Pb.',
      kz: 'Қорғасын (Pb, №82) 14-топта орналасқан және ²⁰⁸Pb ядросы екі есе сиқырлы болып келеді.',
    },
  },
  {
    id: 'ch-5',
    clue: {
      ru: 'Распределение электронов по оболочкам: 2, 8, 18, 32, 18, 3. Применяется в ИК-оптике KRS-5.',
      kz: 'Электрондардың қабаттар бойынша таралуы: 2, 8, 18, 32, 18, 3. KRS-5 ИҚ-оптикасында қолданылады.',
    },
    answerId: 'tl',
    explanation: {
      ru: 'Сумма электронов 2+8+18+32+18+3 = 81 соответствует таллию (Tl).',
      kz: 'Электрондар қосындысы 2+8+18+32+18+3 = 81 таллийге (Tl) сәйкес келеді.',
    },
  },
  {
    id: 'ch-6',
    clue: {
      ru: 'Ядро изотопа содержит 82 протона и 126 нейтронов; используется в автомобильных аккумуляторах.',
      kz: 'Изотоп ядросында 82 протон және 126 нейтрон бар; автомобиль аккумуляторларында қолданылады.',
    },
    answerId: 'pb',
    explanation: {
      ru: 'Изотоп ²⁰⁸Pb (82p⁺, 126n⁰) — самый тяжёлый стабильный нуклид свинца.',
      kz: '²⁰⁸Pb изотопы (82p⁺, 126n⁰) — қорғасынның ең ауыр тұрақты нуклиді.',
    },
  },
  {
    id: 'ch-7',
    clue: {
      ru: 'Температура плавления 1064,18 °C; отражает около 99% инфракрасного света (покрытие зеркал телескопа JWST).',
      kz: 'Балқу температурасы 1064,18 °C; инфрақызыл жарықтың ~99%-ын шағылыстырады (JWST телескопының айналары).',
    },
    answerId: 'au',
    explanation: {
      ru: 'Золото (Au) обладает самой высокой температурой плавления среди этой четвёрки элементов.',
      kz: 'Алтын (Au) осы төрт элементтің ішінде ең жоғары балқу температурасына ие.',
    },
  },
  {
    id: 'ch-8',
    clue: {
      ru: 'Именно на этом элементе в 1911 году Х. Камерлинг-Оннес открыл сверхпроводимость при 4,15 К.',
      kz: '1911 жылы Х. Камерлинг-Оннес дәл осы элементтен 4,15 К температурада асқын өткізгіштікті ашты.',
    },
    answerId: 'hg',
    explanation: {
      ru: 'Замороженная ртуть (Hg) стала первым сверхпроводником в истории физики.',
      kz: 'Мұздатылған сынап (Hg) физика тарихындағы алғашқы асқын өткізгіш болды.',
    },
  },
];

export const PeriodicChallenge: React.FC = () => {
  const { language, t, saveChallengeScore } = useApp();
  const [started, setStarted] = useState(false);
  const [roundIdx, setRoundIdx] = useState(0);
  const [chosenId, setChosenId] = useState<ElementId | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentRound = CHALLENGE_ROUNDS[roundIdx];

  const handlePick = (id: ElementId) => {
    if (chosenId !== null) return;
    setChosenId(id);
    if (id === currentRound.answerId) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (roundIdx + 1 < CHALLENGE_ROUNDS.length) {
      setRoundIdx((i) => i + 1);
      setChosenId(null);
    } else {
      setCompleted(true);
      saveChallengeScore(score);
    }
  };

  const handleRestart = () => {
    setStarted(true);
    setRoundIdx(0);
    setChosenId(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b101d]/85 p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {t.challengeTitle}
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-400">{t.challengeSubtitle}</p>
        </div>

        {started && !completed && (
          <div className="font-mono text-xs tabular-nums text-slate-300">
            {roundIdx + 1} / {CHALLENGE_ROUNDS.length} · {t.challengeScoreLabel}: {score}
          </div>
        )}
      </div>

      {!started ? (
        <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {ELEMENTS_LIST.map((el) => (
              <div
                key={el.id}
                className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-900/70 px-3.5 py-2.5 text-center"
              >
                <span className="font-mono text-[11px] text-slate-400 tabular-nums">
                  {el.atomicNumber}
                </span>
                <span className={`font-display text-xl font-bold ${el.theme.accentTextClass}`}>
                  {el.symbol}
                </span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-violet-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.challengeStartBtn}
          </button>
        </div>
      ) : completed ? (
        <div className="mt-6 text-center py-4">
          <p className="font-mono text-4xl font-bold text-violet-300 tabular-nums">
            {score} / {CHALLENGE_ROUNDS.length}
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            {t.challengeRestartBtn}
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
            {currentRound.clue[language]}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ELEMENTS_LIST.map((el) => {
              const isAnswered = chosenId !== null;
              const isCorrect = el.id === currentRound.answerId;
              const isChosen = el.id === chosenId;

              let btnClass =
                'border-white/10 bg-slate-900/80 hover:border-white/30 hover:bg-slate-800';
              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-500/20';
                } else if (isChosen) {
                  btnClass = 'border-rose-500 bg-rose-500/20';
                } else {
                  btnClass = 'border-white/5 bg-slate-900/40 opacity-50';
                }
              }

              return (
                <button
                  key={el.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handlePick(el.id)}
                  className={`flex min-h-[84px] flex-col items-center justify-center rounded-xl border p-3 transition-all ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  } ${btnClass}`}
                >
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    №{el.atomicNumber}
                  </span>
                  <span className={`font-display text-2xl font-bold ${el.theme.accentTextClass}`}>
                    {el.symbol}
                  </span>
                  <span className="mt-0.5 text-xs font-medium text-slate-200">
                    {el.names[language]}
                  </span>
                </button>
              );
            })}
          </div>

          {chosenId !== null && (
            <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2.5">
                {chosenId === currentRound.answerId ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
                )}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentRound.explanation[language]}
                </p>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-lg bg-violet-500 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                {roundIdx + 1 < CHALLENGE_ROUNDS.length ? t.challengeNextBtn : t.quizFinish}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
