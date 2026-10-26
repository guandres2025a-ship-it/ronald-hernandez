'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import es from '../locales/es';
import en from '../locales/en';
import fr from '../locales/fr';
import pt from '../locales/pt';
import it from '../locales/it';
import de from '../locales/de';
import ja from '../locales/ja';

const translations = {
  ES: es,
  EN: en,
  FR: fr,
  PT: pt,
  IT: it,
  DE: de,
  JA: ja,
};

export type Language = keyof typeof translations;

type TranslationData = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationData;
}

const LANGUAGE_STORAGE_KEY = 'ronald-language';

const htmlLanguage: Record<Language, string> = {
  ES: 'es',
  EN: 'en',
  FR: 'fr',
  PT: 'pt',
  IT: 'it',
  DE: 'de',
  JA: 'ja',
};

function isLanguage(value: string | null): value is Language {
  return value !== null && Object.prototype.hasOwnProperty.call(translations, value);
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('ES');

  useEffect(() => {
    // Restore every supported language, not only Spanish and English.
    try {
      const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguage(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    } catch {
      // The site remains usable if browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    // Keep assistive technology and browser language tools in sync with the UI.
    document.documentElement.lang = htmlLanguage[language];
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    } catch {
      // Language selection still works for the current visit without storage.
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage debe utilizarse dentro de LanguageProvider',
    );
  }

  return context;
}
