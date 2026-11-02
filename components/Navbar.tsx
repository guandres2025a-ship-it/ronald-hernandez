'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Menu, Music2, X } from 'lucide-react';
import { useLanguage, type Language } from './LanguageContext';
import MusicPlayer from './MusicPlayer';
import { useMusicPlayer } from './MusicPlayerContext';

const navLinks = [
  { key: 'home', id: '' },
  { key: 'paintings', id: 'cuadros' },
  { key: 'murals', id: 'murales' },
  { key: 'biography', id: 'biografia' },
] as const;

const languages: { code: Language; name: string }[] = [
  { code: 'ES', name: 'Español' },
  { code: 'EN', name: 'English' },
  { code: 'FR', name: 'Français' },
  { code: 'PT', name: 'Português' },
  { code: 'IT', name: 'Italiano' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'JA', name: '日本語' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { currentSong, isPlaying } = useMusicPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    if (id) document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
    else window.scrollTo({ top: 0, behavior });
    window.history.replaceState({}, '', window.location.pathname);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-0'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center pb-2 pt-2">
          <div className="flex max-w-[min(92vw,28rem)] items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-1.5 shadow-lg backdrop-blur-xl" aria-live="polite" aria-atomic="true">
            <Music2 size={12} className={isPlaying ? 'animate-pulse text-[var(--accent)]' : 'text-white/45'} />
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/40">{t.music.nowPlaying}</span>
            <span className="max-w-[13rem] truncate text-[11px] font-medium text-white/90 sm:max-w-[19rem]">{currentSong?.title || t.music.track}</span>
          </div>
        </div>
        <div className={`relative flex items-center justify-between rounded-full border border-white/10 px-4 py-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl ${scrolled ? 'bg-black/70' : 'bg-black/30'}`}>
          <button onClick={() => scrollToSection('')} className="shrink-0 text-sm font-semibold uppercase tracking-[0.3em] text-white/90 hover:opacity-80">
            Ronald <span className="text-[var(--accent)]">Hernández</span>
          </button>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => <button key={link.key} onClick={() => scrollToSection(link.id)} className="text-sm font-medium text-white/60 transition-colors hover:text-white">{t.nav[link.key]}</button>)}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <div className="relative">
              <button type="button" onClick={() => setIsLanguageOpen((open) => !open)} aria-expanded={isLanguageOpen} aria-controls="desktop-language-menu" className="flex h-10 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white" aria-label={t.language.title}>
                {language}<ChevronDown size={14} className={isLanguageOpen ? 'rotate-180' : ''} />
              </button>
              <AnimatePresence>
                {isLanguageOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} id="desktop-language-menu" className="absolute right-0 top-14 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-2xl">
                  {languages.map((item) => <button key={item.code} type="button" onClick={() => { setLanguage(item.code); setIsLanguageOpen(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs ${language === item.code ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}><span>{item.name}</span><span className="text-[10px] text-white/30">{item.code}</span></button>)}
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>
          <div className="ml-auto mr-2 md:ml-0 md:mr-0"><MusicPlayer /></div>
          <button type="button" onClick={() => setIsOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white md:hidden" aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isOpen} aria-controls="mobile-navigation">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} id="mobile-navigation" className="mx-4 mt-3 rounded-[1.5rem] border border-white/10 bg-black/90 px-4 py-4 shadow-2xl backdrop-blur-xl md:hidden">
          <div className="space-y-1">{navLinks.map((link) => <button key={link.key} onClick={() => scrollToSection(link.id)} className="block w-full rounded-2xl px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.25em] text-white/70 hover:bg-white/5 hover:text-white">{t.nav[link.key]}</button>)}</div>
          <div className="my-3 h-px bg-white/10" />
          <div className="mt-3 grid grid-cols-4 gap-2">{languages.map((item) => <button key={item.code} type="button" onClick={() => { setLanguage(item.code); setIsOpen(false); }} className={`rounded-xl px-2 py-2 text-xs font-medium ${language === item.code ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>{item.code}</button>)}</div>
        </motion.div>}
      </AnimatePresence>
      <motion.div className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[var(--accent)]" style={{ scaleX }} />
    </nav>
  );
}
