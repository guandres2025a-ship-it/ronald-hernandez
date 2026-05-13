'use client';

import { motion } from 'framer-motion';

const exhibitions = [
  {
    year: '2025',
    title: 'Museo a cielo abierto',
    location: 'Barrio Abajo Barranquilla',
    type: 'Exhibición Colectiva',
  },
  {
    year: '2025',
    title: 'Mujer: Miradas y Matices',
    location: 'Aduana de Barranquilla',
    type: 'Exhibicion Personal',
  },
  {
    year: '2022',
    title: 'Feria internacional del Arte FIAB',
    location: 'Barcelona España',
    type: 'Feria Internacional',
  },
  {
    year: '2015',
    title: 'Impresionismo Pop',
    location: 'Congreso de la Republica. Bogotá. D.C',
    type: 'Exhibicion Personal',
  },
  {
    year: '2014',
    title: 'El Caribe Une las Orillas',
    location: 'Congreso de la Republica. Bogotá. D.C',
    type: 'Exhibicion Colectiva',
  },
  
];

export default function TimelineSection() {
  return (
    <section id="exposiciones" className="py-32 bg-[var(--card-bg)] border-t border-white/5 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4 block">Trayectoria</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">Exposiciones y <span className="text-white/50 italic">Legado</span></h2>
          <div className="h-[1px] w-full max-w-xs bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-8" />
        </motion.div>

        <div className="space-y-16 relative">
          {/* Línea vertical guía */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[2px] border-l-2 border-dashed border-white/20 md:-translate-x-1/2" />

          {exhibitions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              <div className={`md:w-1/2 pl-12 md:pl-0 flex flex-col ${index % 2 === 0 ? 'md:pr-16 md:items-end md:text-right' : 'md:pl-16 md:items-start md:text-left'}`}>
                {/* Punto en la línea (visible solo en desktop, móvil usa una pseudoclase o punto estático) */}
                <div className="absolute left-[16px] md:left-1/2 w-3 h-3 bg-yellow-500 rounded-organic top-2 md:top-auto md:translate-y-0 -translate-x-[0px] md:-translate-x-1/2 shadow-[0_0_20px_rgba(234,179,8,0.8)] rotate-45" />
                
                <span className="text-yellow-500 font-bold font-serif text-3xl tracking-wider mb-2 drop-shadow-sm">{item.year}</span>
                <h4 className="text-2xl font-bold text-[var(--foreground)] mb-2">{item.title}</h4>
                <div className="flex flex-col space-y-1 text-base text-[var(--foreground)]/70">
                  <span>{item.location}</span>
                  <span className="font-light italic text-yellow-500/80">{item.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
