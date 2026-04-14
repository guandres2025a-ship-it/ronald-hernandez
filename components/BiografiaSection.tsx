'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BiografiaSection() {
  return (
    <section id="biografia" className="py-32 bg-[var(--background)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-yellow-400 rounded-3xl -rotate-3 scale-[1.02] opacity-20" />
              <div className="absolute inset-0 border border-yellow-400/30 rounded-3xl rotate-3 scale-[1.02]" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden bg-[var(--card-bg)] border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                  alt="Ronald Hernández - Artista"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Sobre el <span className="text-yellow-400">Artista</span></h2>
              <div className="h-1 w-16 bg-yellow-400 rounded-full mb-8" />
            </div>

            <div className="text-slate-300 space-y-6 text-lg font-light leading-relaxed">
              <p>
                <strong>Ronald Hernández</strong> es un pintor, muralista e investigador histórico cuya obra establece un puente visual entre el pasado documental y la sensibilidad contemporánea. Su paleta, predominantemente tierra y ocre con fuertes contrastes, dialoga con la arquitectura y la memoria de las ciudades.
              </p>
              <p>
                A través de su técnica mixta, que transita desde óleos tradicionales hasta materiales experimentales de street art, Ronald desafía las convenciones del espacio de exposición, llevando el museo a la calle y la narrativa de la calle al lienzo.
              </p>
              <p>
                Su interés como historiador le permite documentar y rescatar identidades marginadas, convirtiendo sus proyectos a gran escala en testimonios pictóricos de resistencia y belleza atemporal.
              </p>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-5xl font-black text-yellow-400 mb-2">15+</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Años de trayectoria</p>
                </div>
                <div>
                  <h4 className="text-5xl font-black text-yellow-400 mb-2">40+</h4>
                  <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold">Murales públicos</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
