'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, MapPin, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Mural {
  title: string;
  description: string;
  image: string;
  year: string;
  size: string;
  type: string;
  collection: string;
  location: string;
}

const murales: Mural[] = [
  {
    title: 'Magia en mi mente',
    description:
      'Un homenaje a Tellos Artesanía, artesana y artista del Barrio Abajo. Su talento y tenacidad la han convertido en una pieza clave de los procesos culturales de este tradicional barrio.',
    image: '/Murales/Magia_En_Mi_Mente.webp',
    year: '2026',
    size: '6.5 × 4 m',
    type: 'Exterior',
    collection: 'Museo a Cielo Abierto Barrio Abajo, Barranquilla',
    location: 'Barrio Abajo · Barranquilla',
  },
  {
    title: 'Ofelia Invita',
    description:
      'Un homenaje a Ofelia, una de las matronas del barrio Rebolo. Durante años conquistó el corazón de su comunidad con uno de los sabores más tradicionales de la zona: morcilla con limón y bollo limpio.',
    image: '/Murales/Ofelia.webp',
    year: '2026',
    size: '50 m²',
    type: 'Exterior',
    collection: 'Malecón de Rebolo',
    location: 'Rebolo · Barranquilla',
  },
];

export default function MuralesSection() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<Mural | null>(null);
  const principal = murales[0];
  const secundarios = murales.slice(1);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="murales" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-24 h-80 w-80 rounded-full bg-[var(--accent)]/5 blur-3xl" />
        <div className="absolute right-[-12rem] top-[45%] h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid gap-6 border-b border-white/10 pb-10 md:mb-16 md:grid-cols-[1fr_0.8fr] md:items-end md:gap-12 md:pb-12"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.38em] text-[var(--accent)] sm:text-xs">
              <span className="h-px w-8 bg-[var(--accent)]" />
              {t.murals.title}
            </p>
            <h2 className="max-w-3xl font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              {t.murals.publicSpace}
            </h2>
          </div>
          <div className="md:justify-self-end md:pb-1">
            <p className="max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              {t.murals.description}
            </p>
            <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40">
              <span className="h-px w-8 bg-[var(--accent)]/70" />
              Barranquilla, Colombia
            </div>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-3xl"
        >
          <button
            type="button"
            onClick={() => setSelected(principal)}
            aria-label={`${t.murals.viewMural}: ${principal.title}`}
            className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-5px] focus-visible:outline-[var(--accent)]"
          />
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[2.05/1]">
            <Image
              src={principal.image}
              alt={principal.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/35 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white/90 backdrop-blur-md sm:left-8 sm:top-8 sm:px-4 sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Obra destacada · {principal.year}
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-end p-5 sm:p-9 lg:p-14">
              <p className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/75 sm:text-xs">
                <MapPin size={13} className="text-[var(--accent)]" />
                {principal.location}
              </p>
              <h3 className="max-w-4xl font-serif text-4xl leading-[1.02] text-white sm:text-5xl lg:text-7xl">
                {principal.title}
              </h3>
              <p className="mt-4 hidden max-w-2xl text-sm leading-7 text-white/75 sm:block lg:mt-5 lg:text-base">
                {principal.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-3 border-b border-[var(--accent)] pb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white transition-colors group-hover:text-[var(--accent)] sm:mt-8 sm:text-xs">
                {t.murals.viewMural}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </motion.article>

        <div className="mt-16 sm:mt-24">
          <div className="mb-8 flex items-end justify-between gap-5 sm:mb-10">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                02 / Colección
              </p>
              <h3 className="font-serif text-3xl text-white sm:text-4xl">
                {t.murals.otherMurals}
              </h3>
            </div>
            <span className="hidden text-xs tracking-[0.18em] text-white/40 sm:block">
              02 OBRAS
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {secundarios.map((mural, index) => (
              <motion.article
                key={mural.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => setSelected(mural)}
                  aria-label={`${t.murals.viewMural}: ${mural.title}`}
                  className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:rounded-2xl">
                    <Image
                      src={mural.image}
                      alt={mural.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                      {mural.year} · {mural.type}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                      <div>
                        <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/65">
                          <MapPin size={12} className="text-[var(--accent)]" />
                          {mural.location}
                        </p>
                        <h4 className="font-serif text-3xl leading-tight text-white sm:text-4xl">
                          {mural.title}
                        </h4>
                      </div>
                      <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
                        <ArrowDownRight size={19} />
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-5 px-1 pt-4">
                    <p className="max-w-xl text-sm leading-6 text-white/55">
                      {mural.description}
                    </p>
                    <span className="shrink-0 pt-1 text-xs text-white/40">{mural.size}</span>
                  </div>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-xl sm:p-6"
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-2xl border border-white/10 bg-[var(--card-bg)] shadow-2xl sm:rounded-3xl"
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Cerrar detalles del mural"
                className="absolute right-3 top-3 z-20 rounded-full border border-white/20 bg-black/65 p-2.5 text-white transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:right-5 sm:top-5 sm:p-3"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                <div className="relative aspect-[4/3] min-h-0 bg-black md:aspect-auto md:min-h-[560px]">
                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] sm:text-xs">
                    {selected.collection || t.murals.collection}
                  </p>
                  <h2 className="mt-4 pr-8 font-serif text-4xl leading-tight text-white sm:text-5xl">
                    {selected.title}
                  </h2>
                  <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/50">
                    <MapPin size={14} className="text-[var(--accent)]" />
                    {selected.location}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[selected.year, selected.size, selected.type].filter(Boolean).map((detail) => (
                      <span key={detail} className="rounded-full border border-white/15 px-3 py-2 text-xs text-white/65">
                        {detail}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 h-px w-16 bg-[var(--accent)]" />
                  <p className="mt-7 text-base leading-8 text-white/70 sm:text-lg">
                    {selected.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
