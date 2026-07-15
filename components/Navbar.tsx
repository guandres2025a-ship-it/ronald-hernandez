'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#' },
  { name: 'Cuadros', href: '#cuadros' },
  { name: 'Murales', href: '#murales' },
  { name: 'Biografía', href: '#biografia' },
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'pt-3' : 'pt-0'}`}>
      <div className={`mx-auto max-w-7xl px-4 transition-all duration-500 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] ${scrolled ? 'bg-black/60' : 'bg-black/30'}`}>
          <Link href="#" className="text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
            Ronald <span className="text-[var(--accent)]">Hernández</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>

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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-4 mt-3 rounded-[1.5rem] border border-white/10 bg-black/80 px-4 py-4 shadow-2xl backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-3 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="absolute bottom-0 left-0 right-0 h-[1px] origin-left bg-[var(--accent)]" style={{ scaleX }} />
    </nav>
  );
}
