'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

export default function Preloader() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Keep the intro brief so it feels intentional rather than delaying the visit.
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  const motionDuration = reduceMotion ? 0 : 0.85;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: '-8vh' }}
          transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Ronald Hernández"
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[var(--background)] px-5"
        >
          {/* Restrained ambient light gives the intro depth without competing with the name. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[42%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,188,127,0.10)_0%,rgba(217,188,127,0.035)_38%,transparent_72%)] blur-2xl" />
            <div className="absolute inset-x-8 top-8 bottom-8 border border-white/[0.045] sm:inset-x-12 sm:top-12 sm:bottom-12" />
          </div>

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
            <div className="w-full overflow-hidden px-1">
              <motion.h1
                initial={{ y: reduceMotion ? 0 : 36, opacity: reduceMotion ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: motionDuration, ease: [0.76, 0, 0.24, 1] }}
                className="mx-auto flex w-full flex-col items-center font-serif text-[clamp(3rem,8vw,6.75rem)] font-medium uppercase leading-[0.94] tracking-[0.055em] text-white"
              >
                <span>Ronald</span>
                <span className="mt-2 bg-gradient-to-r from-[#f0dfb5] via-[#d9bc7f] to-[#a9874c] bg-clip-text text-transparent">
                  Hernández
                </span>
              </motion.h1>
            </div>

            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : 0.25, ease: [0.76, 0, 0.24, 1] }}
              className="mt-8 h-px w-20 origin-center bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent sm:mt-10 sm:w-28"
            />

            <div className="mt-5 overflow-hidden sm:mt-6">
              <motion.p
                initial={{ y: reduceMotion ? 0 : 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.25 }}
                className="text-center text-[10px] font-light uppercase tracking-[0.28em] text-white/55 sm:text-xs sm:tracking-[0.38em]"
              >
                {t.preloader.studio}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
