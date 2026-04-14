'use client';

import { motion } from 'framer-motion';

const exhibitions = [
  {
    year: '2024',
    title: 'Bienal Internacional de Arte Urbano',
    location: 'Museo de Arte Contemporáneo, Madrid',
    type: 'Exhibición Colectiva',
  },
  {
    year: '2023',
    title: 'Sombras de la Memoria (Solitario)',
    location: 'Galería Nacional de Bellas Artes',
    type: 'Mural y Lienzo',
  },
  {
    year: '2021',
    title: 'Diálogos del Concreto',
    location: 'Centro Cultural de la Ciudad',
    type: 'Instalación',
  },
  {
    year: '2019',
    title: 'Raíces y Asfalto',
    location: 'Espacio Alternativo Arte-Sur',
    type: 'Pintura',
  },
  {
    year: '2017',
    title: 'Salón de Jóvenes Artistas',
    location: 'Museo Histórico',
    type: 'Mención Honorífica',
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

        <div className="space-y-12 relative">
          {/* Línea vertical guía */}
          <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-[1px] bg-white/10 md:-translate-x-1/2" />

          {exhibitions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              <div className={`md:w-1/2 pl-12 md:pl-0 flex flex-col ${index % 2 === 0 ? 'md:pr-12 md:items-end md:text-right' : 'md:pl-12 md:items-start md:text-left'}`}>
                {/* Punto en la línea (visible solo en desktop, móvil usa una pseudoclase o punto estático) */}
                <div className="absolute left-[20px] md:left-1/2 w-3 h-3 bg-yellow-400 rounded-full top-2 md:top-auto md:translate-y-0 -translate-x-[5px] md:-translate-x-1/2 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
                
                <span className="text-yellow-400 font-bold font-serif text-2xl tracking-wider mb-1">{item.year}</span>
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <div className="flex flex-col space-y-1 text-sm text-slate-400">
                  <span>{item.location}</span>
                  <span className="font-light italic text-slate-500">{item.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
