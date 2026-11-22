import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  BookOpen,
  Compass,
  ExternalLink,
  FlaskConical,
  Gem,
  HeartPulse,
  History,
  Microscope,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { ELEMENTS_BY_ID, ELEMENTS_LIST, isValidElementId } from '../data/elements';
import { useApp } from '../context/AppContext';
import { ElementThematicBackdrop } from '../components/ElementThematicBackdrop';
import { Atom3DExplorer } from '../components/Atom3DExplorer';
import { ChemicalReactionLab } from '../components/ChemicalReactionLab';
import { ElementQuiz } from '../components/ElementQuiz';
import { QRCodeCard } from '../components/QRCodeCard';

export const ElementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t, markElementVisited } = useApp();

  const validId = isValidElementId(id) ? id : null;
  const element = validId ? ELEMENTS_BY_ID[validId] : ELEMENTS_BY_ID.au;

  useEffect(() => {
    if (!validId) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
    markElementVisited(validId);
  }, [validId]);

  if (!validId) {
    return <Navigate to="/" replace />;
  }

  const currentIdx = ELEMENTS_LIST.findIndex((el) => el.id === validId);
  const prevEl = ELEMENTS_LIST[(currentIdx - 1 + ELEMENTS_LIST.length) % ELEMENTS_LIST.length];
  const nextEl = ELEMENTS_LIST[(currentIdx + 1) % ELEMENTS_LIST.length];

  const sectionLinks = [
    { href: '#sec-1', label: t.sec1Title },
    { href: '#sec-2', label: t.sec2Title },
    { href: '#sec-3', label: t.sec3Title },
    { href: '#sec-4', label: t.sec4Title },
    { href: '#sec-5', label: t.sec5Title },
    { href: '#sec-6', label: t.sec6Title },
    { href: '#sec-7', label: t.sec7Title },
    { href: '#sec-8', label: t.sec8Title },
    { href: '#sec-9', label: t.sec9Title },
    { href: '#sec-10', label: t.sec10Title },
    { href: '#sec-11', label: t.sec11Title },
  ];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: element.theme.bgCanvas }}
    >
      <ElementThematicBackdrop elementId={element.id} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:py-10">
        {/* Top Breadcrumb & Prev/Next Element Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <Link
            to="/"
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToAllBtn}
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={`/element/${prevEl.id}`}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {prevEl.symbol} · {prevEl.names[language]}
            </Link>
            <Link
              to={`/element/${nextEl.id}`}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            >
              {nextEl.symbol} · {nextEl.names[language]}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* HERO DIGITAL PASSPORT BANNER */}
        <section className="py-8 lg:py-10">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-medium text-slate-400">
                  {t.passportLabel} · {t.periodLabel} {element.period} · {t.groupLabel} {element.group}
                </p>

                <div className="mt-3 flex flex-wrap items-baseline gap-4">
                  <span
                    className={`font-display text-6xl sm:text-7xl font-extrabold tracking-tight ${element.theme.accentTextClass}`}
                  >
                    {element.symbol}
                  </span>
                  <div>
                    <h1 className="font-display text-3xl sm:text-5xl font-bold text-white text-balance">
                      {element.names[language]}
                    </h1>
                    <p className="mt-1 font-mono text-sm text-slate-400">
                      {element.names.kz} · {element.names.ru} · {element.names.en} ({element.names.latin})
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
                  {element.tagline[language]}
                </p>
              </div>

              {/* Key Atomic Telemetry Row */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 sm:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-400">{t.atomicNumberLabel}</p>
                  <p className={`mt-1 font-mono text-2xl font-bold tabular-nums ${element.theme.accentTextClass}`}>
                    {element.atomicNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.atomicMassLabel}</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-white tabular-nums">
                    {element.atomicMass}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.densityLabel}</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-white tabular-nums">
                    {element.physical.densityGcm3}{' '}
                    <span className="text-xs font-normal text-slate-400">г/см³</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{t.meltingPointLabel}</p>
                  <p className="mt-1 font-mono text-xl sm:text-2xl font-bold text-white tabular-nums">
                    {element.physical.meltingPointDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* Specimen Hero Image */}
            <div className="lg:col-span-5">
              <figure className="h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 flex flex-col">
                <div className="relative flex-1 min-h-[240px]">
                  <img
                    src={element.heroImage}
                    alt={element.heroImageCaption[language]}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">
                  {element.heroImageCaption[language]}
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Horizontal Section Quick Navigation */}
          <nav
            aria-label="Passport Sections"
            className="mt-8 flex flex-wrap gap-2 border-y border-white/10 py-3"
          >
            {sectionLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </section>

        {/* SECTION 01: GENERAL INFORMATION */}
        <section id="sec-1" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <BookOpen className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec1Title}</h2>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs text-slate-400">{t.nameKzLabel}</dt>
                <dd className="mt-1 text-base font-semibold text-white">{element.names.kz}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.nameRuLabel}</dt>
                <dd className="mt-1 text-base font-semibold text-white">{element.names.ru}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.nameEnLabel} / {t.nameLatinLabel}</dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  {element.names.en} ({element.names.latin})
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.symbolLabel} · {t.atomicNumberLabel}</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-white tabular-nums">
                  {element.symbol} · №{element.atomicNumber}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.atomicMassLabel}</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-white tabular-nums">
                  {element.atomicMass}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.periodLabel} · {t.groupLabel}</dt>
                <dd className="mt-1 text-base font-semibold text-white">
                  {element.period} · {element.group} ({element.block})
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.elementTypeLabel}</dt>
                <dd className="mt-1 text-sm text-slate-200">{element.elementType[language]}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-slate-400">{t.discovererLabel}</dt>
                <dd className="mt-1 text-sm text-slate-200">
                  {element.general.discoverer[language]} ({element.general.discoveryYear})
                </dd>
              </div>
            </dl>

            <div className="mt-6 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 lg:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.discoveryHistoryLabel}</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200">
                  {element.general.discoveryHistory[language]}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.nameOriginLabel}</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200">
                  {element.general.nameOrigin[language]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: ATOMIC STRUCTURE + 3D ATOM EXPLORER */}
        <section id="sec-2" className="scroll-mt-20 py-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <Atom className={`h-6 w-6 ${element.theme.accentTextClass}`} />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t.sec2Title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Interactive 3D Atom Stage */}
            <div className="lg:col-span-7">
              <Atom3DExplorer element={element} />
            </div>

            {/* Atomic Parameters Table */}
            <div
              className="lg:col-span-5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between"
              style={{ backgroundColor: element.theme.surfaceTint }}
            >
              <dl className="divide-y divide-white/10">
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.isotopeLabel}</dt>
                  <dd className={`font-mono text-base font-bold ${element.theme.accentTextClass}`}>
                    {element.atomicStructure.isotopeName}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.protonsLabel}</dt>
                  <dd className="font-mono text-base font-semibold text-white tabular-nums">
                    {element.atomicStructure.protons}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.neutronsLabel}</dt>
                  <dd className="font-mono text-base font-semibold text-white tabular-nums">
                    {element.atomicStructure.neutrons}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.electronsLabel}</dt>
                  <dd className="font-mono text-base font-semibold text-white tabular-nums">
                    {element.atomicStructure.electrons}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.nuclearChargeLabel}</dt>
                  <dd className="font-mono text-base font-semibold text-white tabular-nums">
                    {element.atomicStructure.nuclearCharge}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-xs text-slate-400">{t.electronConfigLabel}</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold text-white">
                    {element.atomicStructure.electronConfiguration}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-xs text-slate-400">{t.shellsDistributionLabel}</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">
                    {element.atomicStructure.shells.join(', ')}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.energyLevelsLabel}</dt>
                  <dd className="font-mono text-base font-semibold text-white tabular-nums">
                    {element.atomicStructure.energyLevels}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.valenceElectronsLabel}</dt>
                  <dd className="font-mono text-base font-semibold text-white tabular-nums">
                    {element.atomicStructure.valenceShellElectrons}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xs text-slate-400">{t.atomicRadiusLabel}</dt>
                  <dd className="font-mono text-sm font-semibold text-white tabular-nums">
                    {element.atomicStructure.atomicRadiusPm} пм
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* SECTION 03: PHYSICAL PROPERTIES + SPECIAL TOPICS */}
        <section id="sec-3" className="scroll-mt-20 py-8 space-y-6">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <Compass className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec3Title}</h2>
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-xs text-slate-400">{t.stateStpLabel}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">
                  {element.physical.stateAtSTP[language]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.colorLabel}</dt>
                <dd className="mt-1 text-sm text-slate-200">{element.physical.color[language]}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.densityLabel}</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">
                  {element.physical.densityDisplay[language]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.meltingPointLabel}</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">
                  {element.physical.meltingPointDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.boilingPointLabel}</dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-white tabular-nums">
                  {element.physical.boilingPointDisplay}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.hardnessLabel}</dt>
                <dd className="mt-1 text-sm text-slate-200">{element.physical.hardnessMohs}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.electricalCondLabel}</dt>
                <dd className="mt-1 font-mono text-sm text-slate-200">
                  {element.physical.electricalConductivity[language]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.thermalCondLabel}</dt>
                <dd className="mt-1 font-mono text-sm text-slate-200">
                  {element.physical.thermalConductivity[language]}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400">{t.crystalStructureLabel}</dt>
                <dd className="mt-1 text-sm text-slate-200">
                  {element.physical.crystalStructure[language]}
                </dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-white/10 pt-5">
              <h3 className="text-xs font-semibold text-slate-400">{t.specialFeaturesLabel}</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200">
                {element.physical.specialFeatures[language]}
              </p>
            </div>
          </div>

          {/* Element-Specific Deep-Dive Scientific Topics */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold text-slate-200">
              {t.specialTopicsTitle}
            </h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {element.specialTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 p-6"
                  style={{ backgroundColor: element.theme.surfaceTint }}
                >
                  <h4 className={`font-display text-lg font-bold ${element.theme.accentTextClass}`}>
                    {topic.title[language]}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {topic.content[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 04: CHEMICAL PROPERTIES */}
        <section id="sec-4" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <FlaskConical className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec4Title}</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.oxidationStatesLabel}</h3>
                <p className={`mt-1.5 font-mono text-base font-bold ${element.theme.accentTextClass}`}>
                  {element.chemical.oxidationStates}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.reactivityLabel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {element.chemical.reactivity[language]}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.withOxygenLabel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {element.chemical.withOxygen[language]}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.withWaterLabel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {element.chemical.withWater[language]}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.withAcidsLabel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {element.chemical.withAcids[language]}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400">{t.withOthersLabel}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                  {element.chemical.withOtherElements[language]}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <h3 className="text-xs font-semibold text-slate-400">{t.compoundsLabel}</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {element.chemical.characteristicCompounds[language].map((comp, idx) => (
                  <li key={idx} className="text-sm text-slate-200 font-mono">
                    · {comp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 05: CHEMICAL REACTIONS & LAB */}
        <section id="sec-5" className="scroll-mt-20 py-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <FlaskConical className={`h-6 w-6 ${element.theme.accentTextClass}`} />
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t.sec5Title}
            </h2>
          </div>

          <ChemicalReactionLab element={element} />

          {/* Complete list of all verified reactions for quick study */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {element.reactions.map((rxn) => (
              <div
                key={rxn.id}
                className="rounded-xl border border-white/10 p-5 space-y-2.5"
                style={{ backgroundColor: element.theme.surfaceTint }}
              >
                <p className="text-xs text-slate-400">{rxn.reactionType[language]}</p>
                <h3 className="font-display text-base font-bold text-white">
                  {rxn.title[language]}
                </h3>
                <div className="overflow-x-auto rounded-lg bg-[#050811] px-3 py-2">
                  <code className={`font-mono text-sm font-bold ${element.theme.accentTextClass} whitespace-nowrap`}>
                    {rxn.equation}
                  </code>
                </div>
                <p className="text-xs text-slate-400">
                  {t.reactionConditions}: {rxn.conditions[language]}
                </p>
                <p className="text-sm leading-relaxed text-slate-300">
                  {rxn.explanation[language]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 06: NATURAL OCCURRENCE & MINERAL PHOTOGRAPHY */}
        <section id="sec-6" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <Gem className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec6Title}</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <h3 className="text-xs font-semibold text-slate-400">{t.mineralsLabel}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {element.nature.minerals[language].map((m, idx) => (
                      <li key={idx} className="text-sm font-medium text-white">
                        · {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400">{t.oresLabel}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {element.nature.ores[language]}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400">{t.naturalSourcesLabel}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {element.nature.naturalSources[language]}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400">{t.abundanceLabel}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {element.nature.abundance[language]}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-slate-400">{t.extractionLabel}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-200">
                    {element.nature.industrialExtraction[language]}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#050811]">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={element.mineralImage}
                      alt={element.mineralImageCaption[language]}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">
                    {element.mineralImageCaption[language]}
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 07: APPLICATIONS */}
        <section id="sec-7" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <Microscope className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec7Title}</h2>
            </div>

            <figure className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#050811]">
              <div className="aspect-[16/9] max-h-[380px] w-full overflow-hidden">
                <img
                  src={element.applicationImage}
                  alt={element.applicationImageCaption[language]}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">
                {element.applicationImageCaption[language]}
              </figcaption>
            </figure>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {element.applications.map((app) => (
                <div key={app.domain} className="space-y-2 border-t border-white/10 pt-4">
                  <h3 className={`font-display text-base font-bold ${element.theme.accentTextClass}`}>
                    {app.title[language]}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {app.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 08: HUMAN & ENVIRONMENTAL IMPACT */}
        <section id="sec-8" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec8Title}</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <h3 className="flex items-center gap-1.5 text-xs font-semibold text-rose-300">
                  <HeartPulse className="h-3.5 w-3.5" />
                  {t.toxicityLabel}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {element.impact.toxicityLevel[language]}
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-slate-400">{t.biologicalEffectLabel}</h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {element.impact.biologicalEffect[language]}
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-slate-400">{t.ecologicalLabel}</h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {element.impact.ecologicalConsequences[language]}
                </p>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-slate-400">{t.pollutionLabel}</h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {element.impact.pollutionSources[language]}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <h3 className="text-xs font-semibold text-emerald-300">{t.safetyLabel}</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200">
                {element.impact.safetyMeasures[language]}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 09: HISTORY TIMELINE */}
        <section id="sec-9" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <History className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec9Title}</h2>
            </div>

            <div className="mt-6 space-y-6">
              {element.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="relative grid grid-cols-1 gap-2 border-b border-white/10 pb-5 last:border-b-0 last:pb-0 md:grid-cols-12 md:gap-6"
                >
                  <div className="md:col-span-3">
                    <span className={`font-mono text-base font-bold ${element.theme.accentTextClass}`}>
                      {item.year}
                    </span>
                    <p className="mt-0.5 text-xs text-slate-400">{item.scientist[language]}</p>
                  </div>
                  <div className="md:col-span-9 space-y-1">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {item.title[language]}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {item.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: INTERESTING FACTS */}
        <section id="sec-10" className="scroll-mt-20 py-8">
          <div
            className="rounded-2xl border border-white/10 p-6 sm:p-8"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
              <Sparkles className={`h-5 w-5 ${element.theme.accentTextClass}`} />
              <h2 className="font-display text-2xl font-bold text-white">{t.sec10Title}</h2>
            </div>

            <ol className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {element.facts[language].map((fact, idx) => (
                <li
                  key={idx}
                  className="flex gap-3.5 border-b border-white/10 pb-4 last:border-b-0"
                >
                  <span className={`font-mono text-sm font-bold tabular-nums ${element.theme.accentTextClass}`}>
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <p className="text-sm leading-relaxed text-slate-200">{fact}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECTION 11: MINI-TEST + QR CODE + SCIENTIFIC SOURCES */}
        <section id="sec-11" className="scroll-mt-20 py-8 space-y-8">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t.sec11Title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <ElementQuiz element={element} />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <QRCodeCard element={element} showOpenButton={false} />
            </div>
          </div>

          {/* Scientific Sources */}
          <div
            className="rounded-2xl border border-white/10 p-6"
            style={{ backgroundColor: element.theme.surfaceTint }}
          >
            <h3 className="font-display text-lg font-bold text-white">{t.sourcesTitle}</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {element.sources.map((src, idx) => (
                <li key={idx} className="text-sm">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-slate-200 hover:text-cyan-300 transition-colors"
                  >
                    <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>
                      <span className="font-medium">{src.title}</span>
                      <span className="block text-xs text-slate-400">{src.publisher}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
