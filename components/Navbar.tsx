'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', id: '' },
  { name: 'Cuadros', id: 'cuadros' },
  { name: 'Murales', id: 'murales' },
  { name: 'Biografía', id: 'biografia' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === '') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }

    // Limpia la URL
    window.history.replaceState({}, '', window.location.pathname);

    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? 'pt-3' : 'pt-0'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 transition-all duration-500 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-full border border-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] ${
            scrolled ? 'bg-black/60' : 'bg-black/30'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('')}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-white/90"
          >
            Ronald <span className="text-[var(--accent)]">Hernández</span>
          </button>

          {/* Desktop */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Botón móvil */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Abrir menú"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-4 mt-3 rounded-[1.5rem] border border-white/10 bg-black/80 px-4 py-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full rounded-2xl px-3 py-3 text-left text-sm font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left bg-[var(--accent)]"
        style={{ scaleX }}
      />
    </nav>
  );
}