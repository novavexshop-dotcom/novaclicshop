'use client';

/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/src/lib/cart-store';
import { useFavoritesStore } from '@/src/lib/favorites-store';
import { products } from '@/src/lib/products';
import { formatPrice } from '@/src/lib/utils';

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { getTotalItems, getTotalPrice, openCart, isOpen: cartIsOpen } = useCartStore();
  const { getFavoriteCount } = useFavoritesStore();

  const cartCount = getTotalItems();
  const cartTotal = getTotalPrice();
  const favCount = getFavoriteCount();

  const pathname = usePathname();
  const isCatalogPage = pathname?.startsWith('/productos') ?? false;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  const filteredResults = searchTerm.trim().length > 1
    ? products
        .filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6)
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(false);
      router.push(`/productos?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const goToProduct = (id: number) => {
    setSearchTerm('');
    setShowResults(false);
    router.push(`/productos/${id}`);
  };

  return (
    <>
    <header className="main-header">
      <div className="container header-container">
        {/* Brand */}
        <Link href="/" className="brand" id="btn-logo">
          <div className="logo-icon">
            <i className="fa-solid fa-microchip"></i>
          </div>
          <div className="brand-text">
            <h1>NovaClic<span>Shop</span></h1>
            <p>alcance a tu bolsillo</p>
          </div>
        </Link>

        {/* Search */}
        <div className="search-box" ref={searchRef}>
          <form id="search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              id="search-input"
              placeholder="Buscar productos, componentes..."
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
            <button type="submit" aria-label="Buscar">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          {/* Search dropdown */}
          {showResults && filteredResults.length > 0 && (
            <div className="search-results-dropdown" id="search-results">
              {filteredResults.map((p) => (
                <div
                  key={p.id}
                  className="search-result-item"
                  onClick={() => goToProduct(p.id)}
                >
                  <img src={p.image} alt={p.name} />
                  <div className="search-result-info">
                    <div className="name">{p.name}</div>
                    <div className="price">{formatPrice(p.price)}</div>
                  </div>
                </div>
              ))}
              <div
                className="search-result-item"
                style={{ justifyContent: 'center', fontSize: '13px', color: '#888' }}
                onClick={() => {
                  setShowResults(false);
                  router.push(`/productos?search=${encodeURIComponent(searchTerm)}`);
                }}
              >
                Ver todos los resultados →
              </div>
            </div>
          )}
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          <a
            href="#"
            className="action-btn"
            id="btn-favorites-toggle"
            title="Favoritos"
            onClick={(e) => {
              e.preventDefault();
              // Will be handled by parent layout or global modal trigger via custom event or store later
              window.dispatchEvent(new CustomEvent('open-favorites'));
            }}
          >
            <i className="fa-regular fa-heart"></i>
            {mounted && favCount > 0 && (
              <span className="badge" id="fav-count">{favCount}</span>
            )}
          </a>

          <button
            className={`action-btn cart-toggle-btn ${cartIsOpen ? 'is-open' : ''}`}
            id="btn-cart-toggle"
            title="Ver Carrito"
            onClick={() => openCart()}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {mounted && cartCount > 0 && (
              <span className="badge" id="cart-count">{cartCount}</span>
            )}
            <span className="cart-total-header hidden-mobile">{mounted ? formatPrice(cartTotal) : 'S/ 0.00'}</span>
          </button>

          <button
            className="mobile-menu-btn"
            id="mobile-menu-toggle"
            title="Menú"
            onClick={() => {
              if (isCatalogPage) {
                // On catalog, let the CategorySidebar handle the mobile drawer (full filters)
                window.dispatchEvent(new CustomEvent('toggle-mobile-menu'));
              } else {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </header>

      {/* Global Mobile Menu Drawer (works on all pages except /productos which uses its own sidebar drawer) */}
      {!isCatalogPage && isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <strong style={{ fontSize: '17px' }}>Menú</strong>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: 28, background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px 8px' }}>×</button>
            </div>

            {/* Main nav + categories with subs (matching template sidebar) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '0.75rem' }}>
              <Link href="/" className="nav-link" style={{ padding: '0.55rem 0.7rem', fontSize: '15px' }} onClick={() => setIsMobileMenuOpen(false)}>🏠 Inicio</Link>
              <Link href="/productos?category=arduino" className="nav-link" style={{ padding: '0.55rem 0.7rem', fontWeight: 600, fontSize: '15px' }} onClick={() => setIsMobileMenuOpen(false)}><i className="fa-solid fa-diagram-project"></i> Arduino y Robótica</Link>
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', fontSize: '14.5px', gap: '2px' }}>
                <Link href="/productos?category=arduino&subcategory=placas" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Placas de Desarrollo</Link>
                <Link href="/productos?category=arduino&subcategory=sensores" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Sensores y Módulos</Link>
                <Link href="/productos?category=arduino&subcategory=actuadores" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Motores y Relays</Link>
              </div>

              <Link href="/productos?category=celular" className="nav-link" style={{ padding: '0.55rem 0.7rem', fontWeight: 600, fontSize: '15px' }} onClick={() => setIsMobileMenuOpen(false)}><i className="fa-solid fa-mobile-screen"></i> Accesorios Celular</Link>
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', fontSize: '14.5px', gap: '2px' }}>
                <Link href="/productos?category=celular&subcategory=carga" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Cargadores y Cables</Link>
                <Link href="/productos?category=celular&subcategory=audio-cel" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Audio y Bluetooth</Link>
                <Link href="/productos?category=celular&subcategory=proteccion" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Fundas y Vidrios</Link>
              </div>

              <Link href="/productos?category=computadora" className="nav-link" style={{ padding: '0.55rem 0.7rem', fontWeight: 600, fontSize: '15px' }} onClick={() => setIsMobileMenuOpen(false)}><i className="fa-solid fa-laptop"></i> Accesorios Computadora</Link>
              <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', fontSize: '14.5px', gap: '2px' }}>
                <Link href="/productos?category=computadora&subcategory=perifericos" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Teclados y Mouse</Link>
                <Link href="/productos?category=computadora&subcategory=audio-pc" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>Audífonos Gamer</Link>
                <Link href="/productos?category=computadora&subcategory=almacenamiento" style={{ padding: '6px 0.5rem', color: 'var(--text-secondary)' }} onClick={() => setIsMobileMenuOpen(false)}>USB y Accesorios</Link>
              </div>

              <Link href="/productos?filter=ofertas" className="nav-link" style={{ padding: '0.55rem 0.7rem', fontSize: '15px' }} onClick={() => setIsMobileMenuOpen(false)}>🔥 Ofertas Especiales</Link>
            </div>

            <hr style={{ borderColor: 'var(--border-color)', margin: '0.5rem 0' }} />

            {/* Quick actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a 
                href="#" 
                className="action-btn" 
                style={{ justifyContent: 'flex-start', width: '100%', padding: '0.6rem 0.75rem', fontSize: 15, minHeight: 48 }} 
                onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.dispatchEvent(new CustomEvent('open-favorites')); }}
              >
                <i className="fa-regular fa-heart" style={{ fontSize: 16 }}></i> 
                <span style={{ marginLeft: 10, fontSize: 14.5 }}>Favoritos{favCount > 0 ? ` (${favCount})` : ''}</span>
              </a>
              <button 
                className="action-btn" 
                style={{ justifyContent: 'flex-start', width: '100%', padding: '0.6rem 0.75rem', fontSize: 15, minHeight: 48 }} 
                onClick={() => { setIsMobileMenuOpen(false); openCart(); }}
              >
                <i className="fa-solid fa-cart-shopping" style={{ fontSize: 16 }}></i> 
                <span style={{ marginLeft: 10, fontSize: 14.5 }}>Carrito{cartCount > 0 ? ` (${cartCount})` : ''}</span>
              </button>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '12px', color: 'var(--text-secondary)' }}>
              NovaClicShop • Santa Lucía, Puno
            </div>
          </div>
        </div>
      )}
    </>
  );
}
