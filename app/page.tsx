'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/src/components/product/ProductCard';
import CategorySidebar from '@/src/components/product/CategorySidebar';
import { getFeaturedProducts } from '@/src/lib/products';
import { Product } from '@/src/lib/types';

const SLIDES = [
  {
    tag: 'Especiales Arduino',
    title: 'Proyectos y Robótica al Alcance de tus Manos',
    desc: 'Despierta al inventor que llevas dentro. Placas, kits y sensores con stock asegurado.',
    category: 'arduino',
    bg: '/products/hero-arduino.jpg',
  },
  {
    tag: 'Accesorios Celular',
    title: 'Potencia y Protege tu Smartphone',
    desc: 'Cargadores rápidos, audífonos premium y fundas de alta resistencia para tu día a día.',
    category: 'celular',
    bg: '/products/hero-celular.jpg',
  },
  {
    tag: 'Gamer & Workstation',
    title: 'Rendimiento Premium en tu Escritorio',
    desc: 'Teclados mecánicos, mouses ergonómicos y coolers para elevar tu nivel de juego y productividad.',
    category: 'computadora',
    bg: '/products/hero-gamer.jpg',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured: Product[] = getFeaturedProducts(6);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5200);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);

  return (
    <div className="app-main container">
      <div className="layout-wrapper">
        {/* Sidebar on home for navigation (matches template structure; clicking cats goes to catalog) */}
        <CategorySidebar activeCategory="all" />

        <section className="content-viewport">
          {/* VIEW HOME */}
          <div id="view-home" className="app-view active">
            {/* Hero Slider */}
            <div className="hero-slider">
              <div className="slider-container" id="hero-slider-container">
                {SLIDES.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`slide ${idx === currentSlide ? 'active' : ''}`}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.68)), url('${slide.bg}')`,
                    }}
                  >
                    <div className="slide-content">
                      <span className="slide-tag">{slide.tag}</span>
                      <h2>{slide.title}</h2>
                      <p>{slide.desc}</p>
                      <Link href={`/productos?category=${slide.category}`} className="btn-primary">
                        {idx === 0 ? 'Explorar Arduino' : idx === 1 ? 'Ver Accesorios' : 'Equipar Setup'} <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button className="slider-nav prev" id="slider-prev" onClick={prevSlide}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="slider-nav next" id="slider-next" onClick={nextSlide}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>

              <div className="slider-dots" id="slider-dots">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    className={idx === currentSlide ? 'active' : ''}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Ir al slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="features-highlights">
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-credit-card"></i></div>
                <div className="feature-text">
                  <h4>Pago con Yape</h4>
                  <p>Fácil, rápido y sin comisiones</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-shield-halved"></i></div>
                <div className="feature-text">
                  <h4>Garantía Real</h4>
                  <p>Productos 100% testeados</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon"><i className="fa-solid fa-comments"></i></div>
                <div className="feature-text">
                  <h4>Asesoría Técnica</h4>
                  <p>Soporte por WhatsApp</p>
                </div>
              </div>
            </div>

            {/* Promo Categories */}
            <div className="section-title-wrapper">
              <h2 className="section-title">Nuestras Categorías</h2>
              <div className="title-line"></div>
            </div>

            <div className="categories-grid">
              <Link href="/productos?category=arduino" className="cat-card" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.82)), url('/products/cat-arduino.jpg')` }}>
                <div className="cat-card-content">
                  <h3>Arduino y Robótica</h3>
                  <p>Placas, Kits, Sensores y Accesorios</p>
                  <span className="cat-card-link">Ver Todo <i className="fa-solid fa-chevron-right"></i></span>
                </div>
              </Link>

              <Link href="/productos?category=celular" className="cat-card" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.82)), url('/products/cat-celular.jpg')` }}>
                <div className="cat-card-content">
                  <h3>Accesorios Celular</h3>
                  <p>Cargadores, Audífonos, Soportes y Estuches</p>
                  <span className="cat-card-link">Ver Todo <i className="fa-solid fa-chevron-right"></i></span>
                </div>
              </Link>

              <Link href="/productos?category=computadora" className="cat-card" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.82)), url('/products/cat-computadora.jpg')` }}>
                <div className="cat-card-content">
                  <h3>Computación y Laptops</h3>
                  <p>Periféricos, Hubs USB, Cámaras y Coolers</p>
                  <span className="cat-card-link">Ver Todo <i className="fa-solid fa-chevron-right"></i></span>
                </div>
              </Link>
            </div>

            {/* Featured */}
            <div className="section-title-wrapper">
              <h2 className="section-title">Productos Destacados</h2>
              <div className="title-line"></div>
            </div>

            <div className="products-grid" id="featured-products-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
