export type Category = 'Cuadros' | 'Murales';

export interface Work {
  id: string;
  title: string;
  category: Category;
  collection: string;
  image: string;
  description: string;
  technique: string;
  year: string;
  type?: 'Externo' | 'Interno';
}

export interface Cuadro {
  id: string;
  titulo: string;
  imagenUrl: string;
  año: string;
  dimensiones: string;
}

export interface Serie {
  id: string;
  nombreSerie: string;
  cuadros: Cuadro[];
}

export const seriesDeCuadros: Serie[] = [
  {
    id: 'Cotidianidad',
    nombreSerie: 'Cotidianidad',
    cuadros: [
      {
        id: 'Cotidianidad-01',
        titulo: 'Café Colombiano',
        imagenUrl: '/Serie_Cotidianidad/Cafe_Colombiano.webp',
        año: '2025',
        dimensiones: '60 x 30 cm',
      },
      {
        id: 'Cotidianidad-02',
        titulo: 'Escuela de Bellas Artes',
        imagenUrl: '/Serie_Cotidianidad/Escuela_de_Bellas_Artes.webp',
        año: '2024',
        dimensiones: '1.40 x 1.20 cm',
      },
        {
        id: 'Cotidianidad-03',
        titulo: 'Rutina',
        imagenUrl: '/Serie_Cotidianidad/Rutina.webp',
        año: '2023',
        dimensiones: '1.40 x 1.10 cm',
      },
        {
        id: 'Cotidianidad-04',
        titulo: 'Wini',
        imagenUrl: '/Serie_Cotidianidad/Wini.webp',
        año: '2021',
        dimensiones: '1.40 x 1.40 cm',
      },
    ],
  },
  {
    id: 'Musicos',
    nombreSerie: 'Musicos',
    cuadros: [
      {
        id: 'Musicos-01',
        titulo: 'Sin Titulo',
        imagenUrl: '/Serie_Musicos/Sin_Titulo.webp',
        año: '2024',
        dimensiones: '170 x 110 cm',
      },
    ],
  },
  {
    id: 'Pachamama',
    nombreSerie: 'Pachamama',
    cuadros: [
      {
        id: 'Pachamama-01',
        titulo: 'Mujer Embera',
        imagenUrl: '/Serie_Pachamama/Mujer_Embera.webp',
        año: '2025',
        dimensiones: '1.60 x 1.50 cm',
      },
      {
        id: 'Pachamama-02',
        titulo: 'Sin Titulo',
        imagenUrl: '/Serie_Pachamama/Sin_Titulo.webp',
        año: '2024',
        dimensiones: '1.30 x 1.00 cm',
      },      
    ],
  },
  {
    id: 'Parejas',
    nombreSerie: 'Parejas',
    cuadros: [
      {
        id: 'Parejas-01',
        titulo: 'Enamorados',
        imagenUrl: '/Serie_Parejas/Enamorados.webp',
        año: '2024',
        dimensiones: '1.70 x 1.00 cm',
      },
      {
        id: 'Parejas-02',
        titulo: 'Pareja de Enamorados',
        imagenUrl: '/Serie_Parejas/Pareja_de_Enamorados.webp',
        año: '2024',
        dimensiones: '1.70 x 1.00 cm',
      },      
    ],
  },
  {
    id: 'Rostros',
    nombreSerie: 'Rostros',
    cuadros: [
      {
        id: 'Rostros-01', 
        titulo: 'Transeuntes Femeninas',
        imagenUrl: '/Serie_Rostros/Transeuntes_Femeninas.webp',
        año: '2025',
        dimensiones: '50cm x 30cm'
      }
    ]
  },
   {
    id: 'Sororidad',
    nombreSerie: 'Sororidad',
    cuadros: [
      {
        id: 'Sororidad-01', 
        titulo: 'Generaciones',
        imagenUrl: '/Serie_Sororidad/Generaciones.webp',
        año: '2025',
        dimensiones: '1.60cm x 1.50cm'
      }
    ]
  }
];

export const works: Work[] = seriesDeCuadros.flatMap((serie) =>
  serie.cuadros.map((cuadro) => ({
    id: `${serie.id}-${cuadro.id}`,
    title: cuadro.titulo,
    category: 'Cuadros' as Category,
    collection: serie.nombreSerie,
    image: cuadro.imagenUrl,
    description: `${serie.nombreSerie} · ${cuadro.dimensiones}`,
    technique: 'Acrílico sobre lienzo',
    year: cuadro.año,
  }))
);
