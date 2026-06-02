'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, Award } from 'lucide-react';
import { Product } from '@/lib/products';
import { getFeaturedProducts, getNewArrivals } from '@/lib/products';
import { getProducts } from '@/lib/getProducts';
import Hero3D from '@/components/ui/Hero3D';
import Footer from '@/components/layout/Footer';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 }
  }
} as const;

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } }
} as const;

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getProducts().then((all) => {
      // Re-compute using the helpers which internally prefer fresh data
      // But since they call getProductsSync, we manually slice from the fresh list
      const sortedByRating = [...all].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6);
      const news = all.filter(p => p.isNew).slice(0, 4);
      setFeatured(sortedByRating);
      setNewArrivals(news);
      setLoaded(true);
    });
  }, []);

  // Fallback to sync if not yet loaded (SSR/first paint)
  const displayFeatured = featured.length > 0 ? featured : getFeaturedProducts(6);
  const displayNew = newArrivals.length > 0 ? newArrivals : getNewArrivals(4);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F4F5]">
      {/* HERO - Clean, legitimate e-commerce structure */}
      <div className="pt-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 pt-14 pb-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Strong messaging + CTAs */}
          <div>
            <div className="inline px-4 py-1 text-xs tracking-[3.5px] bg-white/5 rounded-full mb-6">
              TIENDA OFICIAL • SOLO SANTA LUCÍA POR AHORA
            </div>

            <h1 className="text-7xl md:text-[82px] leading-[0.92] font-semibold tracking-[-4.2px] mb-6">
              Tecnología<br />que realmente<br />funciona.
            </h1>

            <p className="max-w-md text-2xl text-[#71717A] mb-10">
              Productos seleccionados para makers, estudiantes y profesionales.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary text-base px-9 py-[17px]">
                VER CATÁLOGO
              </Link>
              <Link href="#destacados" className="btn-secondary text-base px-8 py-[17px]">
                VER DESTACADOS
              </Link>
            </div>

            <div className="mt-8 text-sm text-[#71717A]">
              Estamos empezando • Sé uno de los primeros clientes
            </div>
          </div>

          {/* Right: 3D Product visual (e-commerce appropriate) */}
          <div className="relative">
            <Hero3D />
          </div>
        </div>
      </div>

      {/* TRUST BAR - Simple & clear */}
      <div className="border-b border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex gap-4 items-center text-[#71717A]">
            <Truck className="text-[#3B82F6]" /> <span>Envíos en Santa Lucía</span>
          </div>
          <div className="flex gap-4 items-center text-[#71717A]">
            <Shield className="text-[#3B82F6]" /> <span>6 meses de garantía</span>
          </div>
          <div className="flex gap-4 items-center text-[#71717A]">
            <Award className="text-[#3B82F6]" /> <span>Atención por WhatsApp y correo</span>
          </div>
        </div>
      </div>

      {/* CATEGORIES - Clean structure */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="uppercase text-[#3B82F6] text-xs tracking-[3px] mb-2 font-mono">EXPLORA</div>
            <h2 className="text-5xl font-semibold tracking-[-2px]">Categorías</h2>
          </div>
          <Link href="/products" className="text-sm text-[#3B82F6] hover:underline">Ver todo</Link>
        </div>

        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {[
            { name: "Arduino & Electrónica", href: "/products?category=arduino", count: "Catálogo en crecimiento", desc: "Placas, sensores y componentes" },
            { name: "Celulares & Accesorios", href: "/products?category=celular", count: "Catálogo en crecimiento", desc: "Carga, audio y protección" },
            { name: "Computadoras & Gaming", href: "/products?category=computadora", count: "Catálogo en crecimiento", desc: "Periféricos y accesorios" },
          ].map((cat, i) => (
            <motion.div key={i} variants={item}>
              <Link href={cat.href} className="card p-9 block h-full hover:border-[#3B82F6]/40 group">
                <div className="text-[#3B82F6] text-sm mb-4 font-mono tracking-widest">{cat.count}</div>
                <div className="text-3xl font-semibold tracking-[-1px] mb-3 group-hover:text-[#3B82F6] transition-colors">{cat.name}</div>
                <div className="text-[#71717A] mb-8">{cat.desc}</div>
                <div className="text-[#3B82F6] flex items-center gap-2 text-sm">
                  Explorar categoría <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SMALL BENEFITS / DETAILS - Legitimate store touch */}
      <div className="max-w-7xl mx-auto px-8 py-8 border-b border-white/10">
        <div className="grid md:grid-cols-3 gap-6 text-sm text-[#71717A]">
          <div className="flex gap-3"><span className="text-[#3B82F6]">●</span> Productos probados y con stock real</div>
          <div className="flex gap-3"><span className="text-[#3B82F6]">●</span> Soporte por WhatsApp y correo</div>
          <div className="flex gap-3"><span className="text-[#3B82F6]">●</span> Cambios y devoluciones fáciles</div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div id="destacados" className="bg-[#141414] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="text-[#3B82F6] text-xs tracking-[3px] mb-2 font-mono">CURADURÍA</div>
              <h2 className="text-5xl font-semibold tracking-[-2px]">Productos destacados</h2>
            </div>
            <Link href="/products" className="text-sm text-[#3B82F6] hover:underline">Ver todo el catálogo →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
            {displayFeatured.map((p, index) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
                <div className="card overflow-hidden">
                  <div className="aspect-[16/11] bg-[#1F1F1F] relative overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" 
                    />
                    {p.isNew && <span className="badge absolute top-4 left-4">Nuevo</span>}
                    {p.isPromo && <span className="badge absolute top-4 left-4 bg-[#F59E0B] text-[#0A0A0A]">Oferta</span>}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-[#71717A] mb-1">{p.category}</div>
                    <div className="font-semibold text-[17px] tracking-[-0.3px] leading-tight mb-4 line-clamp-2">{p.name}</div>
                    <div className="text-2xl font-semibold tabular-nums">S/ {p.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex justify-between items-baseline mb-10">
          <div>
            <div className="text-[#3B82F6] text-xs tracking-[3px] mb-1 font-mono">RECIÉN LLEGADOS</div>
            <h2 className="text-5xl font-semibold tracking-[-2px]">Nuevos lanzamientos</h2>
          </div>
          <Link href="/products" className="text-sm text-[#3B82F6] hover:underline">Ver más →</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayNew.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group">
              <div className="card p-6">
                <div className="aspect-video bg-[#1F1F1F] rounded-xl mb-6 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="font-semibold text-xl tracking-tight mb-1">{p.name}</div>
                <div className="text-3xl font-semibold">S/ {p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FINAL CTA + TRUST */}
      <div className="border-t border-white/10 py-16 text-center">
        <div className="max-w-lg mx-auto px-8">
          <h3 className="text-4xl font-semibold tracking-[-1.5px] mb-4">¿Listo para comprar?</h3>
          <p className="text-[#71717A] mb-8">Explora nuestro catálogo completo y encuentra exactamente lo que necesitas.</p>
          <Link href="/products" className="btn-primary inline-flex items-center gap-3 px-10">
            Explorar el Catálogo <ArrowRight />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
