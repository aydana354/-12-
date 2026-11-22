import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ELEMENTS_LIST } from '../data/elements';

export const Footer: React.FC = () => {
  const { language, t } = useApp();

  return (
    <footer className="border-t border-white/10 bg-[#05070d] py-10 text-slate-400">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-2">
            <p className="font-display text-lg font-semibold text-slate-100">
              {t.brandTitle}
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">{t.footerRights}</p>
            <p className="pt-2 text-sm font-semibold text-cyan-300">
              {t.authorLabel}: {t.authorValue}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-slate-300">
              {t.footerElementsTitle}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 sm:flex sm:flex-wrap sm:gap-6">
              {ELEMENTS_LIST.map((el) => (
                <Link
                  key={el.id}
                  to={`/element/${el.id}`}
                  className="text-sm text-slate-300 hover:text-white transition-colors whitespace-nowrap"
                >
                  <span className={`font-mono font-semibold ${el.theme.accentTextClass}`}>
                    {el.symbol}
                  </span>{' '}
                  · {el.names[language]} ({el.atomicNumber})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
