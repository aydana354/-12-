import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ElementId, Language, LearningProgressState } from '../types/chemistry';
import { UI_STRINGS, type UIStrings } from '../data/uiStrings';

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: UIStrings;
  progress: LearningProgressState;
  markElementVisited: (id: ElementId) => void;
  saveQuizScore: (id: ElementId, score: number, total: number) => void;
  saveChallengeScore: (score: number) => void;
  resetProgress: () => void;
}

const STORAGE_LANG_KEY = 'chem_universe_lang_v1';
const STORAGE_PROGRESS_KEY = 'chem_universe_progress_v1';

const DEFAULT_PROGRESS: LearningProgressState = {
  visitedElements: [],
  quizScores: {},
  challengeBestScore: 0,
};

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved === 'kz' || saved === 'ru') return saved;
    } catch {
      // ignore storage access issues
    }
    return 'ru';
  });

  const [progress, setProgress] = useState<LearningProgressState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LearningProgressState>;
        return {
          visitedElements: Array.isArray(parsed.visitedElements) ? parsed.visitedElements : [],
          quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
          challengeBestScore: typeof parsed.challengeBestScore === 'number' ? parsed.challengeBestScore : 0,
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'kz' ? 'kk' : 'ru';
  }, [language]);

  const persistProgress = (next: LearningProgressState) => {
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const markElementVisited = (id: ElementId) => {
    setProgress((prev) => {
      if (prev.visitedElements.includes(id)) return prev;
      const next: LearningProgressState = {
        ...prev,
        visitedElements: [...prev.visitedElements, id],
      };
      persistProgress(next);
      return next;
    });
  };

  const saveQuizScore = (id: ElementId, score: number, total: number) => {
    setProgress((prev) => {
      const prevScore = prev.quizScores[id]?.score ?? -1;
      const best = Math.max(prevScore, score);
      const next: LearningProgressState = {
        ...prev,
        visitedElements: prev.visitedElements.includes(id)
          ? prev.visitedElements
          : [...prev.visitedElements, id],
        quizScores: {
          ...prev.quizScores,
          [id]: { score: best, total },
        },
      };
      persistProgress(next);
      return next;
    });
  };

  const saveChallengeScore = (score: number) => {
    setProgress((prev) => {
      if (score <= prev.challengeBestScore) return prev;
      const next: LearningProgressState = {
        ...prev,
        challengeBestScore: score,
      };
      persistProgress(next);
      return next;
    });
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    persistProgress(DEFAULT_PROGRESS);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: UI_STRINGS[language],
        progress,
        markElementVisited,
        saveQuizScore,
        saveChallengeScore,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
