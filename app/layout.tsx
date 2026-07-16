import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';

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
  description: 'Descubre la obra de Ronald Hernández, pintor, muralista e historiador. Una exploracion visual donde el arte dialoga con la memoria, el territorio y la identidad',
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
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased font-sans`}>
        <SmoothScroll>
          <Preloader />
          <Navbar />
          <main>{children}</main>
          <footer className="border-t border-white/10 bg-transparent py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/55 sm:px-6 lg:flex-row lg:px-8">
              <p>© {new Date().getFullYear()} Ronald Hernández. Todos los derechos reservados.</p>
              <p className="text-white/35">Arte contemporáneo, memoria colectiva y espacio público.</p>
            </div>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
