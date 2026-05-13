'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const murales = [
  {
    title: "Los Enamorados",
    description: "Una exploración de la intimidad y el color en el espacio público.",
    image: "/Enamorados.jpg",
    year: "2023",
    size: "6.5m x 4m"
  },
  {
    title: "Músicos del Caribe",
    description: "Ritmo y tradición plasmados en una explosión de color contemporánea.",
    image: "/Musicos.jpg",
    year: "2022",
    size: "8m x 3.5m"
  },
  {
    title: "Sol Naranja",
    description: "La energía vital del entorno capturada en un solo trazo monumental.",
    image: "/sol naranja.jpg",
    year: "2024",
    size: "5m x 5m"
  }
];

export default function MuralesSection() {
  return (
    <section id="murales" className="relative py-40 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Museum Label Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <span className="text-yellow-500/80 uppercase tracking-[0.5em] text-xs font-bold mb-4 block">Colección Permanente</span>
          <h2 className="text-5xl md:text-7xl font-serif font-light text-white mb-8">Intervenciones <span className="italic font-normal">Urbanas</span></h2>
          <div className="w-px h-24 bg-gradient-to-b from-yellow-500/50 to-transparent mx-auto" />
        </motion.div>

        {/* Gallery Layout */}
        <div className="space-y-64">
          {murales.map((mural, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
              
              {/* Image 'Frame' */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full lg:w-3/5"
              >
                <div className="relative aspect-[16/10] group">
                  {/* Subtle 'Gallery Light' effect */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                  
                  {/* The Frame */}
                  <div className="relative h-full w-full p-2 bg-[#111] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/5 overflow-hidden">
                    <Image
                      src={mural.image}
                      alt={mural.title}
                      fill
                      className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-yellow-500/30" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-yellow-500/30" />
                </div>
              </motion.div>

              {/* Label Info */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-2/5 space-y-6"
              >
                <div className="flex items-center gap-4 text-yellow-500/60 text-xs font-bold tracking-widest uppercase">
                  <span>{mural.year}</span>
                  <div className="w-8 h-px bg-yellow-500/20" />
                  <span>{mural.size}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                  {mural.title}
                </h3>
                
                <p className="text-slate-400 text-lg font-light leading-relaxed max-w-md">
                  {mural.description}
                </p>
                
                <div className="pt-6">
                  <div className="inline-block px-8 py-3 border border-white/10 text-white/50 text-xs uppercase tracking-widest hover:border-yellow-500/50 hover:text-white transition-all cursor-default">
                    Ficha Técnica
                  </div>
                </div>
              </motion.div>

            </div>
          ))}
        </div>

        {/* Curator Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-64 pt-32 border-t border-white/5 text-center max-w-3xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-serif font-light text-slate-300 italic leading-relaxed">
            "El muralismo de Hernández transforma el caos urbano en una galería silente, donde cada pincelada reclama la dignidad de la historia local."
          </p>
          <div className="mt-8 flex flex-col items-center">
             <div className="w-12 h-px bg-yellow-500 mb-4" />
             <span className="text-yellow-500 uppercase tracking-widest text-xs font-bold">Curaduría Contemporánea</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
