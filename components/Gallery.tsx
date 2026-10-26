'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, X, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { Category, Work, works } from '@/constants/works';
import { useLanguage } from './LanguageContext';

const categoryFilters: Array<Category | 'Todos'> = ['Todos', 'Cuadros'];

const collectionFilters = [
  'Todas',
  ...Array.from(new Set(works.map((work) => work.collection))),
];

export default function Gallery() {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<Category | 'Todos'>('Todos');
  const [collectionFilter, setCollectionFilter] = useState('Todas');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(
    () =>
      works.filter(
        (work) =>
          (categoryFilter === 'Todos' || work.category === categoryFilter) &&
          (collectionFilter === 'Todas' || work.collection === collectionFilter),
      ),
    [categoryFilter, collectionFilter],
  );

  const featuredWork = filteredWorks[0];
  const secondaryWorks = filteredWorks.slice(1);

  useEffect(() => {
    if (!selectedWork) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedWork(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedWork]);

  const filterButtonClass = (active: boolean) =>
    `rounded-full px-4 py-2.5 text-xs transition-all duration-300 sm:px-5 sm:text-sm ${
      active
        ? 'border border-[var(--accent)] bg-[var(--accent)] text-black shadow-[0_12px_35px_-20px_rgba(217,188,127,.9)]'
        : 'border border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:bg-white/[0.07] hover:text-white'
    }`;

  return (
    <section id="cuadros" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-40 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/[0.055] blur-3xl" />
        <div className="absolute -right-56 top-[48%] h-[34rem] w-[34rem] rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-10 grid gap-7 border-b border-white/10 pb-10 md:mb-14 md:grid-cols-[1.1fr_0.8fr] md:items-end md:gap-12 md:pb-12"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.38em] text-[var(--accent)] sm:text-xs">
              <span className="h-px w-8 bg-[var(--accent)]" />
              {t.gallery.worksLabel}
            </p>
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              {t.gallery.heading}
            </h2>
          </div>
          <div className="md:justify-self-end md:pb-1">
            <p className="max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              {t.gallery.description}
            </p>
            <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/40 sm:text-xs">
              <span className="h-px w-8 bg-[var(--accent)]/70" />
              {String(filteredWorks.length).padStart(2, '0')} {t.gallery.paintings}
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-10 rounded-2xl border border-white/10 bg-white/[0.025] p-4 backdrop-blur-xl sm:mb-14 sm:rounded-3xl sm:p-6"
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:text-[10px]">
                {t.gallery.categories}
              </p>
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={categoryFilter === category}
                    onClick={() => setCategoryFilter(category)}
                    className={filterButtonClass(categoryFilter === category)}
                  >
                    {category === 'Todos' ? t.gallery.all : t.gallery.paintings}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/[0.07]" />

            <div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:text-[10px]">
                {t.gallery.collections}
              </p>
              <div className="flex flex-wrap gap-2">
                {collectionFilters.map((collection) => (
                  <button
                    key={collection}
                    type="button"
                    aria-pressed={collectionFilter === collection}
                    onClick={() => setCollectionFilter(collection)}
                    className={filterButtonClass(collectionFilter === collection)}
                  >
                    {collection === 'Todas' ? t.gallery.all : collection}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {featuredWork ? (
            <motion.div
              key={`${categoryFilter}-${collectionFilter}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <motion.button
                type="button"
                onClick={() => setSelectedWork(featuredWork)}
                aria-label={`${t.common.explore}: ${featuredWork.title}`}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7 }}
                className="group relative mb-12 block w-full overflow-hidden rounded-2xl border border-white/10 bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:mb-16 sm:rounded-3xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/9] lg:aspect-[2.1/1]">
                  <motion.div layoutId={`image-${featuredWork.id}`} className="absolute inset-0">
                    <Image
                      src={featuredWork.image}
                      alt={featuredWork.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 1400px"
                      className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5 sm:bg-gradient-to-r sm:from-black/85 sm:via-black/35 sm:to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white/85 backdrop-blur-md sm:left-8 sm:top-8 sm:px-4 sm:text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {t.gallery.worksLabel} · 01
                  </div>

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black sm:right-8 sm:top-8 sm:h-12 sm:w-12">
                    <ZoomIn size={18} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-9 lg:p-14">
                    <div className="max-w-3xl">
                      <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-[var(--accent)] sm:text-xs">
                        {featuredWork.collection} · {featuredWork.year}
                      </p>
                      <h3 className="font-serif text-4xl leading-[1.02] text-white sm:text-5xl lg:text-7xl">
                        {featuredWork.title}
                      </h3>
                      <p className="mt-4 hidden max-w-2xl text-sm leading-7 text-white/70 sm:block lg:text-base">
                        {featuredWork.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-3 border-b border-[var(--accent)] pb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white transition-colors group-hover:text-[var(--accent)] sm:mt-8 sm:text-xs">
                        {t.common.learnMore}
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    <span className="mb-1 hidden shrink-0 items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55 md:flex">
                      {featuredWork.technique}
                      <ArrowDownRight size={18} className="text-[var(--accent)]" />
                    </span>
                  </div>
                </div>
              </motion.button>

              {secondaryWorks.length > 0 && (
                <div>
                  <div className="mb-7 flex items-end justify-between gap-5 sm:mb-9">
                    <div>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
                        02 / {t.gallery.collections}
                      </p>
                      <h3 className="font-serif text-3xl text-white sm:text-4xl">
                        {t.gallery.title}
                      </h3>
                    </div>
                    <span className="hidden text-xs tracking-[0.18em] text-white/35 sm:block">
                      {String(secondaryWorks.length).padStart(2, '0')} {t.gallery.paintings}
                    </span>
                  </div>

                  <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                    {secondaryWorks.map((work, index) => (
                      <motion.article
                        layout
                        key={work.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.24) }}
                        className="group"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedWork(work)}
                          aria-label={`${t.common.explore}: ${work.title}`}
                          className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] sm:rounded-2xl">
                            <motion.div layoutId={`image-${work.id}`} className="absolute inset-0">
                              <Image
                                src={work.image}
                                alt={work.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
                              />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
                            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                              {work.collection}
                            </span>
                            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/80 transition-all group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
                              <ZoomIn size={15} />
                            </span>
                          </div>

                          <div className="flex items-start justify-between gap-4 px-1 pt-4">
                            <div>
                              <h4 className="font-serif text-2xl leading-tight text-white transition-colors group-hover:text-[var(--accent)] sm:text-3xl">
                                {work.title}
                              </h4>
                              <p className="mt-3 text-xs tracking-wide text-white/45">
                                {work.year} <span className="mx-2 text-white/20">/</span> {work.technique}
                              </p>
                            </div>
                            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition-all group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
                              <ArrowDownRight size={17} />
                            </span>
                          </div>
                        </button>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <p className="border border-white/10 bg-white/[0.025] p-8 text-center text-white/60">
              {t.gallery.all}
            </p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedWork(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-2xl sm:p-6"
            role="presentation"
          >
            <button
              type="button"
              aria-label={t.gallery.close}
              onClick={() => setSelectedWork(null)}
              className="absolute right-4 top-4 z-50 rounded-full border border-white/15 bg-black/50 p-3 text-white/80 transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] sm:right-7 sm:top-7"
            >
              <X size={20} />
            </button>

            <motion.div
              layoutId={`image-${selectedWork.id}`}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedWork.title}
              className="relative mx-auto flex max-h-[92vh] w-full max-w-7xl flex-col overflow-y-auto rounded-2xl border border-white/10 bg-[#0c0d12] shadow-[0_40px_120px_-30px_rgba(0,0,0,.9)] md:flex-row sm:rounded-3xl"
            >
              <div className="relative min-h-[36vh] shrink-0 bg-black sm:min-h-[48vh] md:min-h-[68vh] md:w-[58%]">
                <Image
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                className="flex flex-1 flex-col justify-center p-6 sm:p-9 lg:p-12"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)] sm:text-xs">
                  {selectedWork.collection}
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
                  {selectedWork.title}
                </h2>
                <div className="mt-6 flex flex-wrap gap-2">
                  {[selectedWork.year, selectedWork.technique].map((detail) => (
                    <span key={detail} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60 sm:px-4 sm:text-sm">
                      {detail}
                    </span>
                  ))}
                </div>
                <div className="mt-7 h-px w-16 bg-[var(--accent)]/80 sm:mt-9" />
                <p className="mt-6 text-base leading-8 text-white/70 sm:mt-8 sm:text-lg">
                  {selectedWork.description}
                </p>
                <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/35 sm:mt-12 sm:text-xs">
                  Ronald Hernández
                  <ArrowRight size={14} className="text-[var(--accent)]" />
                  {t.gallery.collection} {selectedWork.collection}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
