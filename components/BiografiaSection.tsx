'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BiografiaSection() {
  return (
    <section id="biografia" className="py-40 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          {/* Artistic Portrait - Museum Style */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden">
              <div className="absolute inset-0 border border-white/10 z-10 pointer-events-none" />
              <Image
                src="/Ronald_Hernandez.jpg"
                alt="Ronald Hernández - El Artista"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          {/* Biography Text - Editorial Style */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-12"
          >
            <div className="space-y-4">
              <span className="text-yellow-500/80 uppercase tracking-[0.4em] text-xs font-bold block">Biografía del Autor</span>
              <h2 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                La visión de un <br/>
                <span className="italic">historiador visual</span>
              </h2>
            </div>

            <div className="text-slate-400 space-y-8 text-xl font-light leading-relaxed">
              <p>
                Formado en la Universidad del Atlántico, Ronald Hernández ha dedicado más de dos décadas a documentar la identidad del Caribe a través del color. Su formación como historiador le otorga una profundidad única, permitiéndole ver el muro no como un objeto estático, sino como un palimpsesto de la memoria urbana.
              </p>
              <p>
                Bajo la tutela del maestro McCausland, desarrolló una técnica de acrílico que combina la precisión de la línea con la libertad de la mancha. Hoy, su obra se erige como un referente del muralismo contemporáneo en Colombia.
              </p>
            </div>

            <div className="flex gap-16 pt-8 border-t border-white/5">
              <div className="space-y-2">
                <span className="text-white text-3xl font-serif">20+</span>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Años de Trayectoria</p>
              </div>
              <div className="space-y-2">
                <span className="text-white text-3xl font-serif">50+</span>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Obras Expuestas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
