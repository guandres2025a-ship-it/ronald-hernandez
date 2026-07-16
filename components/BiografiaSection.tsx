'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const stats = [
  { value: '20+', label: 'Años de trayectoria' },
  { value: '50+', label: 'Obras expuestas' },
  { value: '15+', label: 'Proyectos urbanos' },
];

export default function BiografiaSection() {
  return (
    <section id="biografia" className="relative py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-[0.95fr_1.05fr]">

        {/* FOTO */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 shadow-[0_40px_90px_-35px_rgba(0,0,0,.9)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/Ronald_Hernandez.jpg"
                alt="Ronald Hernández"
                fill
                sizes="(max-width:1024px)100vw,50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* TEXTO */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
        >
          <p className="text-[11px] uppercase tracking-[0.35em] font-semibold text-[var(--accent)]">
            Sobre el artista
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-[1.05] tracking-[-0.03em] text-white lg:text-6xl">
            El arte como
            <br />
            testimonio del territorio
          </h2>

          <div className="mt-10 h-px w-24 bg-[var(--accent)] opacity-70" />

          <div className="mt-10 space-y-7 text-lg leading-9 text-white/75">

            <p>
              Formado en la Universidad del Atlántico, Ronald Hernández ha
              dedicado más de dos décadas a investigar y representar la identidad
              cultural del Caribe colombiano mediante la pintura y el muralismo.
            </p>

            <p>
              Su trabajo une historia, memoria y expresión artística, convirtiendo
              cada obra en un testimonio visual donde el color, la forma y el
              territorio dialogan con quienes las contemplan.
            </p>

          </div>

          <div className="mt-16 grid grid-cols-3 gap-10 border-t border-white/10 pt-10">

            {stats.map((stat) => (

              <div key={stat.label}>

                <p className="font-serif text-5xl text-white">
                  {stat.value}
                </p>

                <p className="mt-3 text-[11px] uppercase tracking-[0.28em] text-white/45 leading-5">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
}