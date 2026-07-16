'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface Mural {
  title: string;
  description: string;
  image: string;
  year: string;
  size: string;
  type: string;
  collection: string;
}

const murales: Mural[] = [
  {
    title: 'Magia en mi mente',
    description:
      'Un homenaje a Tellos Artesania, artesana y artista del Barrio Abajo, con una estética impecable. Sus habilidades como artesana sobrepasan la excelencia y su tenacidad la ha hecho ser pieza clavede los procesos culturales de este tradicional barrio',
    image: '/Murales/Magia_En_Mi_Mente.webp',
    year: '2026',
    size: '6.5 × 4 m',
    type: 'Exterior',
    collection: 'Museo a Cielo Abierto Barrio Abajo Barranquilla',
  },

  {
    title: 'Ofelia Invita',
    description: 'Un homenaje a Ofelia, una de las matronas del barrio Rebolo. Ella durante muchos años conquisto el corazón de su comunidad con uno de los sabores mas tradicionales de la zona: "La morcilla con limon y bollo limpio."',
    image: '/Murales/Ofelia.webp',
    year: '2026',
    size: '50m2',
    type: 'Exterior',
    collection: 'Malecon de Rebolo',
  },

  {
    title: 'Próximamente',
    description: 'Espacio reservado para un nuevo mural.',
    image: '/Logo_Ronald.Webp',
    year: '',
    size: '',
    type: '',
    collection: '',
  },

  {
    title: 'Próximamente',
    description: 'Espacio reservado para un nuevo mural.',
    image: '/Logo_Ronald.Webp',
    year: '',
    size: '',
    type: '',
    collection: '',
  },

  {
    title: 'Próximamente',
    description: 'Espacio reservado para un nuevo mural.',
    image: '/Logo_Ronald.webp',
    year: '',
    size: '',
    type: '',
    collection: '',
  },
];

export default function MuralesSection() {

  const [selected, setSelected] = useState<Mural | null>(null);

  const principal = murales[0];

  const secundarios = murales.slice(1);

  return (
    <section id="murales" className="relative py-32">

  <div className="mx-auto max-w-7xl px-6">

    {/* ENCABEZADO */}

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .8 }}
      className="mx-auto mb-20 max-w-3xl text-center"
    >

      <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
        Murales
      </p>

      <h2 className="mt-5 font-serif text-5xl leading-tight text-white lg:text-6xl">
        El espacio público
        <br />
        como un lienzo vivo.
      </h2>

      <div className="mx-auto mt-8 h-px w-24 bg-[var(--accent)]" />

      <p className="mt-8 text-lg leading-8 text-white/70">
        Cada intervención nace del diálogo entre la arquitectura,
        la memoria y la identidad cultural, transformando el muro
        en un espacio de encuentro.
      </p>

    </motion.div>



    {/* MURAL DESTACADO */}

    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .8 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10"
    >

      <div className="relative aspect-[16/8] overflow-hidden">

        <Image
          src={principal.image}
          alt={principal.title}
          fill
          priority
          className="object-cover transition duration-1000 group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

      </div>

      <div className="grid gap-10 p-10 lg:grid-cols-[1fr_auto]">

        <div>

          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Mural destacado
          </p>

          <h3 className="mt-4 font-serif text-5xl text-white">
            {principal.title}
          </h3>

          <p className="mt-6 max-w-3xl leading-8 text-white/70">
            {principal.description}
          </p>

        </div>

        <button
          onClick={() => setSelected(principal)}
          className="flex items-center gap-3 self-end rounded-full border border-white/10 bg-white px-6 py-3 font-medium text-black transition hover:bg-[var(--accent)]"
        >
          Ver mural

          <ArrowRight size={18} />
        </button>

      </div>

    </motion.article>



    {/* OTROS MURALES */}

    <div className="mt-24">

      <h3 className="mb-10 font-serif text-3xl text-white">
        Otros murales
      </h3>

      <div className="grid gap-8 md:grid-cols-2">

        {secundarios.map((mural, index) => (

          <motion.article

            key={index}

            initial={{ opacity: 0, y: 30 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{ delay: index * .08 }}

            onClick={() => setSelected(mural)}

            className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-white/10"

          >

            <div className="relative aspect-[16/10] overflow-hidden">

              <Image
                src={mural.image}
                alt={mural.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6">

                <h4 className="font-serif text-3xl text-white">
                  {mural.title}
                </h4>

              </div>

            </div>

          </motion.article>

        ))}

      </div>

    </div>
          {/* MODAL */}

      <AnimatePresence>

        {selected && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-6 backdrop-blur-xl"
          >

            <motion.div
              initial={{ scale: .96 }}
              animate={{ scale: 1 }}
              exit={{ scale: .96 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--card-bg)]"
            >

              <button
                onClick={() => setSelected(null)}
                className="absolute right-6 top-6 z-20 rounded-full border border-white/10 bg-black/40 p-3 text-white hover:text-[var(--accent)]"
              >
                <X size={20} />
              </button>

              <div className="grid lg:grid-cols-[1.4fr_.9fr]">

                <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[720px]">

                  <Image
                    src={selected.image}
                    alt={selected.title}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="flex flex-col justify-center p-10 lg:p-14">

                  <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--accent)]">
                    {selected.collection || 'Colección'}
                  </p>

                  <h2 className="mt-4 font-serif text-5xl leading-tight text-white">
                    {selected.title}
                  </h2>

                  <div className="mt-8 flex flex-wrap gap-3">

                    {selected.year && (
                      <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
                        {selected.year}
                      </span>
                    )}

                    {selected.size && (
                      <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
                        {selected.size}
                      </span>
                    )}

                    {selected.type && (
                      <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
                        {selected.type}
                      </span>
                    )}

                  </div>

                  <div className="mt-10 h-px w-20 bg-[var(--accent)]" />

                  <p className="mt-10 text-lg leading-9 text-white/70">
                    {selected.description}
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

    </section>

  );
}