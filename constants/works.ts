export type Category = 'Cuadros' | 'Murales';

export interface Work {
  id: string;
  title: string;
  category: Category;
  image: string;
  description: string;
  technique: string;
  year: string;
}

export const works: Work[] = [
  {
    id: '1',
    title: 'Sol Naranja',
    category: 'Cuadros',
    image: '/sol naranja.jpg',
    description: 'Una mujer que vive un instante de goce bajo la sombrilla, con la piel cálida por el sol y un sabor refrescante en sus labios.',
    technique: 'Acrílico sobre lienzo',
    year: '2024',
  },
  {
    id: '2',
    title: 'Músicos',
    category: 'Cuadros',
    image: '/Musicos.jpg',
    description: 'Una composición rítmica donde la figura humana se funde con el instrumento. Las formas geométricas y el trazo libre evocan la resonancia del contrabajo, iluminados por un ambiente nostálgico y una paleta de violetas y naranjas intensos.',
    technique: 'Acrílico sobre lienzo',
    year: '2025',
  },
  {
    id: '3',
    title: 'Enamorados',
    category: 'Cuadros',
    image: '/Enamorados.jpg',
    description: 'Bajo la luz de un farol, dos amantes se abrazan resguardando un ramo de rosas. Esta pieza envuelve el romanticismo en colores fríos y púrpuras dramáticos, cortados por la calidez vibrante del amarillo y el rojo de las flores y la vestimenta.',
    technique: 'Acrílico sobre lienzo',
    year: '2013',
  },
  {
    id: '4',
    title: 'Renacimiento Urbano',
    category: 'Murales',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80',
    description: 'Mural transformador en el centro histórico.',
    technique: 'Aerosol y Acrílico',
    year: '2023',
  },
  {
    id: '5',
    title: 'Ecos Dorados',
    category: 'Cuadros',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80',
    description: 'Exploración de texturas y materiales.',
    technique: 'Técnica mixta con pan de oro',
    year: '2024',
  },
  {
    id: '6',
    title: 'Memoria Colectiva',
    category: 'Murales',
    image: 'https://images.unsplash.com/photo-1578308422502-127db838b006?auto=format&fit=crop&q=80',
    description: 'Una mirada a la historia a través del arte urbano.',
    technique: 'Acrílico sobre bloque',
    year: '2023',
  }
];
