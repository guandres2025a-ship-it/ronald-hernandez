'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Category, Work, works } from '@/constants/works';

const categoryFilters: Array<Category | 'Todos'> = [
    'Cuadros',
];

const collectionFilters = [
  'Todas',
  ...Array.from(new Set(works.map((work) => work.collection))),
];

export default function Gallery() {
  const [categoryFilter, setCategoryFilter] =
    useState<Category | 'Todos'>('Todos');

  const [collectionFilter, setCollectionFilter] =
    useState<string>('Todas');

  const [selectedWork, setSelectedWork] =
    useState<Work | null>(null);

  const filteredWorks = useMemo(
    () =>
      works.filter(
        (work) =>
          (categoryFilter === 'Todos' ||
            work.category === categoryFilter) &&
          (collectionFilter === 'Todas' ||
            work.collection === collectionFilter)
      ),
    [categoryFilter, collectionFilter]
  );

  return (
    <section id="cuadros" className="relative py-28 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ENCABEZADO */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="max-w-3xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--accent)]">
            Obras
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
            La pintura como memoria,
            <br />
            color e imaginación.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Cada obra nace de una observación del territorio,
            la historia y la experiencia humana. Esta selección
            reúne pinturas y proyectos que dialogan con la
            memoria colectiva desde una mirada contemporánea.
          </p>
        </motion.div>

        {/* FILTROS */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .15 }}
          className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >

          <div className="flex flex-col gap-8">

            <div>

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.30em] text-white/45">
                Categorías
              </p>

              <div className="flex flex-wrap gap-3">

                {categoryFilters.map((cat) => (

                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                      categoryFilter === cat
                        ? 'bg-[var(--accent)] text-black shadow-[0_15px_35px_-20px_rgba(217,188,127,.8)]'
                        : 'border border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>

                ))}

              </div>

            </div>

            <div>

              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.30em] text-white/45">
                Colecciones
              </p>

              <div className="flex flex-wrap gap-3">

                {collectionFilters.map((collection) => (

                  <button
                    key={collection}
                    onClick={() =>
                      setCollectionFilter(collection)
                    }
                    className={`rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
                      collectionFilter === collection
                        ? 'bg-[var(--accent)] text-black shadow-[0_15px_35px_-20px_rgba(217,188,127,.8)]'
                        : 'border border-white/10 bg-white/5 text-white/65 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {collection}
                  </button>

                ))}

              </div>

            </div>

          </div>

        </motion.div>

        {/* GRID DE OBRAS */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  <AnimatePresence mode="popLayout">
    {filteredWorks.map((work, index) => (
      <motion.article
        layout
        key={work.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{
          duration: 0.45,
          delay: index * 0.04,
        }}
        onClick={() => setSelectedWork(work)}
        className="group cursor-pointer"
      >
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_35px_90px_-40px_rgba(0,0,0,.9)]">

          <div className="relative aspect-[4/5] overflow-hidden">

            <motion.div
              layoutId={`image-${work.id}`}
              className="relative h-full w-full"
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width:768px)100vw,33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

            <div className="absolute top-5 left-5">

              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] backdrop-blur-xl">
                {work.category}
              </span>

            </div>

            <div className="absolute top-5 right-5">

              <div className="rounded-full border border-white/10 bg-black/35 p-3 text-white/70 backdrop-blur-xl transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:text-black">

                <ZoomIn size={16} />

              </div>

            </div>

            <div className="absolute bottom-0 left-0 w-full p-7">

              <h3 className="font-serif text-3xl leading-tight text-white">

                {work.title}

              </h3>

              <div className="mt-4 flex items-center gap-3 text-sm text-white/60">

                <span>{work.year}</span>

                <span className="h-px w-5 bg-white/20" />

                <span>{work.technique}</span>

              </div>

            </div>

          </div>

        </div>
      </motion.article>
    ))}
  </AnimatePresence>
</div>
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-2xl"
            onClick={() => setSelectedWork(null)}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedWork(null);
              }}
              className="absolute right-6 top-6 z-50 rounded-full border border-white/10 bg-white/5 p-3 text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>

            <motion.div
              layoutId={`image-${selectedWork.id}`}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto flex max-h-[90vh] w-full max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[var(--card-bg)] shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] lg:flex-row"
            >
              {/* Imagen */}

              <div className="relative h-[45vh] lg:h-auto lg:w-[62%]">

                <Image
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

              </div>

              {/* Información */}

              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-14"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
                  {selectedWork.category}
                </p>

                <h2 className="mt-5 font-serif text-4xl leading-tight text-white lg:text-5xl">
                  {selectedWork.title}
                </h2>

                <div className="mt-8 flex flex-wrap gap-3">

                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/65">
                    {selectedWork.year}
                  </span>

                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/65">
                    {selectedWork.technique}
                  </span>

                </div>

                <div className="mt-10 h-px w-24 bg-[var(--accent)] opacity-50" />

                <p className="mt-10 text-lg leading-9 text-white/70">
                  {selectedWork.description}
                </p>

                <div className="mt-12 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/35">
                  Ronald Hernández
                  <ArrowRight size={14} />
                  Colección {selectedWork.collection}
                </div>

              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
    </section>
  );
}