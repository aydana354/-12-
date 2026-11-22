import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import type { ElementId } from '../types/chemistry';
import { ELEMENTS_BY_ID, ELEMENTS_LIST } from '../data/elements';
import { useApp } from '../context/AppContext';

export const CompareElements: React.FC = () => {
  const { language, t } = useApp();
  const [leftId, setLeftId] = useState<ElementId>('au');
  const [rightId, setRightId] = useState<ElementId>('hg');

  const left = ELEMENTS_BY_ID[leftId];
  const right = ELEMENTS_BY_ID[rightId];

  const maxDensity = 20; // g/cm³ scale
  const maxBoil = 3000; // °C scale
  const maxMelt = 1150; // °C scale (offset for negative Hg)

  const rows = [
    {
      label: t.atomicNumberLabel,
      valA: `№${left.atomicNumber}`,
      valB: `№${right.atomicNumber}`,
      barA: (left.atomicNumber / 85) * 100,
      barB: (right.atomicNumber / 85) * 100,
    },
    {
      label: t.atomicMassLabel,
      valA: left.atomicMass,
      valB: right.atomicMass,
      barA: (left.atomicMassNumeric / 220) * 100,
      barB: (right.atomicMassNumeric / 220) * 100,
    },
    {
      label: t.densityLabel,
      valA: `${left.physical.densityGcm3} г/см³`,
      valB: `${right.physical.densityGcm3} г/см³`,
      barA: (left.physical.densityGcm3 / maxDensity) * 100,
      barB: (right.physical.densityGcm3 / maxDensity) * 100,
    },
    {
      label: t.meltingPointLabel,
      valA: left.physical.meltingPointDisplay,
      valB: right.physical.meltingPointDisplay,
      barA: Math.max(4, ((left.physical.meltingPointC + 50) / maxMelt) * 100),
      barB: Math.max(4, ((right.physical.meltingPointC + 50) / maxMelt) * 100),
    },
    {
      label: t.boilingPointLabel,
      valA: left.physical.boilingPointDisplay,
      valB: right.physical.boilingPointDisplay,
      barA: (left.physical.boilingPointC / maxBoil) * 100,
      barB: (right.physical.boilingPointC / maxBoil) * 100,
    },
    {
      label: t.electronConfigLabel,
      valA: left.atomicStructure.electronConfiguration,
      valB: right.atomicStructure.electronConfiguration,
    },
    {
      label: t.oxidationStatesLabel,
      valA: left.chemical.oxidationStates,
      valB: right.chemical.oxidationStates,
    },
    {
      label: t.electronegativityLabel,
      valA: String(left.atomicStructure.electronegativityPauling),
      valB: String(right.atomicStructure.electronegativityPauling),
      barA: (left.atomicStructure.electronegativityPauling / 4) * 100,
      barB: (right.atomicStructure.electronegativityPauling / 4) * 100,
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0b101d]/85 p-5 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-cyan-400" />
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {t.compareTitle}
            </h3>
          </div>
          <p className="mt-1 text-sm text-slate-400">{t.compareSubtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="compare-a" className="text-xs text-slate-400">
              {t.compareLeftLabel}:
            </label>
            <select
              id="compare-a"
              value={leftId}
              onChange={(e) => setLeftId(e.target.value as ElementId)}
              className="min-h-[40px] rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-sm font-medium text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              {ELEMENTS_LIST.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.symbol} — {el.names[language]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="compare-b" className="text-xs text-slate-400">
              {t.compareRightLabel}:
            </label>
            <select
              id="compare-b"
              value={rightId}
              onChange={(e) => setRightId(e.target.value as ElementId)}
              className="min-h-[40px] rounded-lg border border-white/15 bg-slate-900 px-3 py-1.5 text-sm font-medium text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
            >
              {ELEMENTS_LIST.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.symbol} — {el.names[language]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Column Headers */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className={`font-mono text-2xl font-bold ${left.theme.accentTextClass}`}>
              {left.symbol}
            </span>
            <span className="ml-2 font-display text-lg font-semibold text-white">
              {left.names[language]}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            Z = {left.atomicNumber} · {left.group}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className={`font-mono text-2xl font-bold ${right.theme.accentTextClass}`}>
              {right.symbol}
            </span>
            <span className="ml-2 font-display text-lg font-semibold text-white">
              {right.names[language]}
            </span>
          </div>
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            Z = {right.atomicNumber} · {right.group}
          </span>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="mt-2 divide-y divide-white/10">
        {rows.map((row) => (
          <div key={row.label} className="py-3.5">
            <p className="mb-2 text-xs font-medium text-slate-400">{row.label}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6">
              <div>
                <p className="font-mono text-sm font-semibold text-slate-100 tabular-nums">
                  {row.valA}
                </p>
                {typeof row.barA === 'number' && (
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${left.theme.accentBgClass}`}
                      style={{ width: `${Math.min(100, row.barA)}%` }}
                    />
                  </div>
                )}
              </div>

              <div>
                <p className="font-mono text-sm font-semibold text-slate-100 tabular-nums">
                  {row.valB}
                </p>
                {typeof row.barB === 'number' && (
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${right.theme.accentBgClass}`}
                      style={{ width: `${Math.min(100, row.barB)}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
