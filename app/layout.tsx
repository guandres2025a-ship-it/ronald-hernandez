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
  title: 'Ronald Hernández | Pintor & Muralista',
  description: 'Portafolio de Ronald Hernández, Pintor, Muralista e Historiador. Explora la galería y sus murales a gran escala.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-[var(--background)] text-slate-50 antialiased selection:bg-yellow-400 selection:text-slate-950 font-sans`}>
        <SmoothScroll>
          <Preloader />
          <Navbar />
          <main>{children}</main>
          <footer className="bg-[var(--background)] border-t border-white/5 py-12 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} Ronald Hernández. Todos los derechos reservados.</p>
          </footer>
        </SmoothScroll>
      </body>
    </html>
  );
}
