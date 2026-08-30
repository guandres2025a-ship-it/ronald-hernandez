'use client';

import { useLanguage } from './LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-transparent py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/55 sm:px-6 lg:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} Ronald Hernández. {t.footer.rights}
        </p>
        <p className="text-white/35">{t.footer.artist}</p>
      </div>
    </footer>
  );
}
