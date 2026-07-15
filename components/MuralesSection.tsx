'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';

const muralTypes: Array<'Todos' | 'Externo' | 'Interno'> = ['Todos', 'Externo', 'Interno'];

const murales = [
  {
    title: 'Los Enamorados',
    description: 'Una intervención íntima sobre el espacio público, donde la luz y el gesto construyen una escena profundamente humana.',
    image: '/Enamorados.jpg',
    year: '2023',
    size: '6.5m × 4m',
    type: 'Interno',
    collection: 'Memoria',
  },
  {
    title: '',
    description: '',
    image: '',
    year: '',
    size: '',
    type: '',
    collection: '',
  },
  {
    title: '',
    description: '',
    image: '',
    year: '',
    size: '',
    type: '',
    collection: '',
  },
  {
    title: '',
    description: '',
    image: '',
    year: '',
    size: '',
    type: '',
    collection: '',
  },
  {
    title: 'Interior de Sala',
    description: '',
    image: '',
    year: '',
    size: '',
    type: '',
    collection: '',
  },
];

export default function MuralesSection() {
  const [activeType, setActiveType] = useState<'Todos' | 'Externo' | 'Interno'>('Todos');
  const visibleMurals = useMemo(
    () => murales.filter((mural) => activeType === 'Todos' || mural.type === activeType),
    [activeType]
  );

  return (
    <section id="murales" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">Murales</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Intervenciones internas y externas para cada espacio.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/70">
            Elige entre murales externos e internos y explora cada colección completa con una experiencia limpia y editorial.
          </p>
        </motion.div>

        <div className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)]">
          <div className="flex flex-wrap gap-3">
            {muralTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeType === type
                    ? 'bg-[var(--accent)] text-black shadow-[0_12px_30px_-18px_rgba(217,188,127,0.85)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {visibleMurals.map((mural, index) => (
            <motion.article
              key={mural.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.75)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={mural.image}
                  alt={mural.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">{mural.collection}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{mural.title}</h3>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex flex-wrap items-center gap-2 text-sm text-white/60">
                  <span>{mural.year}</span>
                  <span className="h-px w-6 bg-white/10" />
                  <span>{mural.type}</span>
                </div>
                <p className="text-white/70 leading-7">{mural.description}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">{mural.size}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60">Colección {mural.collection}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
