import type { Metadata } from 'next';
import { Outfit, Rajdhani } from 'next/font/google';
import './globals.css';
import TopBar from '@/src/components/layout/TopBar';
import Header from '@/src/components/layout/Header';
import NavBar from '@/src/components/layout/NavBar';
import Footer from '@/src/components/layout/Footer';
import CartSidebar from '@/src/components/layout/CartSidebar';
import FavoritesModal from '@/src/components/ui/FavoritesModal';
import { Toaster } from 'sonner';

// Force dynamic to avoid useSearchParams prerender issues in not-found/404 during build
export const dynamic = 'force-dynamic';

// Fonts matching the provided HTML template
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-rajdhani',
});

export const metadata: Metadata = {
  title: 'NovaClicShop - Tu Tienda de Electrónica de Confianza',
  description: 'Encuentra componentes Arduino, accesorios para celular y laptop al mejor precio en NovaClicShop. Paga seguro por Yape. Envíos a Santa Lucía, Puno.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${outfit.variable} ${rajdhani.variable}`}>
      <head>
        {/* FontAwesome for exact match with the provided template */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <TopBar />
        <Header />
        <NavBar />

        <main>{children}</main>

        <Footer />

        {/* Global cart sidebar (slide-in) */}
        <CartSidebar />

        {/* Favorites modal (triggered via custom event from Header) */}
        <FavoritesModal />

        {/* Sonner toasts */}
        <Toaster position="bottom-right" richColors closeButton />

        {/* Global listeners for header actions (favorites + mobile) are attached in their components or via events */}
      </body>
    </html>
  );
}
