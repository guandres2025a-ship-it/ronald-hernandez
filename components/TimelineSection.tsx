'use client';

import { motion } from 'framer-motion';

const exhibitions = [
  
  {
    year: '2025',
    title: 'MUJER: MIRADAS Y MATICES',
    location: 'Aduana de Barranquilla',
    type: 'Exhibición personal',
  },
  {
    year: '2024',
    title: 'V BIENAL INTERNACIONAL DE ARTE BLANCO',
    location: 'BOGOTA DC',
    type: 'Exhibición colectiva',
  },
  {
    year: '2024',
    title: 'QATAR INTERNATIONAL ART FESTIVAL',
    location: 'Doha, Qatar',
    type: 'Exhibición colectiva',
  },
  {
    year: '2024',
    title: '1ST FUMARATO ART FESTIVAL',
    location: '',
    type: 'Exhibición colectiva',
  },
  {
    year: '2023',
    title: 'SORORIDAD BOHEMIA',
    location: 'Bogotá, Colombia',
    type: 'Exhibición Individual',
  },
  {
    year: '2022',
    title: 'Feria Internacional del Arte FIAB',
    location: 'Barcelona, España',
    type: 'Exhibición colectiva',
  },
  {
    year: '2021',
    title: '',
    location: 'Consulado de Colombia en Miami, Estados Unidos',
    type: 'Exhibición colectiva',
  },
  {
    year: '2021',
    title: '',
    location: 'Museo Naval, Cartagena, Colombia',
    type: 'Exhibición colectiva',
  },
  {
    year: '2019',
    title: '',
    location: 'Colegio Hebreo Union, Barranquilla, Colombia',
    type: 'Exhibición colectiva',
  },
   {
    year: '2019',
    title: '',
    location: 'Colegio Educativo Y Cultural Reyes Catolicos, Barranquilla, Colombia',
    type: 'Exhibición colectiva',
  }, {
    year: '2018',
    title: '',
    location: 'Zona L, Bogota, Colombia',
    type: 'Exhibición colectiva',
  },
   {
    year: '2018',
    title: 'XLVII MUESTRA PICTORICA Y CULTURAL DEL CARIBE',
    location: 'Galeria Arcot, Bogota',
    type: 'Exhibición colectiva',
  },
  {
    year: '2015',
    title: 'IMPRESIONISMO POP',
    location: 'Bogotá, Colombia',
    type: 'Exhibición personal',
  },
  {
    year: '2014',
    title: 'EL CARIBE UNE LAS ORILLAS',
    location: 'Bogotá, Colombia',
    type: 'Exhibición colectiva',
  },
  {
    year: '2014',
    title: 'MOMENTOS',
    location: 'Centro Comercial Buenavista, Barranquilla',
    type: 'Exhibición Individual',
  },
  {
    year: '2014',
    title: 'MOMENTOS',
    location: 'Centro comercial Barcelona Plaza, Barranquilla',
    type: 'Exhibición Individual',

  }
];

export default function TimelineSection() {
  return (
    <section id="exposiciones" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">Trayectoria</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Exposiciones que consolidan un legado contemporáneo.
          </h2>
        </motion.div>

        <div className="relative space-y-4">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />

          {exhibitions.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className={`relative flex items-start gap-4 sm:gap-0 ${index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'}`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)] sm:ml-0 sm:mr-0">
                {item.year.slice(-2)}
              </div>
              <div className={`w-full rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:max-w-[calc(50%-1.5rem)] ${index % 2 === 0 ? 'sm:ml-8' : 'sm:mr-8'}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/50">{item.type}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-white/65">{item.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
