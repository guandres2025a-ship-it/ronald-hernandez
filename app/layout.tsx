
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
  metadataBase: new URL('https://ronald-hernandez.vercel.app'),
  title: {
    default: 'Ronald Hernández | Artista, pintor y muralista',
    template: '%s | Ronald Hernández',
  },
  description:
    'Descubre la obra de Ronald Hernández, artista, pintor y muralista colombiano. Explora sus pinturas, murales y trayectoria artística.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://ronald-hernandez.vercel.app/',
    siteName: 'Ronald Hernández',
    title: 'Ronald Hernández | Artista, pintor y muralista',
    description:
      'Explora las pinturas, murales y trayectoria artística de Ronald Hernández.',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary',
    title: 'Ronald Hernández | Artista, pintor y muralista',
    description:
      'Explora las pinturas, murales y trayectoria artística de Ronald Hernández.',
  },
  robots: {
    index: true,
    follow: true,
  },
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

