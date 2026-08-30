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
    title: 'Bridge Over Troubled Water',
    artist: 'Elvis Presley',
    url: '/audio/Bridge Over Troubled Water.mp3',
    cover: '/images/covers/Bridge Over Troubled Water.webp',
  },
  {
    id: '2',
    title: 'Sultans Of Swing',
    artist: 'Dire Straits',
    url: '/audio/Sultans Of Swing.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_2.jpg',
  },
  {
    id: '3',    
    title: 'I Say A Little Prayer',
    artist: 'Aretha Franklin',
    url: '/audio/I Say A Little Prayer.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_3.jpg',
  },
   {
    id: '4',    
    title: 'If I Can Dream',
    artist: 'Elvis Presley',
    url: '/audio/If I Can Dream.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_4.jpg',
  },
  {
    id: '5',    
    title: 'My Sweet Lord',
    artist: 'George Harrison',
    url: '/audio/My Sweet Lord Subtitulo en español (By Orion).mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_5.jpg',
  },
   {
    id: '6',    
    title: 'Higher Ground',
    artist: 'Stevie Wonder',
    url: '/audio/Higher Ground.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_6.jpg',
  },
   {
    id: '7',    
    title: 'Stir It Up',
    artist: 'Bob Marley',
    url: '/audio/Stir It Up (Live at The Old Grey Whistle, 1973).mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_7.jpg',
  },
   {
    id: '8',    
    title: 'I Shot The Sheriff',
    artist: 'Bob Marley',
    url: '/audio/I Shot The Sheriff.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_8.jpg',
  },
   {
    id: '9',    
    title: 'Alabama Song',
    artist: 'The Doors',
    url: '/audio/Alabama Song.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_9.jpg',
  },
   {
    id: '10',    
    title: 'Via con Me',
    artist: 'Paolo Conte',
    url: '/audio/Via Con Me.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_10.jpg',
  },
   {
    id: '11',    
    title: "Don't Be Cruel",
    artist: 'Elvis Presley',
    url: '/audio/Don\'t Be Cruel.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_11.jpg',
  },
   {
    id: '12',    
    title: 'Snow (Hey Oh)',
    artist: 'Red Hot Chili Peppers',
    url: '/audio/Snow (Hey Oh) (Official Music Video).mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_12.jpg',
  },
   {
    id: '13',    
    title: 'Suspicious Minds',
    artist: 'Elvis Presley',
    url: '/audio/Suspicious Minds (Official Music Video).mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_13.jpg',
  },
   {
    id: '14',    
    title: 'One in Ten',
    artist: 'UB40',
    url: '/audio/One in Ten.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_14.jpg',
  },
   {
    id: '15',    
    title: 'Duppy Conqueror',
    artist: 'Bob Marley',
    url: '/audio/Duppy Conqueror.mp3',
    cover: '/images/covers/PLACEHOLDER_PORTADA_15.jpg',
  },
];