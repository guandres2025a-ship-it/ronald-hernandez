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


const timelineCopy = {
  ES: {
    intro: 'Explora las exposiciones que han marcado el camino del artista. Selecciona un evento para abrir su galería de imágenes.',
    journey: 'Recorrido artístico',
    openGallery: 'Abrir galería de',
    viewGallery: 'Ver galería de imágenes',
    illustrative: 'Imágenes ilustrativas · selección provisional',
    tempNote: 'Estas imágenes son ilustrativas y provisionales. Se utilizan para completar visualmente la galería; no se presentan como fotografías documentales de este evento específico.',
    updateNote: 'La galería podrá actualizarse cuando estén disponibles las fotografías originales del evento.',
    archive: 'Archivo de exposiciones',
    group: 'Exposición colectiva',
    solo: 'Exhibición personal',
    collective: 'Exhibición colectiva',
    close: 'Cerrar galería',
    previousPhoto: 'Fotografía anterior',
    nextPhoto: 'Fotografía siguiente',
    showPhoto: 'Mostrar fotografía',
    previousEvent: 'Evento anterior',
    nextEvent: 'Siguiente evento',
  },
  EN: {
    intro: 'Explore the exhibitions that have shaped the artist’s journey. Select any event to open its image gallery.',
    journey: 'Artistic journey',
    openGallery: 'Open gallery for',
    viewGallery: 'View image gallery',
    illustrative: 'Illustrative images · temporary selection',
    tempNote: 'These are temporary illustrative images used to complete the visual gallery. They are not presented as documentary photographs of this specific event.',
    updateNote: 'The gallery can be updated when original event photos become available.',
    archive: 'Exhibition archive',
    group: 'Group exhibition',
    solo: 'Solo exhibition',
    collective: 'Group exhibition',
    close: 'Close gallery',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    showPhoto: 'Show photo',
    previousEvent: 'Previous event',
    nextEvent: 'Next event',
  },
  FR: {
    intro: 'Découvrez les expositions qui ont marqué le parcours de l’artiste. Sélectionnez un événement pour ouvrir sa galerie d’images.',
    journey: 'Parcours artistique',
    openGallery: 'Ouvrir la galerie de',
    viewGallery: 'Voir la galerie d’images',
    illustrative: 'Images illustratives · sélection provisoire',
    tempNote: 'Ces images sont illustratives et provisoires. Elles complètent la galerie visuelle et ne sont pas présentées comme des photos documentaires de cet événement précis.',
    updateNote: 'La galerie pourra être mise à jour lorsque les photos originales de l’événement seront disponibles.',
    archive: 'Archives des expositions',
    group: 'Exposition collective',
    solo: 'Exposition personnelle',
    collective: 'Exposition collective',
    close: 'Fermer la galerie',
    previousPhoto: 'Photo précédente',
    nextPhoto: 'Photo suivante',
    showPhoto: 'Afficher la photo',
    previousEvent: 'Événement précédent',
    nextEvent: 'Événement suivant',
  },
  PT: {
    intro: 'Explore as exposições que marcaram o percurso do artista. Selecione um evento para abrir sua galeria de imagens.',
    journey: 'Trajetória artística',
    openGallery: 'Abrir galeria de',
    viewGallery: 'Ver galeria de imagens',
    illustrative: 'Imagens ilustrativas · seleção provisória',
    tempNote: 'Estas imagens são ilustrativas e provisórias. Elas complementam visualmente a galeria e não são apresentadas como registros documentais deste evento específico.',
    updateNote: 'A galeria poderá ser atualizada quando as fotos originais do evento estiverem disponíveis.',
    archive: 'Arquivo de exposições',
    group: 'Exposição coletiva',
    solo: 'Exposição individual',
    collective: 'Exposição coletiva',
    close: 'Fechar galeria',
    previousPhoto: 'Foto anterior',
    nextPhoto: 'Próxima foto',
    showPhoto: 'Mostrar foto',
    previousEvent: 'Evento anterior',
    nextEvent: 'Próximo evento',
  },
  IT: {
    intro: 'Esplora le mostre che hanno segnato il percorso dell’artista. Seleziona un evento per aprire la galleria di immagini.',
    journey: 'Percorso artistico',
    openGallery: 'Apri la galleria di',
    viewGallery: 'Visualizza la galleria',
    illustrative: 'Immagini illustrative · selezione provvisoria',
    tempNote: 'Queste immagini sono illustrative e provvisorie. Completano la galleria visiva e non sono presentate come fotografie documentarie di questo evento specifico.',
    updateNote: 'La galleria potrà essere aggiornata quando saranno disponibili le foto originali dell’evento.',
    archive: 'Archivio delle mostre',
    group: 'Mostra collettiva',
    solo: 'Mostra personale',
    collective: 'Mostra collettiva',
    close: 'Chiudi la galleria',
    previousPhoto: 'Foto precedente',
    nextPhoto: 'Foto successiva',
    showPhoto: 'Mostra foto',
    previousEvent: 'Evento precedente',
    nextEvent: 'Evento successivo',
  },
  DE: {
    intro: 'Entdecke Ausstellungen, die den künstlerischen Weg geprägt haben. Wähle ein Ereignis aus, um die Bildergalerie zu öffnen.',
    journey: 'Künstlerischer Werdegang',
    openGallery: 'Galerie öffnen für',
    viewGallery: 'Bildergalerie ansehen',
    illustrative: 'Beispielbilder · vorläufige Auswahl',
    tempNote: 'Diese Bilder sind vorläufige Illustrationen zur visuellen Ergänzung der Galerie. Sie werden nicht als dokumentarische Fotos dieser konkreten Veranstaltung dargestellt.',
    updateNote: 'Die Galerie kann aktualisiert werden, sobald Originalfotos der Veranstaltung vorliegen.',
    archive: 'Ausstellungsarchiv',
    group: 'Gruppenausstellung',
    solo: 'Einzelausstellung',
    collective: 'Gruppenausstellung',
    close: 'Galerie schließen',
    previousPhoto: 'Vorheriges Foto',
    nextPhoto: 'Nächstes Foto',
    showPhoto: 'Foto anzeigen',
    previousEvent: 'Vorherige Veranstaltung',
    nextEvent: 'Nächste Veranstaltung',
  },
  JA: {
    intro: 'アーティストの歩みを形づくった展覧会をご覧ください。イベントを選ぶと画像ギャラリーが開きます。',
    journey: '芸術の歩み',
    openGallery: 'ギャラリーを開く：',
    viewGallery: '画像ギャラリーを見る',
    illustrative: 'イメージ画像・暫定セレクション',
    tempNote: 'これらはギャラリーを補うための暫定的なイメージ画像です。該当イベントの記録写真として掲載しているものではありません。',
    updateNote: 'イベントのオリジナル写真が用意でき次第、ギャラリーを更新できます。',
    archive: '展覧会アーカイブ',
    group: 'グループ展',
    solo: '個展',
    collective: 'グループ展',
    close: 'ギャラリーを閉じる',
    previousPhoto: '前の写真',
    nextPhoto: '次の写真',
    showPhoto: '写真を表示',
    previousEvent: '前のイベント',
    nextEvent: '次のイベント',
  },
} as const;

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
  const copy = timelineCopy[language];

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
            {copy.intro}
          </p>
          <div className="mx-auto mt-7 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--accent)]/80">
            <span className="h-px w-8 bg-[var(--accent)]/40" />
            {copy.journey}
            <span className="h-px w-8 bg-[var(--accent)]/40" />
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-transparent via-[var(--accent)]/35 to-transparent md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-7 md:space-y-10">
            {exhibitions.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isIndividual = item.type === 'Exhibición personal';
              const title = item.title || copy.group;
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
                    aria-label={`${copy.openGallery} ${title}, ${item.year}`}
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
                        <span>{copy.viewGallery}</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="mt-3 text-[10px] leading-5 text-white/35">
                        {copy.illustrative}
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
                aria-label={copy.close}
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
                    aria-label={copy.previousPhoto}
                    onClick={() => setActivePhoto((current) => (current + 2) % 3)}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition hover:bg-[var(--accent)] hover:text-black sm:left-5"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={copy.nextPhoto}
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
                        aria-label={`${copy.showPhoto} ${photoIndex + 1}`}
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
                    {copy.archive}
                  </p>
                  <h3 id="exhibition-modal-title" className="mt-4 pr-7 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {activeItem.title || (isEnglish ? 'Group exhibition' : 'Exposición colectiva')}
                  </h3>
                  <div className="mt-6 space-y-4 text-sm text-white/65">
                    <p className="flex items-center gap-3">
                      <CalendarDays size={17} className="shrink-0 text-[var(--accent)]" />
                      <span>{activeItem.year} · {activeItem.type === 'Exhibición personal' ? copy.solo : copy.collective}</span>
                    </p>
                    <p className="flex items-start gap-3 leading-6">
                      <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      <span>{activeItem.location}</span>
                    </p>
                  </div>
                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-sm leading-6 text-white/55">
                      {copy.tempNote}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-white/35">
                      {copy.updateNote}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => { setActiveExhibition((activeExhibition - 1 + exhibitions.length) % exhibitions.length); setActivePhoto(0); }}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/75 transition hover:border-[var(--accent)]/50 hover:text-[var(--accent)]"
                    >
                      <ArrowLeft size={14} /> {copy.previousEvent}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActiveExhibition((activeExhibition + 1) % exhibitions.length); setActivePhoto(0); }}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-[var(--accent-hover)]"
                    >
                      {copy.nextEvent} <ArrowRight size={14} />
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
