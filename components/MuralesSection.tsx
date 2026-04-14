'use client';

import { motion } from 'framer-motion';

export default function MuralesSection() {
  return (
    <section id="murales" className="relative w-full">
      {/* First Parallax Mural */}
      <div 
        className="relative h-[80vh] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80')" }}
      >
        <div className="absolute inset-0 bg-[var(--background)]/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">Gran <span className="text-yellow-400">Escala</span></h2>
            <div className="h-1 w-24 bg-yellow-400 mx-auto rounded-full mb-8" />
            <p className="text-xl text-slate-200 font-light leading-relaxed">
              El muralismo como herramienta de transformación social y diálogo continuo con el espectador urbano.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interstitial Content */}
      <div className="py-24 bg-[var(--card-bg)] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed italic"
          >
            "Pintar un muro es escribir en el diario abierto de la ciudad, donde cada transeúnte se convierte en lector y protagonista."
          </motion.p>
        </div>
      </div>

      {/* Second Parallax Mural */}
      <div 
        className="relative h-[80vh] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1561569940-02bfecd5a6da?auto=format&fit=crop&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 shadow-xl">Legado e Historia</h2>
            <p className="text-lg text-slate-300 bg-[var(--background)]/50 backdrop-blur-sm inline-block px-6 py-3 rounded-full border border-white/10">
              Integrando el pasado en el entorno contemporáneo
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
