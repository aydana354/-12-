import React, { useState } from 'react';
import { ArrowRight, FlaskConical, Play, RotateCcw } from 'lucide-react';
import type { ElementData } from '../types/chemistry';
import { useApp } from '../context/AppContext';

interface ChemicalReactionLabProps {
  element: ElementData;
}

export const ChemicalReactionLab: React.FC<ChemicalReactionLabProps> = ({ element }) => {
  const { language, t } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [simulated, setSimulated] = useState(false);

  const reaction = element.reactions[selectedIdx] ?? element.reactions[0];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setSimulated(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b101d]/85 p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <FlaskConical className={`h-5 w-5 ${element.theme.accentTextClass}`} />
          <h3 className="font-display text-lg font-semibold text-white">
            {t.reactionLabTitle}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {element.reactions.map((rxn, idx) => (
            <button
              key={rxn.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                idx === selectedIdx
                  ? `${element.theme.accentBgClass} text-slate-950 font-semibold`
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Reaction Display */}
      <div className="mt-5 space-y-5">
        <div>
          <p className="text-xs font-medium text-slate-400">
            {reaction.reactionType[language]}
          </p>
          <h4 className="mt-1 font-display text-xl font-semibold text-white">
            {reaction.title[language]}
          </h4>
        </div>

        {/* Visual Chamber */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#060911] p-5 sm:p-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Reactants Node */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-medium text-slate-400">{t.reactionReactants}</span>
              <div
                className="mt-2 rounded-lg border border-white/10 p-3.5 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${reaction.visualColorFrom}22, rgba(15,23,42,0.8))`,
                }}
              >
                <p className="text-sm font-medium text-slate-100">{reaction.reactants[language]}</p>
              </div>
            </div>

            {/* Transition Arrow & Conditions */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-transform duration-300 ${
                  simulated ? 'scale-110 border-white/40' : 'border-white/15'
                }`}
                style={{
                  backgroundColor: simulated ? `${reaction.visualColorTo}33` : 'rgba(15,23,42,0.9)',
                }}
              >
                <ArrowRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    simulated ? 'translate-x-0.5 text-white' : 'text-slate-400'
                  }`}
                />
              </div>
              <span className="max-w-[200px] text-center text-[11px] leading-snug text-slate-400">
                {reaction.conditions[language]}
              </span>
            </div>

            {/* Products Node */}
            <div className="flex-1 text-center md:text-right">
              <span className="text-xs font-medium text-slate-400">{t.reactionProducts}</span>
              <div
                className={`mt-2 rounded-lg border p-3.5 transition-all duration-300 ${
                  simulated ? 'border-white/30 opacity-100' : 'border-white/10 opacity-60'
                }`}
                style={{
                  background: simulated
                    ? `linear-gradient(135deg, ${reaction.visualColorTo}33, rgba(15,23,42,0.9))`
                    : 'rgba(15,23,42,0.5)',
                }}
              >
                <p className="text-sm font-medium text-slate-100">{reaction.products[language]}</p>
              </div>
            </div>
          </div>

          {/* Balanced Equation Banner */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row">
            <div className="w-full overflow-x-auto text-center sm:text-left">
              <code className="font-mono text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap">
                {reaction.equation}
              </code>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!simulated ? (
                <button
                  type="button"
                  onClick={() => setSimulated(true)}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-slate-950 transition-colors cursor-pointer whitespace-nowrap ${element.theme.accentBgClass} ${element.theme.accentHoverBgClass}`}
                >
                  <Play className="h-3.5 w-3.5" />
                  {t.reactionSimulateBtn}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSimulated(false)}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/15 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t.reactionResetBtn}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scientific Explanation */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-300">{t.reactionExplanation}</p>
          <p className="text-sm leading-relaxed text-slate-300">{reaction.explanation[language]}</p>
        </div>
      </div>
    </div>
  );
};
