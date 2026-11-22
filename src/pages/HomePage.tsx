import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Lightbulb, RefreshCw, RotateCcw, ScanSearch } from 'lucide-react';
import type { ElementId } from '../types/chemistry';
import { ELEMENTS_BY_ID, ELEMENTS_LIST } from '../data/elements';
import { useApp } from '../context/AppContext';
import { Atom3DExplorer } from '../components/Atom3DExplorer';
import { CompareElements } from '../components/CompareElements';
import { PeriodicChallenge } from '../components/PeriodicChallenge';
import { QRCodeCard } from '../components/QRCodeCard';

export const HomePage: React.FC = () => {
  const { language, t, progress, resetProgress } = useApp();
  const [heroAtomId, setHeroAtomId] = useState<ElementId>('au');
  const [scannedId, setScannedId] = useState<ElementId>('au');

  const allFacts = useMemo(() => {
    return ELEMENTS_LIST.flatMap((el) =>
      el.facts[language].map((text) => ({
        elementId: el.id,
        symbol: el.symbol,
        name: el.names[language],
        accentClass: el.theme.accentTextClass,
        text,
      }))
    );
  }, [language]);

  const [factIndex, setFactIndex] = useState(() => {
    const daySeed = new Date().getDate();
    return daySeed % 36;
  });

  const currentFact = allFacts[factIndex % allFacts.length] ?? allFacts[0];
  const heroElement = ELEMENTS_BY_ID[heroAtomId];
  const scannedElement = ELEMENTS_BY_ID[scannedId];

  const quizzesCompletedCount = Object.keys(progress.quizScores).length;

  return (
    <main className="relative overflow-x-hidden">
      {/* Ambient cosmic grid background */}
      <div aria-hidden="true" className="cosmic-grid pointer-events-none fixed inset-0 z-0 opacity-60" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pt-8 pb-12 sm:px-6 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Title, Subtitle, Author, CTA, Hero 3D Switcher */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-cyan-300/90">
                <span>{t.periodLabel} 6 · №79–82</span>
                <span aria-hidden="true">·</span>
                <span>Au · Hg · Tl · Pb</span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tight text-white text-balance leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 4.1vw, 3.6rem)' }}
              >
                {t.heroTitle}
              </h1>

              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
                {t.heroSubtitle}
              </p>

              <p className="text-sm font-medium text-amber-300/95">
                {t.authorLabel}: {t.authorValue}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#elements-gallery"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition-colors whitespace-nowrap"
                >
                  {t.heroCta}
                  <ArrowDown className="h-4 w-4" />
                </a>
                <a
                  href="#lab-tools"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-white/15 bg-slate-900/70 px-5 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  {t.compareTitle}
                </a>
              </div>
            </div>

            {/* Hero 3D Atom Element Switcher */}
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="mb-2.5 text-xs font-medium text-slate-400">
                {t.heroAtomSwitcherLabel}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {ELEMENTS_LIST.map((el) => {
                  const active = heroAtomId === el.id;
                  return (
                    <button
                      key={el.id}
                      type="button"
                      onClick={() => setHeroAtomId(el.id)}
                      className={`flex min-h-[44px] flex-col items-center justify-center rounded-xl border px-2 py-2 transition-colors cursor-pointer ${
                        active
                          ? `${el.theme.accentBorderClass} bg-white/10 text-white`
                          : 'border-white/10 bg-slate-900/50 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className={`font-mono text-sm font-bold ${el.theme.accentTextClass}`}>
                        {el.symbol}
                      </span>
                      <span className="text-[11px] truncate max-w-full">{el.names[language]}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2.5 text-xs text-slate-400">{t.heroExploreAtomNote}</p>
            </div>
          </div>

          {/* Right Column: Live 3D Atom Viewport */}
          <div className="lg:col-span-7 flex flex-col">
            <Atom3DExplorer element={heroElement} compact />
          </div>
        </div>
      </section>

      {/* 2. LEARNING PROGRESS STRIP */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pb-10 sm:px-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0b101d]/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <div>
              <p className="text-xs text-slate-400">{t.progressTitle}</p>
              <p className="font-mono text-lg font-bold text-white tabular-nums">
                {progress.visitedElements.length} / 4{' '}
                <span className="font-sans text-xs font-normal text-slate-400">
                  {t.progressStudied.toLowerCase()}
                </span>
              </p>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <p className="text-xs text-slate-400">{t.progressQuizzes}</p>
              <p className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
                {quizzesCompletedCount} / 4
              </p>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <p className="text-xs text-slate-400">{t.progressChallengeBest}</p>
              <p className="font-mono text-lg font-bold text-violet-300 tabular-nums">
                {progress.challengeBestScore} / 8
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetProgress}
            className="inline-flex min-h-[38px] items-center gap-1.5 self-start sm:self-auto rounded-lg border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            {t.progressResetBtn}
          </button>
        </div>
      </section>

      {/* 3. FOUR ELEMENTS GALLERY & ELEMENT SCANNER */}
      <section
        id="elements-gallery"
        className="relative z-10 mx-auto max-w-[1280px] px-4 py-10 sm:px-6"
      >
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-balance">
              {t.scannerTitle}
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-400">{t.scannerSubtitle}</p>
          </div>
        </div>

        {/* 4 Element Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {ELEMENTS_LIST.map((el) => {
            const isVisited = progress.visitedElements.includes(el.id);
            const quizScore = progress.quizScores[el.id];
            const isScanned = scannedId === el.id;

            return (
              <article
                key={el.id}
                onMouseEnter={() => setScannedId(el.id)}
                onFocus={() => setScannedId(el.id)}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border bg-[#0b101d]/90 transition-all duration-200 ${
                  isScanned
                    ? `${el.theme.accentBorderClass} shadow-xl`
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  {/* Image Slot with Zero-Broken-Image Policy */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <img
                      src={el.heroImage}
                      alt={`${el.names[language]} (${el.symbol})`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0b101d] via-[#0b101d]/25 to-transparent"
                    />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-slate-100">
                      <span className="font-bold tabular-nums drop-shadow">
                        №{el.atomicNumber}
                      </span>
                      <span className="tabular-nums text-slate-200 drop-shadow">
                        {el.atomicMass}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-baseline gap-2.5">
                        <span className={`font-display text-3xl font-extrabold ${el.theme.accentTextClass}`}>
                          {el.symbol}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white">
                          {el.names[language]}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                      <span>
                        {t.periodLabel} {el.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {t.groupLabel} {el.group}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{el.physical.densityGcm3} г/см³</span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-2">
                      {el.tagline[language]}
                    </p>

                    {(isVisited || quizScore) && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 border-t border-white/10 pt-2.5">
                        {isVisited && <span className="text-emerald-400">● {t.progressStudied}</span>}
                        {quizScore && (
                          <span className="font-mono text-slate-300 tabular-nums">
                            · {quizScore.score}/{quizScore.total}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <Link
                    to={`/element/${el.id}`}
                    className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors ${el.theme.accentBgClass} ${el.theme.accentHoverBgClass}`}
                  >
                    {t.exploreElementBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Live Element Scanner Readout Panel */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-[#080d18]/95 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <ScanSearch className={`mt-0.5 h-5 w-5 shrink-0 ${scannedElement.theme.accentTextClass}`} />
              <div>
                <p className="text-xs font-medium text-slate-400">{t.scannerHoverHint}</p>
                <div className="mt-1 flex flex-wrap items-baseline gap-2.5">
                  <span className={`font-mono text-xl font-bold ${scannedElement.theme.accentTextClass}`}>
                    {scannedElement.symbol}
                  </span>
                  <span className="font-display text-lg font-bold text-white">
                    {scannedElement.names.kz} / {scannedElement.names.ru} / {scannedElement.names.en}
                  </span>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    Z = {scannedElement.atomicNumber} · Ar = {scannedElement.atomicMass}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6 border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0">
              <div>
                <p className="text-[11px] text-slate-400">{t.electronConfigLabel}</p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-slate-100">
                  {scannedElement.atomicStructure.electronConfiguration}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{t.shellsDistributionLabel}</p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-slate-100 tabular-nums">
                  {scannedElement.atomicStructure.shells.join(', ')}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{t.meltingPointLabel}</p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-slate-100 tabular-nums">
                  {scannedElement.physical.meltingPointDisplay}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{t.oxidationStatesLabel}</p>
                <p className="mt-0.5 font-mono text-xs font-semibold text-slate-100">
                  {scannedElement.chemical.oxidationStates.split(' ')[0]}{' '}
                  {scannedElement.chemical.oxidationStates.split(' ')[1] || ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DID YOU KNOW? — FACT OF THE DAY */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-amber-500/25 bg-[#0c101b]/90 p-5 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Lightbulb className="h-4 w-4" />
                <span>{t.factOfDayTitle}</span>
                <span aria-hidden="true">·</span>
                <span className={`font-mono ${currentFact.accentClass}`}>
                  {currentFact.symbol} ({currentFact.name})
                </span>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-slate-100">
                {currentFact.text}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFactIndex((i) => (i + 1) % allFacts.length)}
              className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start sm:self-center rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm font-medium text-amber-200 hover:bg-amber-500/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="h-4 w-4" />
              {t.nextFactBtn}
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LAB TOOLS: COMPARE ELEMENTS & PERIODIC TABLE CHALLENGE */}
      <section id="lab-tools" className="relative z-10 mx-auto max-w-[1280px] px-4 py-10 sm:px-6 space-y-8">
        <CompareElements />
        <PeriodicChallenge />
      </section>

      {/* 6. QR CODES GALLERY FOR ALL 4 ELEMENTS */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            {t.qrGalleryTitle}
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">{t.qrGallerySubtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ELEMENTS_LIST.map((el) => (
            <QRCodeCard key={el.id} element={el} showOpenButton />
          ))}
        </div>
      </section>

      {/* 7. ABOUT PROJECT SECTION */}
      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pt-8 pb-16 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-[#0b101d]/85 p-6 sm:p-9">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-4 lg:col-span-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {t.aboutTitle}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {t.aboutText1}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {t.aboutText2}
              </p>
            </div>

            <div className="lg:col-span-4 border-t border-white/10 pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 space-y-3">
              <p className="text-xs font-medium text-slate-400">{t.authorLabel}</p>
              <p className="font-display text-xl font-bold text-cyan-300">{t.authorValue}</p>
              <p className="text-xs leading-relaxed text-slate-400">
                79 Au · 80 Hg · 81 Tl · 82 Pb
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
