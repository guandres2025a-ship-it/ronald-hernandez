'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '20+', label: 'años de trayectoria' },
  { value: '50+', label: 'obras expuestas' },
  { value: '15+', label: 'proyectos urbanos' },
];

export default function BiografiaSection() {
  return (
    <section id="biografia" className="relative py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/Ronald_Hernandez.jpg"
                alt="Ronald Hernández"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">Biografía del autor</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            La visión de un historiador visual.
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-8 text-white/70">
            <p>
              Formado en la Universidad del Atlántico, Ronald Hernández ha dedicado más de dos décadas a documentar la identidad del Caribe a través del color y la forma.
            </p>
            <p>
              Su práctica combina la precisión del dibujo, la libertad de la mancha y una lectura profunda de la memoria urbana, convirtiendo cada intervención en un registro sensible del territorio.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
