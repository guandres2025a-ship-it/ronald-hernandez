'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { works, Category, Work } from '@/constants/works';

export default function Gallery() {
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filteredWorks = works.filter(
    (work) => filter === 'Todos' || work.category === filter
  );

  return (
    <section id="cuadros" className="py-24 bg-[var(--background)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white tracking-tight">Obras <span className="text-yellow-400">Destacadas</span></h2>
          <div className="h-1 w-24 bg-yellow-400 mx-auto rounded-full mb-12" />
          
          {/* Filters */}
          <div className="flex justify-center space-x-4 mb-16">
            {['Todos', 'Cuadros', 'Murales'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category | 'Todos')}
                className={`px-6 py-2 rounded-full uppercase text-sm tracking-wider transition-all duration-300 border ${
                  filter === cat
                    ? 'bg-yellow-400 text-[var(--background)] border-yellow-400 font-semibold'
                    : 'bg-transparent text-slate-400 border-[var(--card-bg)] hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredWorks.map((work, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={work.id}
                // Asimetría: aplicar un margen extra a algunos elementos basado en su índice
                className={`relative group overflow-hidden bg-[var(--card-bg)] rounded-xl cursor-pointer shadow-2xl shadow-black/60 ${
                  index % 3 === 1 ? 'md:mt-16 lg:mt-24' : index % 3 === 2 ? 'lg:mt-12' : ''
                }`}
                onClick={() => setSelectedWork(work)}
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <motion.div layoutId={`image-${work.id}`} className="w-full h-full relative">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">{work.category}</span>
                        <ZoomIn size={18} className="text-white opacity-70" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal with layoutId and Glassmorphism */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-sm p-4 md:p-12 overflow-hidden"
            onClick={() => setSelectedWork(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 bg-black/20 hover:bg-black/40 p-3 rounded-full cursor-pointer backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setSelectedWork(null); }}
              aria-label="Cerrar modal"
            >
              <X size={28} />
            </button>
            <div 
              className="relative w-full max-w-6xl h-[85vh] flex flex-col md:flex-row items-stretch justify-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Flying Image Container (Left side) */}
              <motion.div 
                layoutId={`image-${selectedWork.id}`}
                className="relative w-full md:w-2/3 lg:w-3/4 h-1/2 md:h-full rounded-xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/20"
              >
                <Image
                  src={selectedWork.image}
                  alt={selectedWork.title}
                  fill
                  className="object-contain" // object-contain respeta toda la obra sin recortes
                  priority
                />
              </motion.div>
                
              {/* Description Panel (Right side) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full md:w-1/3 lg:w-1/4 h-1/2 md:h-full p-6 md:p-8 flex flex-col justify-center rounded-xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
              >
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-4 block">{selectedWork.category}</span>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-snug">{selectedWork.title}</h3>
                  
                  <div className="flex items-center text-white/70 text-sm mb-6 space-x-3">
                    <span className="px-3 py-1 bg-white/10 rounded-full">{selectedWork.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/50"></span>
                    <span>{selectedWork.technique}</span>
                  </div>
                  
                  <div className="w-12 h-[1px] bg-white/20 mb-6"></div>
                  
                  <p className="text-white/80 leading-relaxed font-light text-sm md:text-base">
                    {selectedWork.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
