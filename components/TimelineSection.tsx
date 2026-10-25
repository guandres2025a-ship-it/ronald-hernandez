'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
  X,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

type Exhibition = {
  year: string;
  title: string;
  location: string;
  type: 'Exhibición personal' | 'Exhibición colectiva';
  cover: number;
};

// Imágenes ilustrativas provisionales. No representan necesariamente estos eventos.
const placeholderImages = [
  {
    src: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1500&q=85',
    alt: 'Pintura contemporánea en una galería de arte',
  },
  {
    src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1500&q=85',
    alt: 'Obras pictóricas expuestas en una sala de museo',
  },
  {
    src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1500&q=85',
    alt: 'Detalle de una obra de arte abstracto',
  },
  {
    src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1500&q=85',
    alt: 'Pintura expuesta en un espacio cultural',
  },
  {
    src: 'https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1500&q=85',
    alt: 'Colección de pinturas en una exposición',
  },
  {
    src: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=1500&q=85',
    alt: 'Espacio de exposición de arte contemporáneo',
  },
];

const exhibitions: Exhibition[] = [
  { year: '2025', title: 'MUJER: MIRADAS Y MATICES', location: 'Aduana de Barranquilla', type: 'Exhibición personal', cover: 0 },
  { year: '2024', title: 'V BIENAL INTERNACIONAL DE ARTE BLANCO', location: 'Bogotá D. C.', type: 'Exhibición colectiva', cover: 1 },
  { year: '2024', title: 'QATAR INTERNATIONAL ART FESTIVAL', location: 'Doha, Qatar', type: 'Exhibición colectiva', cover: 2 },
  { year: '2024', title: '1ST FUMARATO ART FESTIVAL', location: 'Ubicación por confirmar', type: 'Exhibición colectiva', cover: 3 },
  { year: '2023', title: 'SORORIDAD BOHEMIA', location: 'Bogotá, Colombia', type: 'Exhibición personal', cover: 4 },
  { year: '2022', title: 'Feria Internacional del Arte FIAB', location: 'Barcelona, España', type: 'Exhibición colectiva', cover: 5 },
  { year: '2021', title: 'Exposición colectiva', location: 'Consulado de Colombia en Miami, Estados Unidos', type: 'Exhibición colectiva', cover: 1 },
  { year: '2021', title: 'Exposición colectiva', location: 'Museo Naval, Cartagena, Colombia', type: 'Exhibición colectiva', cover: 2 },
  { year: '2019', title: 'Exposición colectiva', location: 'Colegio Hebreo Unión, Barranquilla, Colombia', type: 'Exhibición colectiva', cover: 3 },
  { year: '2019', title: 'Exposición colectiva', location: 'Colegio Educativo y Cultural Reyes Católicos, Barranquilla, Colombia', type: 'Exhibición colectiva', cover: 4 },
  { year: '2018', title: 'Exposición colectiva', location: 'Zona L, Bogotá, Colombia', type: 'Exhibición colectiva', cover: 5 },
  { year: '2018', title: 'XLVII MUESTRA PICTÓRICA Y CULTURAL DEL CARIBE', location: 'Galería Arcot, Bogotá', type: 'Exhibición colectiva', cover: 0 },
  { year: '2015', title: 'IMPRESIONISMO POP', location: 'Bogotá, Colombia', type: 'Exhibición personal', cover: 2 },
  { year: '2014', title: 'EL CARIBE UNE LAS ORILLAS', location: 'Bogotá, Colombia', type: 'Exhibición colectiva', cover: 3 },
  { year: '2014', title: 'MOMENTOS2', location: 'Centro Comercial Buenavista, Barranquilla', type: 'Exhibición personal', cover: 4 },
  { year: '2014', title: 'MOMENTOS1', location: 'Centro Comercial Barcelona Plaza, Barranquilla', type: 'Exhibición personal', cover: 5 },
];

export default function TimelineSection() {
  const { t, language } = useLanguage();
  const [activeExhibition, setActiveExhibition] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const isEnglish = language === 'EN';

  const activeItem = activeExhibition === null ? null : exhibitions[activeExhibition];
  const gallery = activeExhibition === null
    ? []
    : [0, 1, 2].map((offset) => placeholderImages[(exhibitions[activeExhibition].cover + offset) % placeholderImages.length]);

  const closeGallery = () => setActiveExhibition(null);

  useEffect(() => {
    if (activeExhibition === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowRight') setActivePhoto((current) => (current + 1) % 3);
      if (event.key === 'ArrowLeft') setActivePhoto((current) => (current + 2) % 3);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeExhibition]);

  return (
    <section id="exposiciones" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-36 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--accent)]/[0.06] blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--accent)]">
            {t.timeline.title}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            {t.timeline.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            {isEnglish
              ? 'Explore the exhibitions that have shaped the artist’s journey. Select any event to open its image gallery.'
              : 'Explora las exposiciones que han marcado el camino del artista. Selecciona un evento para abrir su galería de imágenes.'}
          </p>
          <div className="mx-auto mt-7 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]/80">
            <span className="h-px w-8 bg-[var(--accent)]/40" />
            {isEnglish ? 'Artistic journey' : 'Recorrido artístico'}
            <span className="h-px w-8 bg-[var(--accent)]/40" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-transparent via-[var(--accent)]/35 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-7 md:space-y-10">
            {exhibitions.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isIndividual = item.type === 'Exhibición personal';
              const title = item.title || (isEnglish ? 'Group exhibition' : 'Exposición colectiva');
              return (
                <motion.div
                  key={`${item.year}-${item.title}-${item.location}-${index}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: Math.min(index % 4, 3) * 0.05 }}
                  className={`relative flex pl-11 md:w-1/2 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}
                >
                  <div className={`absolute left-[9px] top-7 z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border border-[var(--accent)]/70 bg-[#0a0b10] md:left-auto ${isLeft ? 'md:-right-[11px]' : 'md:-left-[11px]'}`}>
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(217,188,127,0.8)]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => { setActiveExhibition(index); setActivePhoto(0); }}
                    aria-label={`${isEnglish ? 'Open gallery for' : 'Abrir galería de'} ${title}, ${item.year}`}
                    className="group w-full overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#101118] text-left shadow-[0_18px_60px_rgba(0,0,0,0.16)] transition duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/45 hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <img
                        src={placeholderImages[item.cover].src}
                        alt={placeholderImages[item.cover].alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101118] via-black/15 to-black/5" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                        {item.year}
                      </span>
                      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md transition group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black">
                        <Images size={15} />
                      </span>
                      <span className="absolute bottom-4 left-4 rounded-full border border-[var(--accent)]/35 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] backdrop-blur-md">
                        {isIndividual ? t.timeline.individual : t.timeline.collective}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-lg font-semibold leading-snug text-white transition-colors group-hover:text-[var(--accent)] sm:text-xl">
                        {title}
                      </h3>
                      <div className="mt-3 flex items-start gap-2 text-sm leading-6 text-white/55">
                        <MapPin size={15} className="mt-1 shrink-0 text-[var(--accent)]/80" />
                        <span>{item.location}</span>
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]/90">
                        <span>{isEnglish ? 'View image gallery' : 'Ver galería de imágenes'}</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-3 text-[10px] leading-5 text-white/35">
                        {isEnglish ? 'Illustrative images · temporary selection' : 'Imágenes ilustrativas · selección provisional'}
                      </p>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && activeExhibition !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-xl sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) closeGallery(); }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="exhibition-modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative my-auto w-full max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101118] shadow-2xl sm:rounded-[2rem]"
            >
              <button
                type="button"
                onClick={closeGallery}
                aria-label={isEnglish ? 'Close gallery' : 'Cerrar galería'}
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:right-5 sm:top-5"
              >
                <X size={19} />
              </button>

              <div className="grid md:grid-cols-[1.25fr_0.75fr]">
                <div className="relative min-h-[280px] bg-black sm:min-h-[420px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={gallery[activePhoto]?.src}
                      src={gallery[activePhoto]?.src}
                      alt={gallery[activePhoto]?.alt}
                      initial={{ opacity: 0.25 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.25 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
                  <button
                    type="button"
                    aria-label={isEnglish ? 'Previous photo' : 'Fotografía anterior'}
                    onClick={() => setActivePhoto((current) => (current + 2) % 3)}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition hover:bg-[var(--accent)] hover:text-black sm:left-5"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={isEnglish ? 'Next photo' : 'Fotografía siguiente'}
                    onClick={() => setActivePhoto((current) => (current + 1) % 3)}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition hover:bg-[var(--accent)] hover:text-black sm:right-5"
                  >
                    <ArrowRight size={18} />
                  </button>
                  <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-6 sm:left-6">
                    {gallery.map((photo, photoIndex) => (
                      <button
                        type="button"
                        key={photo.src}
                        onClick={() => setActivePhoto(photoIndex)}
                        aria-label={`${isEnglish ? 'Show photo' : 'Mostrar fotografía'} ${photoIndex + 1}`}
                        className={`h-1.5 rounded-full transition-all ${photoIndex === activePhoto ? 'w-8 bg-[var(--accent)]' : 'w-3 bg-white/50 hover:bg-white'}`}
                      />
                    ))}
                  </div>
                  <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] text-white/80 backdrop-blur-md sm:bottom-6 sm:right-6">
                    {activePhoto + 1} / {gallery.length}
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-9 md:p-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                    {isEnglish ? 'Exhibition archive' : 'Archivo de exposiciones'}
                  </p>
                  <h3 id="exhibition-modal-title" className="mt-4 pr-7 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {activeItem.title || (isEnglish ? 'Group exhibition' : 'Exposición colectiva')}
                  </h3>
                  <div className="mt-6 space-y-4 text-sm text-white/65">
                    <p className="flex items-center gap-3">
                      <CalendarDays size={17} className="shrink-0 text-[var(--accent)]" />
                      <span>{activeItem.year} · {isEnglish ? (activeItem.type === 'Exhibición personal' ? 'Solo exhibition' : 'Group exhibition') : activeItem.type}</span>
                    </p>
                    <p className="flex items-start gap-3 leading-6">
                      <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      <span>{activeItem.location}</span>
                    </p>
                  </div>
                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-sm leading-6 text-white/55">
                      {isEnglish
                        ? 'These are temporary illustrative images used to complete the visual gallery. They are not presented as documentary photographs of this specific event.'
                        : 'Estas imágenes son ilustrativas y provisionales. Se utilizan para completar visualmente la galería; no se presentan como fotografías documentales de este evento específico.'}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-white/35">
                      {isEnglish ? 'The gallery can be updated when original event photos become available.' : 'La galería podrá actualizarse cuando estén disponibles las fotografías originales del evento.'}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => { setActiveExhibition((activeExhibition - 1 + exhibitions.length) % exhibitions.length); setActivePhoto(0); }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/75 transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                    >
                      <ArrowLeft size={14} /> {isEnglish ? 'Previous event' : 'Evento anterior'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveExhibition((activeExhibition + 1) % exhibitions.length); setActivePhoto(0); }}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-[var(--accent-hover)]"
                    >
                      {isEnglish ? 'Next event' : 'Siguiente evento'} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
