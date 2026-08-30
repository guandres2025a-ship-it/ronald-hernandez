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

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({
  children,
}: LanguageProviderProps) {
  const [language, setLanguageState] =
    useState<Language>('ES');

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem('ronald-language');

    if (
      savedLanguage === 'ES' ||
      savedLanguage === 'EN'
    ) {
      window.setTimeout(() => setLanguageState(savedLanguage), 0);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);

    localStorage.setItem(
      'ronald-language',
      newLanguage,
    );
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
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