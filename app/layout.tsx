import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "NovaClicShop | Tienda de Tecnología",
  description: "Arduino, celulares y accesorios gaming. Productos seleccionados en Santa Lucía.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-[#0A0A0A] text-[#F4F4F5] antialiased">
        <CartProvider>
          <Header />
          {children}
          <Toaster 
            position="top-center" 
            richColors 
            closeButton 
            className="sonner-toaster"
          />
        </CartProvider>
      </body>
    </html>
  );
}
