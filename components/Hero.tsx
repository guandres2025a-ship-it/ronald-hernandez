'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Palette } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-30 pb-30 sm:pt-34 lg:pt-38"
    >
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(217,188,127,0.16),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(255,255,255,0.08),_transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70">
            Pintor · Muralista · Historiador
          </div>

          <h1 className="mt-10 font-serif text-7xl font-semibold leading-[0.82] tracking-[-0.05em] text-white sm:text-8xl lg:text-[7.5rem]">
            Ronald
            <span className="block font-light text-white/75">
              Hernández
            </span>
          </h1>

          <p className="mt-10 max-w-xl font-serif text-2xl italic leading-relaxed text-white/80 sm:text-3xl">
            “Bienvenidos a mi visión del mundo.”
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cuadros"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--accent)]"
            >
              Ver obras
              <ArrowRight size={16} />
            </a>

            <a
              href="#biografia"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-7 py-4 text-sm font-semibold text-white/70 transition-all duration-500 hover:border-white/30 hover:bg-white/5 hover:text-white"
            >
              Conocer trayectoria
            </a>
          </div>
        </motion.div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[rgba(217,188,127,0.15)] via-transparent to-transparent blur-3xl" />

          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-2">

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/ronald2.webp"
                alt="Ronald Hernández"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,7,11,0.9)] via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">

                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-6 backdrop-blur-md">

                  <div className="mb-5 h-px w-16 bg-[var(--accent)] opacity-70" />

                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55">
                    <Palette
                      size={14}
                      className="text-[var(--accent)]"
                    />
                    Reflexión
                  </div>

                  <p className="mt-5 font-serif text-2xl italic leading-relaxed text-white">
                    “Yo pinto para ver con mis ojos el sueño imaginario y constante en el que vive mi mente.”
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