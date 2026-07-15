'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Palette, Sparkles } from 'lucide-react';
import Image from 'next/image';

const highlights = [
  'Muralismo contemporáneo',
  'Memoria colectiva',
  'Arte urbano',
];

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden pt-28 pb-24 sm:pt-32 lg:pt-36">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,188,127,0.16),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(255,255,255,0.08),_transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex itemJs-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.32em] text-white/70">
            <Sparkles size={14} className="text-[var(--accent)]" />
            Artista Muralista | Historiador
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[0.9] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Ronald <span className="font-light text-white/70">Hernández</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-white/70 sm:text-xl">
            Bienvenidos a mi visión del mundo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cuadros"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent)]"
            >
              Ver obras
              <ArrowRight size={16} />
            </a>
            <a
              href="#biografia"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              Conocer trayectoria
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/60">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/15 via-transparent to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&q=80"
                alt="Obra de Ronald Hernández"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,7,11,0.88)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="rounded-[1.25rem] border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60">
                    <Palette size={14} className="text-[var(--accent)]" />
                    Palabras del artista
                  </div>
                  <p className="mt-3 text-xl font-medium text-white">
                    Yo pinto para ver con mis ojos, el sueño imaginario y constante en el que vive mi mente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
