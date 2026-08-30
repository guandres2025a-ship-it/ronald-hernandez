
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import { LanguageProvider } from '@/components/LanguageContext';
import { MusicPlayerProvider } from '@/components/MusicPlayerContext';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'Ronald Hernández - Artista Pintor & Muralista',
  description:
    'Descubre la obra de Ronald Hernández, pintor, muralista e historiador. Una exploracion visual donde el arte dialoga con la memoria, el territorio y la identidad',
  icons: {
    icon: '/Logo_Ronald.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased font-sans`}
      >
        <LanguageProvider>
          <MusicPlayerProvider>
            <SmoothScroll>
              <Preloader />
              <Navbar />

            <main>{children}</main>

            <Footer />
            </SmoothScroll>
          </MusicPlayerProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

