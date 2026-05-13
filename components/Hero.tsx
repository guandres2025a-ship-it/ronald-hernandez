'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background with Gallery Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
          alt="Ronald Hernández Artist"
          fill
          className="object-cover opacity-40 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        {/* Top Spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.05)_0%,transparent_50%)] pointer-events-none" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-yellow-500 uppercase text-xs font-bold block"
            >
              Exhibición Antológica
            </motion.span>
            <div className="w-12 h-px bg-yellow-500/30 mx-auto" />
          </div>

          <h1 className="text-7xl md:text-[120px] font-serif font-light text-white tracking-tighter leading-none">
            Ronald <span className="font-normal italic">Hernández</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
            Pintor, Muralista e Historiador. <br/>
            <span className="text-white/60">Explorando la memoria colectiva a través del color y la forma.</span>
          </p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="pt-12"
          >
            <a 
              href="#murales" 
              className="inline-block px-12 py-4 border border-white/10 text-white text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500"
            >
              Explorar Obra
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <ChevronDown size={30} className="text-white/20" />
      </motion.div>
    </section>
  );
}
