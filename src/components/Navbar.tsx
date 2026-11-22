import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ELEMENTS_LIST } from '../data/elements';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useApp();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06080f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Single-line Brand Title */}
        <Link
          to="/"
          className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 hover:text-cyan-300 transition-colors"
        >
          {t.brandTitle}
        </Link>

        {/* Zone 2: Concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          <Link
            to="/"
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              isHome
                ? 'border-cyan-400 text-white'
                : 'border-transparent hover:text-white hover:border-white/30'
            }`}
          >
            {t.navHome}
          </Link>
          {ELEMENTS_LIST.map((el) => {
            const path = `/element/${el.id}`;
            const active = location.pathname === path;
            return (
              <Link
                key={el.id}
                to={path}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 tabular-nums ${
                  active
                    ? `${el.theme.accentTextClass} border-current`
                    : 'border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {el.symbol} · {el.atomicNumber}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Language Switcher (KZ / RU) + Mobile menu trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            role="group"
            aria-label="Language switch"
            className="inline-flex items-center rounded-lg border border-white/10 bg-slate-900/90 p-0.5"
          >
            <button
              type="button"
              onClick={() => setLanguage('kz')}
              className={`min-h-[34px] px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'kz'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              KZ
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ru')}
              className={`min-h-[34px] px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                language === 'ru'
                  ? 'bg-cyan-400 text-slate-950'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              RU
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-900/80 text-slate-200 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#06080f] px-4 py-3">
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className={`flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium ${
                isHome ? 'bg-white/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {t.navHome}
            </Link>
            {ELEMENTS_LIST.map((el) => {
              const path = `/element/${el.id}`;
              const active = location.pathname === path;
              return (
                <Link
                  key={el.id}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3 text-sm font-medium ${
                    active
                      ? `bg-white/10 ${el.theme.accentTextClass}`
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>
                    {el.symbol} — {el.names[language]}
                  </span>
                  <span className="font-mono text-xs text-slate-400 tabular-nums">
                    №{el.atomicNumber}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
