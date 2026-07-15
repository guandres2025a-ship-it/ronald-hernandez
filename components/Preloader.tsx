'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos un tiempo de carga elegante mientras optimizamos o leemos assets
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--background)] px-4"
        >
          <div className="overflow-hidden max-w-sm sm:max-w-2xl">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-widest uppercase font-serif text-center leading-tight"
            >
              Ronald<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">Hernández</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-4">
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 tracking-[0.3em] text-xs sm:text-sm md:text-base font-light text-center"
            >
              STUDIO
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
