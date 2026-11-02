'use client';

import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const atelierAddress = 'Cra. 55 #72-32, Norte Centro Histórico, Barranquilla, Atlántico, Colombia';
const atelierMapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(atelierAddress);
const atelierEmbedUrl = 'https://www.google.com/maps?q=' + encodeURIComponent(atelierAddress) + '&output=embed';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-black/20 py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
              <span className="h-px w-8 bg-[var(--accent)]" />
              {t.footer.atelierTitle}
            </p>
            <h2 className="max-w-md font-serif text-3xl leading-tight text-white sm:text-4xl">
              Ronald Hernández
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
              {t.footer.atelierDescription}
            </p>
            <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-white/70">
              <MapPin size={16} className="mt-1 shrink-0 text-[var(--accent)]" />
              <span>{atelierAddress}</span>
            </p>
            <a href={atelierMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 border-b border-[var(--accent)]/60 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)] transition-colors hover:text-white">
              {t.footer.getDirections} <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="space-y-2 border-t border-white/10 pt-5 text-xs">
            <p className="text-white/55">© {new Date().getFullYear()} Ronald Hernández. {t.footer.rights}</p>
            <p className="text-white/35">{t.footer.artist}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-2xl sm:rounded-3xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black sm:aspect-[16/9]">
            <iframe
              title={t.footer.atelierTitle}
              src={atelierEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0 grayscale-[0.7] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-3 py-4 sm:px-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{t.footer.atelierTitle}</p>
            <a href={atelierMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] hover:text-white">
              {t.footer.getDirections} <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
