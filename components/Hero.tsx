'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
          alt="Ronald Hernández Studio"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/20 via-[var(--background)]/80 to-[var(--background)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-yellow-400 uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6">
            Pintor • Muralista • Historiador
          </h2>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter leading-none mb-8">
            RONALD<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
              HERNÁNDEZ
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-12">
            Explorando la intersección entre la memoria histórica, la identidad urbana y la expresión en el arte contemporáneo.
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
          >
            <a 
              href="#cuadros" 
              className="inline-flex items-center justify-center px-8 py-4 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 uppercase tracking-widest text-sm font-semibold transition-all duration-300 rounded-full group"
            >
              Explorar Galería
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-slate-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <a href="#cuadros" aria-label="Scroll Down">
          <ChevronDown size={32} className="opacity-50 hover:opacity-100 hover:text-yellow-400 transition-all cursor-pointer" />
        </a>
      </motion.div>
    </section>
  );
}
