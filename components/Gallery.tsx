'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Category, Work, works } from '@/constants/works';

const categoryFilters: Array<Category | 'Todos'> = ['Todos', 'Cuadros', 'Murales'];
const collectionFilters = ['Todas', ...Array.from(new Set(works.map((work) => work.collection)))];

export default function Gallery() {
  const [categoryFilter, setCategoryFilter] = useState<Category | 'Todos'>('Todos');
  const [collectionFilter, setCollectionFilter] = useState<string>('Todas');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(
    () =>
      works.filter(
        (work) =>
          (categoryFilter === 'Todos' || work.category === categoryFilter) &&
          (collectionFilter === 'Todas' || work.collection === collectionFilter)
      ),
    [categoryFilter, collectionFilter]
  );

  return (
    <section id="cuadros" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">Galería selecta</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
              Cada obra es un fragmento de una historia que continua en la mirada del espectador.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  categoryFilter === cat
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)]">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-white/60">Colecciones</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {collectionFilters.map((collection) => (
              <button
                key={collection}
                onClick={() => setCollectionFilter(collection)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  collectionFilter === collection
                    ? 'bg-[var(--accent)] text-black shadow-[0_12px_30px_-18px_rgba(217,188,127,0.85)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredWorks.map((work, index) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                key={work.id}
                onClick={() => setSelectedWork(work)}
                className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.div layoutId={`image-${work.id}`} className="relative h-full w-full">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">{work.category}</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">{work.title}</h3>
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/30 p-2 text-white/70 backdrop-blur-md">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm text-white/55">
                  <span>{work.year}</span>
                  <span className="inline-flex items-center gap-2 text-white/70">
                    {work.technique}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-xl sm:px-6"
            onClick={() => setSelectedWork(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-50 rounded-full border border-white/15 bg-black/40 p-3 text-white/70 transition-colors hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedWork(null);
              }}
              aria-label="Cerrar vista previa"
            >
              <X size={20} />
            </button>

            <div
              className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--card-bg)] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.9)] lg:flex-row"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.div layoutId={`image-${selectedWork.id}`} className="relative h-[45vh] w-full lg:h-auto lg:w-[60%]">
                <Image src={selectedWork.image} alt={selectedWork.title} fill className="object-cover" priority />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="flex w-full flex-col justify-between p-6 sm:p-8 lg:w-[40%]"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">{selectedWork.category}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{selectedWork.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/55">
                    <span className="rounded-full border border-white/10 px-3 py-1">{selectedWork.year}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{selectedWork.technique}</span>
                  </div>
                  <p className="mt-6 text-base leading-7 text-white/70">{selectedWork.description}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
