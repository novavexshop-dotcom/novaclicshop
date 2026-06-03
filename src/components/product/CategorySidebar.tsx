'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  activeCategory?: string;
  activeSubcategory?: string;
  onSelectCategory?: (cat: string) => void;
  onSelectSubcategory?: (sub: string) => void;
}

export default function CategorySidebar({ activeCategory, activeSubcategory, onSelectCategory, onSelectSubcategory }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (cat: string) => activeCategory === cat;

  // Listen for hamburger toggle from global Header (works on /productos where this is mounted)
  useEffect(() => {
    const handler = () => setMobileOpen((v) => !v);
    window.addEventListener('toggle-mobile-menu', handler);
    return () => window.removeEventListener('toggle-mobile-menu', handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleCat = (cat: string) => {
    if (onSelectCategory) onSelectCategory(cat);
    closeMobile();
  };

  const handleSub = (sub: string) => {
    if (onSelectSubcategory) onSelectSubcategory(sub);
    closeMobile();
  };

  return (
    <>
      {/* Desktop sidebar (hidden on mobile via CSS, shown as drawer below) */}
      <aside className="sidebar-categories" id="sidebar-menu">
        <div className="sidebar-header">
          <h3><i className="fa-solid fa-list"></i> Categorías</h3>
        </div>

        <ul className="categories-list">
          <li>
            <Link
              href="/productos"
              className={`cat-item ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCat('all')}
              data-category="all"
            >
              <i className="fa-solid fa-border-all"></i> Todos los Productos
            </Link>
          </li>

          {/* Arduino */}
          <li>
            <Link
              href="/productos?category=arduino"
              className={`cat-item ${isActive('arduino') ? 'active' : ''}`}
              onClick={() => handleCat('arduino')}
              data-category="arduino"
            >
              <i className="fa-solid fa-microchip"></i> Arduino y Robótica
            </Link>
            <ul className="subcategories">
              <li><Link href="/productos?category=arduino&subcategory=placas" className={`subcat-item ${activeSubcategory === 'placas' ? 'active' : ''}`} onClick={() => handleSub('placas')} data-subcategory="placas">Placas de Desarrollo</Link></li>
              <li><Link href="/productos?category=arduino&subcategory=sensores" className={`subcat-item ${activeSubcategory === 'sensores' ? 'active' : ''}`} onClick={() => handleSub('sensores')} data-subcategory="sensores">Sensores y Módulos</Link></li>
              <li><Link href="/productos?category=arduino&subcategory=actuadores" className={`subcat-item ${activeSubcategory === 'actuadores' ? 'active' : ''}`} onClick={() => handleSub('actuadores')} data-subcategory="actuadores">Motores y Relays</Link></li>
            </ul>
          </li>

          {/* Celular */}
          <li>
            <Link
              href="/productos?category=celular"
              className={`cat-item ${isActive('celular') ? 'active' : ''}`}
              onClick={() => handleCat('celular')}
              data-category="celular"
            >
              <i className="fa-solid fa-mobile-button"></i> Accesorios Celular
            </Link>
            <ul className="subcategories">
              <li><Link href="/productos?category=celular&subcategory=carga" className={`subcat-item ${activeSubcategory === 'carga' ? 'active' : ''}`} onClick={() => handleSub('carga')} data-subcategory="carga">Cargadores y Cables</Link></li>
              <li><Link href="/productos?category=celular&subcategory=audio-cel" className={`subcat-item ${activeSubcategory === 'audio-cel' ? 'active' : ''}`} onClick={() => handleSub('audio-cel')} data-subcategory="audio-cel">Audio y Bluetooth</Link></li>
              <li><Link href="/productos?category=celular&subcategory=proteccion" className={`subcat-item ${activeSubcategory === 'proteccion' ? 'active' : ''}`} onClick={() => handleSub('proteccion')} data-subcategory="proteccion">Fundas y Vidrios</Link></li>
            </ul>
          </li>

          {/* Computadora */}
          <li>
            <Link
              href="/productos?category=computadora"
              className={`cat-item ${isActive('computadora') ? 'active' : ''}`}
              onClick={() => handleCat('computadora')}
              data-category="computadora"
            >
              <i className="fa-solid fa-keyboard"></i> Accesorios Computadora / Laptop
            </Link>
            <ul className="subcategories">
              <li><Link href="/productos?category=computadora&subcategory=perifericos" className={`subcat-item ${activeSubcategory === 'perifericos' ? 'active' : ''}`} onClick={() => handleSub('perifericos')} data-subcategory="perifericos">Teclados y Mouse</Link></li>
              <li><Link href="/productos?category=computadora&subcategory=audio-pc" className={`subcat-item ${activeSubcategory === 'audio-pc' ? 'active' : ''}`} onClick={() => handleSub('audio-pc')} data-subcategory="audio-pc">Audífonos Gamer</Link></li>
              <li><Link href="/productos?category=computadora&subcategory=almacenamiento" className={`subcat-item ${activeSubcategory === 'almacenamiento' ? 'active' : ''}`} onClick={() => handleSub('almacenamiento')} data-subcategory="almacenamiento">USB y Accesorios</Link></li>
            </ul>
          </li>

          {/* Ofertas */}
          <li>
            <Link
              href="/productos?filter=ofertas"
              className="cat-item"
              onClick={() => closeMobile()}
              data-category="ofertas"
            >
              <i className="fa-solid fa-tags"></i> Ofertas Especiales
            </Link>
          </li>
        </ul>

        {/* Yape card */}
        <div className="sidebar-card yape-info-card">
          <div className="card-icon"><i className="fa-solid fa-qrcode"></i></div>
          <h4>Paga Seguro con Yape</h4>
          <p>Compra fácil y rápido. Escanea el código QR al pagar.</p>
        </div>
      </aside>

      {/* Mobile drawer / overlay for sidebar (triggered by header hamburger) */}
      {mobileOpen && (
        <div
          className="catalog-mobile-drawer"
          onClick={closeMobile}
        >
          <div
            className="catalog-mobile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '16px' }}>Categorías</strong>
              <button onClick={closeMobile} style={{ fontSize: 26, background: 'none', border: 'none', color: 'var(--text-secondary)', padding: '4px' }}>×</button>
            </div>

            {/* Re-use the list markup but with mobile handlers (simplified copy for drawer) */}
            <ul className="categories-list" style={{ marginTop: '0.25rem' }}>
              <li>
                <Link href="/productos" className={`cat-item ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => handleCat('all')} data-category="all" style={{ padding: '0.6rem 0.7rem', fontSize: '15px', minHeight: '48px' }}>
                  <i className="fa-solid fa-border-all"></i> Todos los Productos
                </Link>
              </li>
              <li>
                <Link href="/productos?category=arduino" className={`cat-item ${isActive('arduino') ? 'active' : ''}`} onClick={() => handleCat('arduino')} data-category="arduino" style={{ padding: '0.6rem 0.7rem', fontSize: '15px', minHeight: '48px' }}>
                  <i className="fa-solid fa-microchip"></i> Arduino y Robótica
                </Link>
                <ul className="subcategories" style={{ paddingLeft: '1rem', fontSize: '14.5px' }}>
                  <li><Link href="/productos?category=arduino&subcategory=placas" className={`subcat-item ${activeSubcategory === 'placas' ? 'active' : ''}`} onClick={() => handleSub('placas')} data-subcategory="placas" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Placas de Desarrollo</Link></li>
                  <li><Link href="/productos?category=arduino&subcategory=sensores" className={`subcat-item ${activeSubcategory === 'sensores' ? 'active' : ''}`} onClick={() => handleSub('sensores')} data-subcategory="sensores" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Sensores y Módulos</Link></li>
                  <li><Link href="/productos?category=arduino&subcategory=actuadores" className={`subcat-item ${activeSubcategory === 'actuadores' ? 'active' : ''}`} onClick={() => handleSub('actuadores')} data-subcategory="actuadores" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Motores y Relays</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/productos?category=celular" className={`cat-item ${isActive('celular') ? 'active' : ''}`} onClick={() => handleCat('celular')} data-category="celular" style={{ padding: '0.6rem 0.7rem', fontSize: '15px', minHeight: '48px' }}>
                  <i className="fa-solid fa-mobile-button"></i> Accesorios Celular
                </Link>
                <ul className="subcategories" style={{ paddingLeft: '1rem', fontSize: '14.5px' }}>
                  <li><Link href="/productos?category=celular&subcategory=carga" className={`subcat-item ${activeSubcategory === 'carga' ? 'active' : ''}`} onClick={() => handleSub('carga')} data-subcategory="carga" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Cargadores y Cables</Link></li>
                  <li><Link href="/productos?category=celular&subcategory=audio-cel" className={`subcat-item ${activeSubcategory === 'audio-cel' ? 'active' : ''}`} onClick={() => handleSub('audio-cel')} data-subcategory="audio-cel" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Audio y Bluetooth</Link></li>
                  <li><Link href="/productos?category=celular&subcategory=proteccion" className={`subcat-item ${activeSubcategory === 'proteccion' ? 'active' : ''}`} onClick={() => handleSub('proteccion')} data-subcategory="proteccion" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Fundas y Vidrios</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/productos?category=computadora" className={`cat-item ${isActive('computadora') ? 'active' : ''}`} onClick={() => handleCat('computadora')} data-category="computadora" style={{ padding: '0.6rem 0.7rem', fontSize: '15px', minHeight: '48px' }}>
                  <i className="fa-solid fa-keyboard"></i> Accesorios Computadora / Laptop
                </Link>
                <ul className="subcategories" style={{ paddingLeft: '1rem', fontSize: '14.5px' }}>
                  <li><Link href="/productos?category=computadora&subcategory=perifericos" className={`subcat-item ${activeSubcategory === 'perifericos' ? 'active' : ''}`} onClick={() => handleSub('perifericos')} data-subcategory="perifericos" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Teclados y Mouse</Link></li>
                  <li><Link href="/productos?category=computadora&subcategory=audio-pc" className={`subcat-item ${activeSubcategory === 'audio-pc' ? 'active' : ''}`} onClick={() => handleSub('audio-pc')} data-subcategory="audio-pc" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>Audífonos Gamer</Link></li>
                  <li><Link href="/productos?category=computadora&subcategory=almacenamiento" className={`subcat-item ${activeSubcategory === 'almacenamiento' ? 'active' : ''}`} onClick={() => handleSub('almacenamiento')} data-subcategory="almacenamiento" style={{ padding: '8px 0.5rem', minHeight: '40px' }}>USB y Accesorios</Link></li>
                </ul>
              </li>
              <li>
                <Link href="/productos?filter=ofertas" className="cat-item" onClick={() => closeMobile()} data-category="ofertas" style={{ padding: '0.6rem 0.7rem', fontSize: '15px', minHeight: '48px' }}>
                  <i className="fa-solid fa-tags"></i> Ofertas Especiales
                </Link>
              </li>
            </ul>

            <div className="sidebar-card yape-info-card" style={{ marginTop: '1rem' }}>
              <div className="card-icon"><i className="fa-solid fa-qrcode"></i></div>
              <h4>Paga Seguro con Yape</h4>
              <p>Compra fácil y rápido. Escanea el código QR al pagar.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
