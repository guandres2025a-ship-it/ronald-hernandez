export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover?: string;
  duration?: number;
}

// Replace the placeholder values below. Add new Song objects to this array
// when more tracks are available. A future API fetch can populate this array
// (or replace it with state) without changing the player logic.
export const songs: Song[] = [
  {
    id: '1',
    title: 'Monica',
    artist: 'Lokasa Ya Mbongo',
    url: './audio/Monica.mp3',
    cover: './images/Monica.webp',
  },
  {
    id: '2',
    title: 'I wanna love you',
    artist: 'Bob Marley',
    url: './audio/I wanna love you.mp3',
    cover: 'PLACEHOLDER_RUTA_PORTADA_2',
  },
];